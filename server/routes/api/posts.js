require('dotenv').config();

const express = require('express');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const router = express.Router();

// Get Posts.
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();

    res.send(await posts.find({}).toArray());
});

// Add Post.
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        created_at: new Date(),
        minutes_interval_loop: req.body.minutes_interval_loop,
        buy_at: req.body.buy_at,
        buying_levels: req.body.buying_levels,
        sell_at: req.body.sell_at,
        max_buys: req.body.max_buys,
        buy_percentage: req.body.buy_percentage,
        sell_percentage: req.body.sell_percentage,
        zar_bid_amount: req.body.zar_bid_amount
    });
    res.status(201).send();
})

// Delete Post.
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    const id = new ObjectId(req.params.id);

    await posts.deleteOne({ _id: id });

    res.status(200).send();
})

async function loadPostsCollection() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    return client.db(process.env.MONGODB_DB_NAME).collection('configs');
}

module.exports = router;