import axios from 'axios';
import { luno_ticker_type } from "../helpers/types";
import config from '../helpers/config';

export default class LunoTrader {
  zar_amount: number
  btc_amount: number

  constructor() {
    this.queryBalances();
  }

  setZAR(zar_amount: number) {
    this.zar_amount = zar_amount;
  }

  setBTC(btc_amount: number) {
    this.btc_amount = btc_amount;
  }

  getZAR(): number {
    return this.zar_amount;
  }

  getBTC(): number {
    return this.btc_amount;
  }

  async queryBalances(): Promise<void> {
    const url = "https://api.luno.com/api/1/balance";
    const options = {
      headers: {
        "Accept": 'application/json',
        "Accept-Charset": 'utf-8',
        "Authorization": `Basic ${btoa(config.api.luno.key + ':' + config.api.luno.secret)}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }
    const response = await axios.get(url, options);

    const new_btc_amount = response.data.balance.find(balance => balance.asset === "XBT").balance
    const new_zar_amount = response.data.balance.find(balance => balance.asset === "ZAR").balance
    this.btc_amount = new_btc_amount;
    this.zar_amount = new_zar_amount;
  }

  async getBTCPrice(): Promise<string> {
    const url = "https://api.luno.com/api/1/tickers";
    const response = await axios.get(url);
    const info = response.data.tickers.find(
      (info: luno_ticker_type) => info.pair === "XBTZAR"
    );

    return info.ask;
  }

  async getBTCAskPrice(): Promise<string> {
    const url = "https://api.luno.com/api/1/tickers";
    const response = await axios.get(url);
    const info = response.data.tickers.find(
      (info: luno_ticker_type) => info.pair === "XBTZAR"
    );

    return (+info.ask + 1).toString();
  }


  async getBTCBidPrice(): Promise<string> {
    const url = "https://api.luno.com/api/1/tickers";
    const response = await axios.get(url);
    const info = response.data.tickers.find(
      (info: luno_ticker_type) => info.pair === "XBTZAR"
    );

    return (+info.bid - 1).toString();
  }

  async buyBTC(btc_buy_amount: number) {
    let btc_price = +await this.getBTCAskPrice();
    if (btc_buy_amount * btc_price > this.zar_amount) {
      throw Error("Not enough ZAR funds.");
    }

    console.log(`📈 Buying ${btc_buy_amount} BTC at ${btc_price.toFixed(0)} ZAR/BTC.`);
    await trade("BID", btc_price, btc_buy_amount);
    await this.queryBalances();
  }

  async sellBTC(btc_sell_amount: number) {
    let btc_price = +await this.getBTCBidPrice();

    if (btc_sell_amount > this.btc_amount) {
      throw Error("Not enough BTC funds.");
    }

    console.log(`📈 Selling ${btc_sell_amount} BTC at ${btc_price.toFixed(0)} ZAR/BTC.`);
    await trade('ASK', btc_price, btc_sell_amount);
    await this.queryBalances();
  }
}

const jsonToURLEncodedForm = (json = {}) =>
  Object.keys(json).map(key => `${key}=${json[key]}`).join('&');

async function trade(type: 'ASK' | 'BID', btc_price: number, btc_amount: number) {
  const url = "https://api.luno.com/api/1/postorder"

  const token = `${config.api.luno.key}:${config.api.luno.secret}`;
  const encodedToken = Buffer.from(token).toString('base64');

  const options = {
    headers: {
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
      // "Authorization": "Basic " + encodedToken,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: {
      pair: "XBTZAR",
      type,
      volume: btc_amount,
      price: btc_price
    },
    method: "POST"
  }

  const response = await axios.post(url, options, {
    headers: {
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
      // "Authorization": "Basic " + encodedToken,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    auth: {
      username: config.api.luno.key,
      password: config.api.luno.secret
    }
  });
  const success = response.status.toString().startsWith("2");

  console.log(success ? "Success :)" : "Failed :(");

  return { success };
}