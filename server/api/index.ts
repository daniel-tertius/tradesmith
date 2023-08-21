import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Prevent CORS errors
import getRouter from "./router";
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

async function run() {
    const router = await getRouter();
    if (router == null) throw Error("Could not find the router");

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', router);

    app.listen(port, () => console.log(`⚡️ Server started on port ${port}.`));
}

run();