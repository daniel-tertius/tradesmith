import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

class DBCollection<T> {
    private readonly url: string;
    private readonly name: string;

    constructor(name: string) {
        this.url = `${baseUrl}/db/${name}`;
        this.name = name;
    }

    async getAll(): Promise<any[]> {
        try {
            const res: AxiosResponse = await axios.get(`${this.url}/all`);
            return res.data;
        } catch (error: any) {
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
    }

    // Implement getSome method if needed

    async getOne(): Promise<T | null> {
        try {
            const res: AxiosResponse<T | null> = await axios.get(`${this.url}/one`);
            return res.data;
        } catch (error: any) {
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
    }

    async deleteSome(ids: string[]): Promise<void> {
        const joined_ids = `(${ids.join("), (")})`;
        try {
            await axios.delete(`${this.url}/${joined_ids}`);
        } catch (error: any) {
            throw new Error(`Failed to delete data: ${error.message}`);
        }
    }

    async deleteOne(id: string): Promise<void> {
        try {
            await axios.delete(`${this.url}/${id}`);
        } catch (error: any) {
            throw new Error(`Failed to delete data: ${error.message}`);
        }
    }

    // Implement updateAll method if needed

    async updateOne(updated_data: { id: string; object: dbObject }): Promise<void> {
        if (!updated_data) return;

        try {
            await axios.post(this.url, updated_data);
        } catch (error: any) {
            throw new Error(`Failed to update data: ${error.message}`);
        }
    }

    async create(new_object: dbObject): Promise<void> {
        try {
            console.log(`New ${this.name}: ${JSON.stringify(new_object, null, 2)}`);
            
            await axios.post(this.url, new_object);
        } catch (error: any) {
            throw new Error(`Failed to create data: ${error.message}`);
        }
    }
}

export default class DB {
    static log = new DBCollection("logs");
    static config = new DBCollection("configs");
    static user = new DBCollection("users");
    static btc_price = new DBCollection("btc_price");
}

type log = {
    title: string;
    message: string;
    actor: string;
    action: string;
    success: boolean;
}

type config = {

}

type user = {

}

type btc_price = {

}

type dbObject = log | config | user | btc_price