import express, { static as _static } from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(json());
app.use(cors());

import posts from './routes/api/posts';
app.use('/api/posts', posts);

// Handle production.
if (process.env.NODE_ENV === 'production') {
    // Static folder.
    app.unsubscribe(_static(`${__dirname}/public/`));

    // Handle SPA.
    app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));