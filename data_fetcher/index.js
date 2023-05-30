const MongoClient = require('mongodb');

async function fetchData() {
    const response = await fetch(process.env.LUNO_GET_PRICE_URL);
    const data = await response.json();
    return data.last_trade;
}

async function insertDataIntoMongoDB(data) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const collection = getCollection(client);
    await collection.insertOne({ timestamp: new Date(), price: data });

    await client.close();
}

function getCollection(client) {
    return client.db(process.env.MONGODB_DB_NAME).collection(process.env.MONGODB_COLLECTION_NAME);
}

async function run() {
    try {
        const data = await fetchData();
        console.log("Success:", { timestamp: new Date(), price: data });
        await insertDataIntoMongoDB(data);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

run();
