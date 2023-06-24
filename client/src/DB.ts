import axios from 'axios';
// const base_url = "ec2-18-133-230-118.eu-west-2.compute.amazonaws.com";
const base_url = "http://localhost:8000/api";

class DBCollection {
    url: string = `${base_url}/`;

    constructor(collection_name: string) {
        this.url += collection_name;
    }

    async getAll() {
        const res = await axios.get(`${this.url}/all`);
        return res.data;
    }

    async getSome() {
        // TODO
    }

    async getOne() {
        const res = await axios.get(`${this.url}/one`);
        return res.data;
    }

    async deleteSome(ids: string[]) {
        const joined_ids = `(${ids.join("), (")})`;
        return axios.delete(`${this.url}/${joined_ids}`);
    }


    async deleteOne(id: string) {
        return axios.delete(`${this.url}/${id}`);
    }

    async updateAll() {
        // TODO
    }

    async updateOne(updated_data: { id: string, object: object }) {
        if (!updated_data) return;

        return axios.post(this.url, updated_data);
    }
}

export default class DB {
    static log = new DBCollection("logs");
    static config = new DBCollection("configs");
    static user = new DBCollection("users");
    static btc_price = new DBCollection("btc_price");
}