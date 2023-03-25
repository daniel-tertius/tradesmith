require('dotenv').config();

import { Collection, MongoClient } from 'mongodb';

export default class Log {
    client: MongoClient
    collection: Collection

    constructor() {
        const uri = process.env.MONGODB_URI;
        if (uri == null) throw new Error('MONGODB_URI is not defined');

        this.client = new MongoClient(uri);
    }

    async start() {
        await this.client.connect();

        const collection_name = process.env.MONGODB_LOG_COLLECTION_NAME;
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

// let client: MongoClient;

// export function setClient(uri: string) {
//     const _client = new MongoClient(uri);

//     client = _client;
//     return client;
// }

// export async function create(collection: Collection<Document>, data) {
//     if (Array.isArray(data)) {
//         await collection.insertMany(data);
//     } else {
//         await collection.insertOne(data);
//     }
// }

// export const read = {
//     async all(collection: Collection<Document>) {
//         return await collection.find({}).toArray();
//     },
//     async some(collection: Collection, filter) {
//         return await collection.find(filter).toArray();
//     },
//     async first(collection: Collection<Document>, filter) {
//         return await collection.findOne(filter);
//     },

// }

// export const update = {
//     async all(collection: Collection<Document>, update) {
//         await collection.updateMany({}, { $set: update });
//     },
//     async some(collection: Collection<Document>, filter, update) {
//         await collection.updateMany(filter, { $set: update });
//     },
//     async first(collection: Collection<Document>, filter, update) {
//         await collection.updateOne(filter, { $set: update });
//     }
// }

// export const destroy = {
//     async all(collection: Collection<Document>) {
//         await collection.deleteMany({});
//     },
//     async some(collection: Collection<Document>, filter) {
//         await collection.deleteMany(filter);
//     },
//     async first(collection: Collection<Document>, filter) {
//         await collection.deleteOne(filter);
//     }
// }

// export const print = {
//     async all(collection: Collection<Document>) {
//         const all_data = await read.all(collection)
//         console.log("ALL DATA:", JSON.stringify(all_data, null, 2));
//     }
// }

// export function getDatabase(db_name: string) {
//     return client.db(db_name);
// }

// export function getCollection(db_name, col_name) {
//     const db = getDatabase(db_name);
//     return db.collection(col_name);
// }