import LunoTrader, { getLastPrice, getCurrentBuyPrice } from "./LunoTrader";
import { substring, isError, inRange } from "../hepers/helpers";
import { optionsType, statuses } from "../types/types";

// This is the trader itself.
export default class TradeSmith {
    private readonly idleTime: number;
    private readonly LunoTrader: LunoTrader;
    private readonly btcTradeAmount: number;
    private readonly btcGapBetweenBuys: number;
    private readonly profitPercentage: number;
    private readonly isDebugging: boolean;

    private status: statuses;
    private loop: NodeJS.Timer | null = null;
    private waitForValue: { buy: number | null, sell: number | null } = { buy: null, sell: null }
    private buyPrices: number[];

    constructor(options: optionsType) {
        this.isDebugging = !!options.isDebugging;
        this.idleTime = options.idleTime;
        this.btcTradeAmount = options.btcTradeAmount;
        this.LunoTrader = new LunoTrader(options.lunoKey, options.lunoSecret, this.isDebugging);
        this.btcGapBetweenBuys = options.btcGapBetweenBuys;
        this.profitPercentage = options.profitPercentage;

        this.status = options.status ?? "buy";
        this.buyPrices = options.buyPrices ?? [];
        this.waitForValue.buy = options.waitForValue?.buy ?? null;
        this.waitForValue.sell = options.waitForValue?.sell ?? null;
    }

    start() {
        try {
            const executeAction = this.executeAction.bind(this);
            executeAction();
            this.loop = setInterval(executeAction, this.idleTime);
        } catch (error: any) {
            // console.error(isError(error) ? error.stack : JSON.stringify(error, (k, v) => substring(v), 2));
            console.error(error.message);
            this.stop();
        }
    }

    async stop() {
        this.status = "kill";
        await this.executeAction.call(this);
    }

    private async executeAction() {
        console.log("Tradesmith 'this':", JSON.stringify(this, (key, value) => key === "loop" ? "-" : value, 2))
        await this.action[this.status]();
    }

    private updateStatus(newStatus: statuses) {
        console.log(`[TRADESMITH - updateStatus] New Status: ${newStatus}`);
        this.status = newStatus;
    }

    private action = {
        // Helper Functions
        getNextSellAtPrice: (buyPrices: number[]): number => {
            if (!buyPrices || !buyPrices.length) {
                throw Error(`Cannot calculate new sell price. Current buyPrices = ${buyPrices}.`);
            }

            const averageBuyPrice = buyPrices.reduce((total, price) => total + price) / buyPrices.length;
            const sellPrice = averageBuyPrice * (1 + this.profitPercentage);

            console.log(`[TRADESMITH - getNextSellAtPrice] sellPrice: ${sellPrice}`);
            return sellPrice;
        },

        getNextBuyAtPrice: (buyPrices: number[]) => {
            if (!inRange(buyPrices, 1, 4)) {
                throw Error(`Cannot calculate new buy price. Current buyPrices = ${buyPrices}.`);
            }

            const lastBuyPrice = buyPrices[buyPrices.length - 1];
            const buyPrice = lastBuyPrice - this.btcGapBetweenBuys;

            console.log(`[TRADESMITH - getNextBuyAtPrice] sellPrice: ${buyPrice}`);
            return buyPrice
        },

        sellAllBTC: async (buyPrices: number[]) => {
            if (!inRange(buyPrices, 5)) {
                throw Error(`When selling all BTC, the number of consecutive buys has to be five. Found: ${buyPrices}.`)
            }

            const sellAtBtcPrice = this.action.getNextSellAtPrice(buyPrices);
            const btcBalance = await this.LunoTrader.queryBTCBalance();

            console.log(`[TRADESMITH - sellAllBTC] Selling All BTC`);
            await this.LunoTrader.sellBTC(btcBalance, sellAtBtcPrice);
        },

        setNextBuyAndSellOrder: async () => {
            this.buyPrices = (this.buyPrices?.length) ? this.buyPrices : [await getCurrentBuyPrice()];
            console.log(`[TRADESMITH - setNextBuyAndSellOrder] BuyPrices: ${this.buyPrices}`);

            // Set up next buy and sell orders.
            const sellPrice = this.action.getNextSellAtPrice(this.buyPrices);
            await this.LunoTrader.sellBTC(this.btcTradeAmount, sellPrice);
            this.waitForValue.sell = Math.trunc(sellPrice);

            const buyPrice = this.action.getNextBuyAtPrice(this.buyPrices);
            await this.LunoTrader.buyBTC(this.btcTradeAmount, buyPrice);
            this.waitForValue.buy = Math.trunc(buyPrice);
        },

        buy: async () => {
            console.log("BUY ACTION EXECUTING")

            const currentBuyPrice = await getCurrentBuyPrice();
            await this.LunoTrader.buyBTC(this.btcTradeAmount, currentBuyPrice);
            this.buyPrices.push(currentBuyPrice);

            this.action.setNextBuyAndSellOrder();

            // Update bot's status.
            this.updateStatus('wait');
        },

        wait: async () => {
            console.log("WAIT ACTION EXECUTING")
            if (this.waitForValue.sell == null || this.waitForValue.buy == null) {
                throw Error(`Status cannot be 'wait' while waitForValue has value of: ${JSON.stringify(this.waitForValue)}.`);
            }

            // const btcPrice = await getLastPrice();
            const openOrders = await this.LunoTrader.getOpenOrders();
            console.log(`Found Open Orders: ${JSON.stringify(openOrders, null, 2)}`)

            const boughtOrder = openOrders?.find(({ type, limit_price }) =>
                type === "BID" && limit_price === this.waitForValue.buy?.toFixed(2)
            );
            const soldOrder = openOrders?.find(({ type, limit_price }) =>
                type === "ASK" && limit_price === this.waitForValue.sell?.toFixed(2)
            );

            const hasBoughtBtc = !boughtOrder && soldOrder;
            const hasSoldBtc = !soldOrder && boughtOrder;
            console.log(`[TRADESMITH - wait] boughtOrder: ${!!boughtOrder} | soldOrder ${!!soldOrder}`)

            if (hasBoughtBtc) {
                this.LunoTrader.cancelOrder(soldOrder.order_id);

                // If bot bought 5 times in a row, sell all btc there is.
                const hasReachedMaxBuys = this.buyPrices.length >= 5;
                if (hasReachedMaxBuys) {
                    this.updateStatus('kill');
                    return this.action.sellAllBTC(this.buyPrices);
                }

                this.action.setNextBuyAndSellOrder();
            } else if (hasSoldBtc) {
                this.LunoTrader.cancelOrder(boughtOrder.order_id);

                this.action.setNextBuyAndSellOrder();
            }
        },

        kill: () => {
            console.log("KILL ACTION EXECUTING")

            if (!this.loop) return;

            clearInterval(this.loop as NodeJS.Timeout);
        }
    }
}