import axios, { AxiosResponse } from 'axios';

// const base_url = "ec2-18-133-230-118.eu-west-2.compute.amazonaws.com";
const base_url = "http://localhost:8000/api/db";

class DBCollection<T> {
    url: string;

    constructor(collection_name: string) {
        this.url = `${base_url}/${collection_name}`;
    }

    async getAll(): Promise<T[]> {
        const res: AxiosResponse<T[]> = await axios.get(`${this.url}/all`);
        return res.data;
    }

    async getSome(): Promise<T[]> {
        // TODO: Implement getSome method
        return [];
    }

    async getOne(): Promise<T | null> {
        const res: AxiosResponse<T | null> = await axios.get(`${this.url}/one`);
        return res.data;
    }

    async deleteSome(ids: string[]): Promise<void> {
        const joined_ids = `(${ids.join("), (")})`;
        await axios.delete(`${this.url}/${joined_ids}`);
    }

    async deleteOne(id: string): Promise<void> {
        await axios.delete(`${this.url}/${id}`);
    }

    async updateAll(): Promise<void> {
        // TODO: Implement updateAll method
    }

    async updateOne(updated_data: { id: string; object: object }): Promise<void> {
        if (!updated_data) return;

        await axios.post(this.url, updated_data);
    }

    async create(new_data: { title: string, message: string, actor: string, action: string, success: boolean }): Promise<void> {
        console.log("Log:", JSON.stringify(new_data, null, 2));
        await axios.post(this.url, new_data);
    }
}

export default class DB {
    static log = new DBCollection("logs");
    static config = new DBCollection("configs");
    static user = new DBCollection("users");
    static btc_price = new DBCollection("btc_price");
}
