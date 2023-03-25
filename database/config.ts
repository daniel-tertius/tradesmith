require('dotenv').config();

import { Collection, MongoClient } from 'mongodb';
import { config_type } from '../helpers/types';

export default class Config {
    client: MongoClient
    collection: Collection

    constructor() {
        const uri = process.env.MONGODB_URI;
        if (uri == null) throw new Error('MONGODB_URI is not defined');

        this.client = new MongoClient(uri);
    }

    async getConfig(): Promise<config_type> {
        const collection_name = process.env.MONGODB_CONFIG_COLLECTION_NAME;
        if (collection_name == null) throw new Error('MONGODB_COLLECTION_NAME is not defined');

        this.collection = this.getCollection(collection_name);
        if (this.collection == null) throw new Error('MONGODB_CONFIG_COLLECTION_NAME is not defined');

        let config: config_type = await this.findOne({}) as config_type;
        if (config == null) throw Error("Could not fetch config.");

        config.disconnect = async () => {
            await this.disconnect();
        }

        config.save = async () => {
            let { disconnect, save, ...bare_config } = config;
            await this.updateOne(bare_config);
        }


        return config;
    }

    async connect() {
        try {
            await this.client.connect();
        } catch (err) {
            throw new Error(`Could not connect to MongoDB: ${err.stack || err}`);
        }
    }

    async disconnect() {
        await this.client.close();
    }

    getCollection(name: string) {
        const db_name = process.env.MONGODB_DB_NAME;
        if (db_name == null) throw new Error('MONGODB_DB_NAME is not defined');

        return this.client.db(db_name).collection(name);
    }

    async insertOne(data: object) {
        return await this.collection.insertOne(data);
    }

    async insertMany(data: object[]) {
        return await this.collection.insertMany(data);
    }

    async findOne(query: object): Promise<unknown> {
        const config = await this.collection.findOne(query) as unknown;
        if (config == null) throw Error("Could not fetch config.");

        return config;
    }

    async updateOne(config: object): Promise<void> {
        await this.collection.updateOne({}, { $set: config }) as unknown;
    }
}