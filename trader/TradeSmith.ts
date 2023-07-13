import LunoTrader, { getLastPrice, getCurrentBuyPrice } from "./LunoTrader";

// This is the trader itself.
export class TradeSmith {
    private readonly idleTime: number;
    private readonly LunoTrader: LunoTrader;
    private readonly btcTradeAmount: number;
    private readonly btcGapBetweenBuys: number;
    private readonly profitPercentage: number;

    private status: statuses;
    private loop: NodeJS.Timer | null = null;
    private waitForValue: { buy: number | null, sell: number | null } = { buy: null, sell: null }
    private buyPrices: number[];

    constructor(options: optionsType) {
        this.idleTime = options.idleTime;
        this.btcTradeAmount = options.btcTradeAmount;
        this.LunoTrader = new LunoTrader(options.lunoKey, options.lunoSecret)
        this.btcGapBetweenBuys = options.btcGapBetweenBuys;
        this.profitPercentage = options.profitPercentage;
        this.status = options.status;
        this.buyPrices = options.buyPrices ?? [];
        this.waitForValue.buy = options.waitForValue?.buy ?? null;
        this.waitForValue.sell = options.waitForValue?.sell ?? null;
    }

    start() {
        try {
            this.executeAction();
            this.loop = setInterval(this.executeAction, this.idleTime);
        } catch (error: any) {
            console.error(error.stack || typeof error === "string" ? error : JSON.stringify(error, (key, value) => (value + "").length > 200 ? value.slice(0, 200) + "..." : value, 2));
            this.stop();
        }
    }

    async stop() {
        this.status = "kill";
        await this.executeAction();
    }

    async executeAction() {
        await this.action[this.status]();
    }

    get action() {
        const self = this;
        // Helper Functions
        const getNextSellAtPrice = (buyPrices: number[]) => {
            if (!buyPrices || !buyPrices.length) {
                throw Error(`Cannot calculate new sell price. Current buyPrices = ${buyPrices}.`);
            }

            const averageBuyPrice = buyPrices.reduce((total, price) => total + price) / buyPrices.length;
            const sellPrice = averageBuyPrice * (1 + self.profitPercentage);

            return sellPrice;
        }
        const getNextBuyAtPrice = (buyPrices: number[]) => {
            if (!buyPrices || buyPrices.length < 1 || buyPrices.length > 4) {
                throw Error(`Cannot calculate new buy price. Current buyPrices = ${buyPrices}.`);
            }

            const lastBuyPrice = buyPrices[buyPrices.length - 1];
            return lastBuyPrice - self.btcGapBetweenBuys;
        }

        const sellAllBTC = async (buyPrices: number[]) => {
            if (buyPrices == null || buyPrices.length !== 5) {
                throw Error(`When selling all BTC, the number of consecutive buys has to be five. Found: ${buyPrices}.`)
            }

            const sellAtBtcPrice = getNextSellAtPrice(buyPrices);
            const btcBalance = await self.LunoTrader.queryBTCBalance();

            await self.LunoTrader.sellBTC(btcBalance, sellAtBtcPrice);

            // // Restart Immediately.
            // self.action.buy();

            // Stop thereafter.
            self.action.kill();
        }

        const setNextBuyAndSellOrder = async () => {
            self.buyPrices = (!self?.buyPrices?.length) ? self.buyPrices : [await getCurrentBuyPrice()];

            // Set up next buy and sell orders.
            const sellPrice = getNextSellAtPrice(self.buyPrices);
            await self.LunoTrader.sellBTC(self.btcTradeAmount, sellPrice);

            const buyPrice = getNextBuyAtPrice(self.buyPrices);
            await self.LunoTrader.buyBTC(self.btcTradeAmount, buyPrice);
        }


        return {
            async buy() {
                const currentBuyPrice = await getCurrentBuyPrice();
                await self.LunoTrader.buyBTC(self.btcTradeAmount, currentBuyPrice);
                self.buyPrices.push(currentBuyPrice);

                setNextBuyAndSellOrder();

                // Update bot's status.
                self.status = "wait";
            },

            async wait() {
                if (self.waitForValue.sell == null || self.waitForValue.buy == null) {
                    throw Error(`Status cannot be 'wait' while waitForValue has value of: ${JSON.stringify(self.waitForValue)}.`);
                }

                const btcPrice = await getLastPrice();
                const openOrders = await self.LunoTrader.getOpenOrders();
                if (!openOrders) throw Error("Could not get open orders");

                const isBought = !openOrders.bids.find((bid) => +bid.price === self.waitForValue.buy);
                const isSold = !openOrders.asks.find((ask) => +ask.price === self.waitForValue.sell);

                if (isBought) {
                    // TODO: Cancel old sell order.

                    // If bot bought 5 times in a row, sell all btc there is.
                    const hasReachedMaxBuys = self.buyPrices.length >= 5;
                    if (hasReachedMaxBuys) {
                        return sellAllBTC(self.buyPrices);
                    }

                    setNextBuyAndSellOrder();

                    // calculateNextBuyAndSellPrices();
                } else if (isSold) {
                    // TODO: Cancel old sell order.

                    setNextBuyAndSellOrder();

                }
            },

            kill() {
                if (!self.loop) return;

                clearInterval(self.loop);
            }
        }
    }
}

type statuses = "buy" | "wait" | "kill"
type optionsType = {
    status: statuses,
    idleTime: number,
    lunoKey: string,
    lunoSecret: string,
    btcTradeAmount: number,
    btcGapBetweenBuys: number,
    profitPercentage: number
    waitForValue?: {
        buy: number,
        sell: number
    },
    buyPrices?: number[]
}