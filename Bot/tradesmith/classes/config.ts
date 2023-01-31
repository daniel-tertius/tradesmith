require('dotenv').config();

import { Collection, MongoClient } from 'mongodb';

class Config {
    client: MongoClient
    collection: Collection

    constructor() {
        const uri = process.env.MONGODB_URI;
        if (uri == null) throw new Error('MONGODB_URI is not defined');
    
        this.client = new MongoClient(uri);
    }

    async start() {
        await this.client.connect();

        const collection_name = process.env.MONGODB_CONFIG_COLLECTION_NAME;
        if (collection_name == null) throw new Error('MONGODB_COLLECTION_NAME is not defined');

        this.collection = this.getCollection(collection_name);
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
    async findOne(query: object): Promise<object | null>{
        return await this.collection.findOne(query);
    }
}