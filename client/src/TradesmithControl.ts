import axios from 'axios';

// const base_url = "http://ec2-18-133-230-118.eu-west-2.compute.amazonaws.com";
const base_url = "http://localhost:8000/api/bot";

export default class TradeSmithControl {
    private static async get(name: string) {
        const res = await axios.post(`${base_url}/${name}`);
        console.log(res.status);
    }

    static start = async () => this.get("start");
    static continue = async () => this.get("continue");
    static stop = async () => this.get("stop");
}
