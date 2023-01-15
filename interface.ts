/**
 * This file does the directing between available interfaces and
 * some of the heavy lifting to simplify code in index file and 
 * only keep api communication function in the interface files.
 */

import { trader_type, trader_class, bot_status, saved_data } from "./helpers/types";
import { print } from './helpers/functions'
import BinanceTrader from './interfaces/binance.js';
import LunoTrader from './interfaces/luno.js';
import config from './helpers/config';

//@ts-ignore
import { readFileSync, writeFileSync } from "fs";

export default class Interface {
    trader: trader_class

    constructor(interface_type: trader_type) {
        // For debugging...
        const object = fetchSavedData();
        print(`• Status: ${object.status}\n• Buys in a row: ${object.buying_levels}\n• Buy At: ${object.buy_at}\n• Sell At: ${object.sell_at}\n`);

        switch (interface_type) {
            case 'binance': this.trader = new BinanceTrader(); break;
            case 'luno': this.trader = new LunoTrader(); break;
            default: throw new Error(`Unknown Interface type ${interface_type}`);
        }
    }

    status = {
        get: (): bot_status => {
            const object = fetchSavedData();
            return object.status;
        },

        set: (status: bot_status) => {
            const object = fetchSavedData();
            object.status = status;
            object.save(true /* is_silent */);
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
                print(`Set to 'On Hold' due to buying ${no_of_buys_in_a_row} times in a row.`);
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
            const saved_data = fetchSavedData();
            return saved_data.sell_at;
        },

        buyAt: () => {
            const saved_data = fetchSavedData();
            return saved_data.buy_at;
        },

        buyCount: () => {
            const saved_data = fetchSavedData();
            return saved_data.buying_levels;
        },

        maxBuyCount: () => {
            return config.max_buys
        },

        sellAmount: (): number => {
            const saved_data = fetchSavedData();
            return +config.btc_bid_amount * saved_data.buying_levels;
        },

        buyAmount: (): number => {
            const buy_amount = +config.btc_bid_amount;

            const saved_data = fetchSavedData();
            if (saved_data.buying_levels === 0) {
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
            return "buy"
        }
        return "nothing";
    }

    async resetBot() {
        const btc_price = await this.trader.getBTCPrice();
        const saved_data = fetchSavedData();

        saved_data.buying_levels = 0;
        saved_data.status = "open";
        saved_data.buy_at = +btc_price;
        saved_data.sell_at = +btc_price;

        saved_data.save();
    }

    async setNextLimits() {
        const saved_data = fetchSavedData();
        const sum = (s:number) => !!s ? Math.pow(buy_perc, -s) + sum(s - 1) : 1;
        const btc_price = +(await this.trader.getBTCPrice());
        saved_data.buying_levels++;
        const n = saved_data.buying_levels + 1;
        const buy_perc = 1 - +config.buy_percentage;
        const sell_perc = 1 + +config.sell_percentage;
        
        saved_data.buy_at = btc_price * buy_perc;
        saved_data.sell_at = saved_data.buy_at * sell_perc * sum(n) / (n + 1);

        saved_data.save();
    }
}

function fetchSavedData(): saved_data {
    const file_name = "./helpers/.saved_data.json"
    const raw_data = readFileSync(file_name, 'utf8');

    // Remove unwanted characters from file.
    const data = raw_data.replace(/(\s|\/\*.*\*\/)/g, "");
    const object = JSON.parse(data);

    object.save = function (is_silent: boolean = false) {
        writeFileSync("./helpers/.saved_data.json", JSON.stringify(this, null, 2), 'utf8');
        if (!is_silent) {
            print(`• Status: ${object.status}\n• Buys in a row: ${object.buying_levels}\n• Buy At: ${object.buy_at}\n• Sell At: ${object.sell_at}\n`);
        }
    }

    return object;
}