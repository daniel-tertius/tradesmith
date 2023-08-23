import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default class TradeSmithControl {
    private static async get(name: string, data = {}) {
        const res = await axios.post(`${baseUrl}/bot/${name}`, data);
        console.log(res.status);
    }

    static start = async (data: startObject) => this.get("start", data);
    static continue = async () => this.get("continue");
    static stop = async () => this.get("stop");
}

type startObject = {
    status?: "buy" | "wait" | "kill",
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