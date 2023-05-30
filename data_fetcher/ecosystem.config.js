require('dotenv').config();
console.log("process.env.MONGODB_URI", process.env.MONGODB_URI)
module.exports = {
  apps: [
    {
      name: 'Data Fetcher',
      script: './index.js',
      cron_restart: process.env.NODE_ENV === 'production' ? '0 * * * *' : '*/1 * * * *', // Run every hour in production, every minute in development
      env_production: {
        NODE_ENV: 'production',
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
        MONGODB_COLLECTION_NAME: process.env.MONGODB_COLLECTION_NAME,
        LUNO_GET_PRICE_URL: process.env.LUNO_GET_PRICE_URL,
      },
      env_development: {
        NODE_ENV: 'development',
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
        MONGODB_COLLECTION_NAME: process.env.MONGODB_COLLECTION_NAME,
        LUNO_GET_PRICE_URL: process.env.LUNO_GET_PRICE_URL,
      },
    },
  ],
};