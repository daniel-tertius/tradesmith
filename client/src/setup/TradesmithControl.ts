import axios from 'axios';

const baseUrl = process.env.API_BASE_URL;

export default class TradeSmithControl {
    private static async get(name: string) {
        const res = await axios.post(`${baseUrl}/bot/${name}`);
        console.log(res.status);
    }

    static start = async () => this.get("start");
    static continue = async () => this.get("continue");
    static stop = async () => this.get("stop");
}
