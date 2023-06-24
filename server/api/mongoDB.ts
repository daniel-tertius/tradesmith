import { MongoClient, ObjectId } from "mongodb";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

export default async function getRouter() {
    const uri = process.env.MONGODB_URI;
    if (typeof uri !== "string") throw Error("Could not find MongoDB URI");

    const db_name = process.env.MONGODB_DB_NAME;
    if (typeof db_name !== "string") throw Error("Could not find MongoDB DB Name");

    const router = express.Router();
    const client = new MongoClient(uri);
    const DB = client.db(db_name);

    const collectionsInfo = await DB.listCollections().toArray();
    const collectionNames = collectionsInfo.reduce((collectionNames: string[], collectionInfo) => {
        const collectionName = collectionInfo.name;
        if (!collectionName.startsWith('system.buckets.')) {
            collectionNames.push(collectionName);
        }

        return collectionNames;
    }, []);

    for (const collection_name of collectionNames) {
        const collection = DB.collection(collection_name);
        if (collection == null) throw Error(`Could not find the collection ${collection_name}`);

        // // Get an Element
        // router.get(`/${collection_name}/`, async (req, res) => {
        //     console.log("Got a hit on get " + collection_name);
        //     const config = await collection.find({}).toArray();
        //     if (config == null) throw Error("Could not fetch config.");
        //     res.send(JSON.stringify(config, null, 2));
        // });

        // Get an Element
        router.get(`/${collection_name}/all`, async (req, res) => {
            console.log("Got a hit on GET ALL " + collection_name);
            const config = await collection.find({}).toArray();
            if (config == null) throw Error("Could not fetch config.");
            res.send(JSON.stringify(config, null, 2));
        });

        // Add an Element
        router.post(`/${collection_name}/`, async (req, res) => {
            console.log("Got a hit on post " + collection_name);
            await collection.insertOne(req.body);
            res.status(201).send();
        })

        // Delete an Element
        router.delete(`/${collection_name}/:id`, async (req, res) => {
            console.log("Got a hit on delete " + collection_name);
            const id = new ObjectId(req.params.id);

            await collection.deleteOne({ _id: id });

            res.status(200).send();
        })

    }

    return router;
}