import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env'});

async function fetchData(): Promise<string> {
    const luno_url = process.env.LUNO_GET_PRICE_URL
    if (luno_url == null) throw Error("Could not find the LUNO API URL.");

    const response = await fetch(luno_url);
    const data = await response.json();
    return data.last_trade;
}

async function insertDataIntoMongoDB(data: string) {
    const uri = process.env.MONGODB_URI;
    if (typeof uri !== "string") throw Error("Could not find MongoDB URI");

    const db_name = process.env.MONGODB_DB_NAME;
    if (typeof db_name !== "string") throw Error("Could not find MongoDB DB Name");

    const client = new MongoClient(uri);
    await client.connect();

    const collection = getCollection(client);
    await collection.insertOne({ timestamp: new Date(), price: data });
    console.log("Success:", { timestamp: new Date(), price: data });

    await client.close();
}

function getCollection(client: MongoClient) {
    const db_name = process.env.MONGODB_DB_NAME;
    if (typeof db_name !== "string") throw Error("Could not find MongoDB DB Name");

    const db_collection_name = process.env.MONGODB_COLLECTION_NAME;
    if (typeof db_collection_name !== "string") throw Error("Could not find MongoDB Collection Name");

    return client.db(db_name).collection(db_collection_name);
}

async function run() {
    try {
        const data = await fetchData();

        await insertDataIntoMongoDB(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

run();
