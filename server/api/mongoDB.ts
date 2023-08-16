import { Db, MongoClient, ObjectId } from "mongodb";
import express, { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export default async function getRouter(): Promise<Router> {
    const router = express.Router();
    const DB = await connectToDatabase();

    await setupDbRoutes(router, DB);
    setupBotRoutes(router);

    return router;
}

async function connectToDatabase() {
    const uri = process.env.MONGODB_URI;
    const db_name = process.env.MONGODB_DB_NAME;

    if (typeof uri !== "string" || typeof db_name !== "string") {
        throw new Error("Invalid MongoDB configuration");
    }

    const client = new MongoClient(uri);
    await client.connect();
    return client.db(db_name);
}

async function setupDbRoutes(router: Router, DB: Db) {
    const collectionNames = await getCollectionNames(DB);

    for (const collection_name of collectionNames) {
        const collection = DB.collection(collection_name);

        if (!collection) {
            throw new Error(`Could not find the collection ${collection_name}`);
        }

        router.get(`/${collection_name}/all`, async (req, res) => {
            console.log(`Got a hit on GET ALL ${collection_name}`);
            const config = await collection.find({}).toArray();
            res.json(config);
        });

        router.post(`/${collection_name}/`, async (req, res) => {
            console.log(`Got a hit on POST ${collection_name}`);
            await collection.insertOne(req.body);
            res.status(201).send();
        });

        router.delete(`/${collection_name}/:id`, async (req, res) => {
            console.log(`Got a hit on DELETE ${collection_name}`);
            const id = new ObjectId(req.params.id);
            await collection.deleteOne({ _id: id });
            res.status(200).send();
        });
    }
}

async function getCollectionNames(DB: Db): Promise<string[]> {
    const collectionsInfo = await DB.listCollections().toArray();
    return collectionsInfo
        .filter(collectionInfo => !collectionInfo.name.startsWith('system.buckets.'))
        .map(collectionInfo => collectionInfo.name);
}

function setupBotRoutes(router: Router) {
    router.post(`/bot/start`, (req, res) => {
        console.log(`Got a hit on START bot`);
        res.sendStatus(201);
    });

    router.post(`/bot/stop`, (req, res) => {
        console.log(`Got a hit on STOP bot`);
        res.sendStatus(201);
    });

    router.post(`/bot/continue`, (req, res) => {
        console.log(`Got a hit on CONTINUE bot`);
        res.sendStatus(201);
    });
}
