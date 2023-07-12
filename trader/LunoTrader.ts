import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

import axios from 'axios';
import DB from "../client/src/DB";

export default class LunoTrader {
    private keyAndSecret: string;

    constructor(key: string, secret: string) {
        this.keyAndSecret = `${key}:${secret}`;
    }

    async buyBTC(btcBuyAmount: number, btcPrice: number) {

        const zarNeeded = btcBuyAmount * btcPrice;
        const zarBalance = await this.queryZARBalance();

        if (zarNeeded > zarBalance) {
            throw Error(`Your ZAR Balance (${zarBalance}) is too low to buy ${btcBuyAmount} at R ${btcPrice.toFixed(0)} per BTC.`);
        }

        const result = await LunoTrader.trade("BID", btcPrice, btcBuyAmount);
        DB.log.create({
            title: `Bought BTC`,
            message: `Bought ${btcBuyAmount} BTC @ ${btcPrice}`,
            action: "buy",
            actor: "LunoTrader",
            success: result.success
        })

        return result;
    }

    async sellBTC(btcSellAmount: number, btcPrice: number) {
        const btcBalance = await this.queryBTCBalance();

        if (btcSellAmount > btcBalance) {
            throw Error(`Your BTC Balance (${btcBalance}) is too low to sell ${btcSellAmount}.`);
        }

        const result = await LunoTrader.trade('ASK', btcPrice, btcSellAmount);
        DB.log.create({
            title: `Sold BTC`,
            message: `Sold ${btcSellAmount} BTC @ ${btcPrice}`,
            action: "sell",
            actor: "LunoTrader",
            success: result.success
        });

        return result;
    }

    private async queryZARBalance() {
        const headers = this.getHeaders();
        const url = this.getLunoBalanceURL()

        try {
            const response = await axios.get(url, headers);
            const balances: { asset: string, balance: number }[] = response.data.balance
            const zarBalance = balances.find((balance) => balance.asset === 'ZAR');
            return zarBalance ? zarBalance.balance : NaN;
        } catch (error: any) {
            console.error('Failed to fetch ZAR balance:', error.message);
            return NaN;
        }
    }

    async queryBTCBalance() {
        const headers = this.getHeaders();
        const url = this.getLunoBalanceURL()

        try {
            const response = await axios.get(url, headers);
            const balances: { asset: string, balance: number }[] = response.data.balance
            const btcBalance = balances.find((balance) => balance.asset === 'XBT');
            return btcBalance ? btcBalance.balance : 0;
        } catch (error: any) {
            console.error('Failed to fetch BTC balance:', error.message);
            return 0;
        }
    }

    async getOpenOrders(): Promise<null | { asks: { price: string, volume: string }[], bids: { price: string, volume: string }[] }> {
        const headers = this.getHeaders();
        const url = process.env.LUNO_OPEN_ORDERS_URL;
        if (!url) throw Error("Could not find Luno Open Orders URL");

        try {
            const response = await axios.get(url, headers);

            return response.data;
        } catch (error: any) {
            console.error(`Failed to fetch Open Orders: ${error.message}`);
            return null;
        }
    }

    async cancelOrder(orderId: string): Promise<{ success: boolean }> {
        const headers = this.getHeaders();
        const url = process.env.LUNO_OPEN_ORDERS_URL;
        if (!url) throw Error("Could not find Luno Cancel Orders URL");

        const response = await axios.post(url, { "order_id": orderId }, headers);
        const is_success = response.status.toString().startsWith('2');

        DB.log.create({
            title: `Cancelled Order`,
            message: `Canceled Order with ID ${orderId}.`,
            action: "cancelOrder",
            actor: "LunoTrader",
            success: is_success,
        });

        return { success: is_success }
    }

    private getHeaders() {
        return {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                Authorization: `Basic ${Buffer.from(this.keyAndSecret).toString('base64')}`,
            },
        };
    }

    private getLunoBalanceURL() {
        const url = process.env.LUNO_BALANCE_URL;
        if (!url) {
            throw new Error('Could not find Luno Balance URL.');
        }
        return url;
    }




    /*async getBuyPrice(): Promise<number> {
        const luno_url = process.env.LUNO_GET_PRICE_URL
        if (luno_url == null) throw Error("Could not find the LUNO API URL.");

        const response = await fetch(luno_url);// TODO Update to use axios?
        const data = await response.json();
        return data.ask + 1;
    }


    async getSellPrice(): Promise<number> {
        const luno_url = process.env.LUNO_GET_PRICE_URL
        if (luno_url == null) throw Error("Could not find the LUNO API URL.");

        const response = await fetch(luno_url);// TODO Update to use axios?
        const data = await response.json();
        return data.bid - 1;
    }*/


    private static async trade(type: 'ASK' | 'BID', btcPrice: number, btcAmount: number) {


        const typeConvert = { ASK: "Selling", BID: "Buying" }
        console.log(`📈 ${typeConvert[type]} ${btcAmount} BTC at R ${btcPrice.toFixed(0)} per BTC.`);

        const response = { status: 200 } /*await axios({
        method: "post",
        url: "https://api.luno.com/api/1/postorder",
        auth: {
          username: process.env.LUNO_API_KEY as string,
          password: process.env.LUNO_API_SECRET as string
        },
        data: jsonToURLEncodedForm({
          "pair": "XBTZAR",
          "type": type,
          "volume": btcAmount.toString(),
          "price": btcPrice.toString()
        })
      });*/

        const success = response.status.toString().startsWith("2");
        console.log(success ? "Success :)" : "Failed :(");

        return { success };
    }
}

function jsonToURLEncodedForm(json: Record<string, string | number> = {}) {
    return Object.entries(json).map(([key, value]) => `${key}=${value}`).join('&');
}

export async function getLastPrice(): Promise<number> {
    const lunoUrl = process.env.LUNO_GET_PRICE_URL;
    if (!lunoUrl) {
        throw new Error('Could not find the LUNO API URL.');
    }

    try {
        const response = await axios.get(lunoUrl);
        const data = response.data;
        return data.last_trade;
    } catch (error: any) {
        console.error('Failed to fetch last price:', error.message);
        throw new Error('Failed to fetch last price.');
    }
}

export async function getCurrentBuyPrice(): Promise<number> {
    const lunoUrl = process.env.LUNO_GET_PRICE_URL;
    if (!lunoUrl) {
        throw new Error('Could not find the LUNO API URL.');
    }

    try {
        const response = await axios.get(lunoUrl);
        const data = response.data;
        return data.bid - 1;
    } catch (error: any) {
        console.error('Failed to fetch last price:', error.message);
        throw new Error('Failed to fetch last price.');
    }
}
