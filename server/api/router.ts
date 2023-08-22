import { Db, MongoClient, ObjectId } from "mongodb";
import express, { Router } from 'express';
import Tradesmith from "../../trader/TradeSmith"

import dotenv from 'dotenv';
dotenv.config();


export default async function getRouter(): Promise<Router> {
    const router = express.Router();

    await setupDbRoutes(router);
    setupBotRoutes(router);

    return router;
}

async function connectToDatabase() {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;

    if (typeof uri !== "string" || typeof dbName !== "string") {
        throw new Error("Invalid MongoDB configuration");
    }

    const client = new MongoClient(uri);
    await client.connect();
    return client.db(dbName);
}

async function setupDbRoutes(router: Router) {
    const DB = await connectToDatabase();
    const collectionNames = await getCollectionNames(DB);

    for (const collectionName of collectionNames) {
        const collection = DB.collection(collectionName);
        if (!collection) {
            throw new Error(`Could not find the collection ${collectionName}`);
        }

        router.get(`/db/${collectionName}/all`, async (req, res) => {
            console.log(`Got a hit on GET ALL ${collectionName}`);
            const config = await collection.find({}).toArray();
            res.json(config);
        });

        router.get(`/db/${collectionName}/one`, async (req, res) => {
            console.log(`Got a hit on GET One ${collectionName}`);
            const config = await collection.findOne();
            res.json(config);
        });

        router.post(`/db/${collectionName}/`, async (req, res) => {
            console.log(`Got a hit on POST ${collectionName}`);
            await collection.insertOne(req.body);
            res.status(201).send();
        });

        router.delete(`/db/${collectionName}/:id`, async (req, res) => {
            console.log(`Got a hit on DELETE ${collectionName}`);
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
    let tradesmith: Tradesmith;

    router.post(`/bot/start`, (req, res) => {
        console.log("Start Body:", JSON.stringify(req.body, null, 2));
        tradesmith = new Tradesmith({
            ...req.body
        });
        tradesmith.start();
        console.log(`Got a hit on START bot`);
        res.sendStatus(201);
    });

    router.post(`/bot/stop`, (req, res) => {
        console.log(`Got a hit on STOP bot`);
        tradesmith.stop();
        res.sendStatus(201);
    });

    router.post(`/bot/continue`, (req, res) => {
        console.log(`Got a hit on CONTINUE bot`);
        tradesmith.start();

        res.sendStatus(201);
    });
}
