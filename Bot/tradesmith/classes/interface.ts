/**
 * This file does the directing between available interfaces and
 * some of the heavy lifting to simplify code in index file and 
 * only keep api communication function in the interface files.
 */
import { bot_status, config_type } from "../helpers/types";
import LunoTrader from './luno';
import Config from '../classes/config';

export default class Interface {
    trader: LunoTrader;
    config: config_type;

    constructor() { }

    async start(restart: boolean = false) {
        this.trader = new LunoTrader();
        const config = new Config();
        await config.connect();
        this.config = await config.getConfig();

        if (restart) {
            this.status.set("open");
        }
        await this.execute();

        return this;
    }

    execute = async () => {
        const bot_status = this.status.get();
        console.log(JSON.stringify(this.config, null, 2));

        switch (bot_status) {
            case "open": // Can buy (happens at start, after a sell or freeze).
                await this.resetBot();
                await this.trade.buy();
                break;
            case "bought": // Waiting for the correct buy or sell price.
                const next_step = await this.getNextStep();
                switch (next_step) {
                    case 'buy': this.trade.buy(); break;
                    case 'sell': this.trade.sell(); break;
                    case 'nothing': break;
                    default: throw new Error(`Unknown 'Next Step' found: ${next_step}.`);
                }
                break;
            case "on_hold":
                // TODO: This will be implemented in later versions.
                throw `Wait for price to stabilize before trading..`;
            default: throw new Error(`Unknown 'Status' found: ${bot_status}.`);
        }
    }

    end = async () => {
        await this.config.disconnect();
    }

    status = {
        get: (): bot_status => {
            return this.config.status
        },

        set: (status: bot_status) => {
            this.config.status = status;
            this.config.save();
        },

        /**
         * The purpose of this function is to determine the status of 
         * the bot (i.e. it's next step), without any prior info, so that it can be
         * started out of the blue (after two day of shut down or something) and still 
         * get the correct status in case an old bid was sold (or cancelled by user).
         */
        update: async () => {
            this.status.set("bought");
        },

        isBought: (): boolean => {
            return this.status.get() === "bought";
        }
    }


    trade = {
        buy: async () => {
            // Should handle the buy count here, including the check for 5 buys.
            const no_of_buys_in_a_row = this.info.buyCount();
            const max_buys = this.info.maxBuyCount();
            if (no_of_buys_in_a_row >= max_buys) {
                this.status.set("on_hold");
            } else {
                const amount_to_buy = this.info.buyAmount();

                await this.trader.buyBTC(amount_to_buy);
                this.status.set("bought");
                await this.setNextLimits();
            }
        },

        sell: async () => {
            const amount_to_sell = this.info.sellAmount();

            await this.trader.sellBTC(amount_to_sell);
            await this.resetBot();
        },
    }

    info = {
        sellAt: () => {
            return this.config.sell_at;
        },

        buyAt: () => {
            return this.config.buy_at;
        },

        buyCount: () => {
            return this.config.buying_levels;
        },

        maxBuyCount: () => {
            return this.config.max_buys
        },

        sellAmount: (): number => {
            return +this.config.btc_bid_amount * this.config.buying_levels;
        },

        buyAmount: (): number => {
            const buy_amount = +this.config.btc_bid_amount;

            if (this.config.buying_levels === 0) {
                return +(buy_amount * 1.1).toFixed(6);
            }

            return buy_amount;
        }
    }

    /**
     * This function is only applicable for the "bought" status,
     * and checks whether the bot should buy or sell some BTC.
     * 
     * If the Bot has bought 5 times before the Bot is put on hold status.
     */
    async getNextStep() {
        if (!this.status.isBought()) {
            return "not_applicable";
        }

        const btc_price = await this.trader.getBTCPrice();

        const btc_sell_value = this.info.sellAt();
        if (+btc_price >= btc_sell_value) {
            return "sell";
        }

        const btc_buy_value = this.info.buyAt();
        if (+btc_price <= btc_buy_value) {
            return "buy";
        }
        return "nothing";
    }

    async resetBot() {
        const btc_price = await this.trader.getBTCPrice();

        this.config.buying_levels = 0;
        this.config.status = "open";
        this.config.buy_at = +btc_price;
        this.config.sell_at = +btc_price;

        this.config.save();
    }

    async setNextLimits() {
        const sum = (s: number) => !!s ? Math.pow(buy_perc, -s) + sum(s - 1) : 1;
        const btc_price = +(await this.trader.getBTCPrice());
        this.config.buying_levels++;
        const n = this.config.buying_levels + 1;
        const buy_perc = 1 - +this.config.buy_percentage;
        const sell_perc = 1 + +this.config.sell_percentage;

        this.config.buy_at = btc_price * buy_perc;
        this.config.sell_at = this.config.buy_at * sell_perc * sum(n) / (n + 1);

        this.config.save();
    }
}