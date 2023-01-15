'use strict'

import { Spot } from '@binance/connector';
import config from '../helpers/config.js';

/* USD to BTC */
const running_data = {
    buy_price: null,
    sell_price: null
}
let DEBUG = true;

export default class BinanceTrader {
    client
    constructor() {
        try {
            this.client = new Spot(config.api.binance.key, config.api.binance.secret);
        } catch (error) {
            throw new Error("Could not create a Spot class. Please check your internet connection or your API key & API Secret.");
        }
    }

    async queryBalances(): Promise<void> {

    }

    /**
     * 
     */
    async getBTCPrice(): Promise<string> {
        if (DEBUG) return "100000";

        const response = await this.client.avgPrice("BTCUSDT");
        const price = response?.data?.price;
        if (price == null) {
            throw new Error("Could not fetch price. Received:" + JSON.stringify({ status: response.status, data: JSON.stringify(response.data) }, null, 2));
        }
        return price;
    }

    async buyBTC(usd_buy_amount: number) {
        let btc_price = await this.getBTCPrice()
        let response: object;
        if (!DEBUG) {
            response = await this.client.newOrder('BTCUSDT', 'BUY', 'LIMIT', {
                price: btc_price,
                quantity: usd_buy_amount,
                timeInForce: 'GTC'
            });
            return response;
        } else {
            response = { status: 200 };
        }

        return response;
    }

    async sellBTC(usd_sell_amount: number) {
        let btc_price = await this.getBTCPrice()
        let response: object;
        if (!DEBUG) {
            response = await this.client.newOrder('BTCUSDT', 'SELL', 'LIMIT', {
                price: btc_price,
                quantity: usd_sell_amount,
                timeInForce: 'GTC'
            });
            return response;
        } else {
            response = { status: 200 };
        }

        return response;
    }

    // status = {
    //     get() {
    //         const object = fetchSavedData();
    //         return object.status;
    //     },

    //     /**
    //      * 
    //      * @param {'open' | 'bought' | 'on_hold'} status 
    //      */
    //     set(status) {
    //         const object = fetchSavedData();
    //         object.status = status;
    //         updateSavedData(object);
    //     },

    //     /**
    //      * The purpose of this function is to determine the status of 
    //      * the bot (i.e. it's next step), without any prior info, so that it can be
    //      * started out of the blue (after two day of shut down or something) and still 
    //      * get the correct status in case an old bid was sold (or cancelled by user).
    //      */
    //     async update() {
    //         this.set("bought");
    //     }
    // }

    // capital = {
    //     getBTC: async () => {
    //         const response = await this.client.account();
    //         const balances = response?.data?.balances;
    //         if (balances == null) {
    //             throw new Error("Could not fetch balances. Received:", JSON.stringify({ status: response.status, data: JSON.stringify(response.data) }, null, 2));
    //         }

    //         const btc_balance = balances.find(balance => balance.asset === "BTC");

    //         /* Returned as a string, in case some unwanted rounding is done. */
    //         return btc_balance.free;
    //     },

    //     getUSD: async () => {
    //         const response = await this.client.account();
    //         const balances = response?.data?.balances;
    //         if (balances == null) {
    //             throw new Error("Could not fetch balances. Received:", JSON.stringify({ status: response.status, data: JSON.stringify(response.data) }, null, 2));
    //         }

    //         const btc_balance = balances.find(balance => balance.asset === "USDT");

    //         /* Returned as a string, in case some unwanted rounding is done. */
    //         return btc_balance.free;
    //     }
    // }

    // buyCount = {
    //     add: () => {
    //         const object = fetchSavedData();
    //         object.buying_levels++;
    //         updateSavedData(object);
    //     },

    //     get: () => {
    //         const object = fetchSavedData();
    //         return object.buying_levels;
    //     }
    // }

    // getAmountUSDToBid() {
    //     return config.usd_bid_amount
    // }

    // async setNextLimits(btc_price) {
    //     running_data.buy_price = (1 - +config.buy_percentage) * +btc_price;
    //     running_data.sell_price = (1 + +config.sell_percentage) * +btc_price;

    //     console.log(`Next buy value: ${running_data.buy_price} | Next sell value: ${running_data.sell_price}.`);
    // }

    // getBTCSellValue() {
    //     return running_data.sell_price;
    // }

    // getBTCBuyValue() {
    //     return running_data.buy_price;
    // }
}
