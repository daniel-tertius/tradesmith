require('dotenv').config();
const path = require('path');

module.exports = {
  apps: [
    {
      name: 'Tradesmith API',
      script: 'node api/dist/index.js',

      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      }
    },
    {
      name: 'Data Fetcher',
      script: 'node data_fetcher/dist/index.js',

      // Run every hour in production, every minute in development
      cron_restart: process.env.NODE_ENV === 'production' ? '0 * * * *' : '*/1 * * * *',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      }
    }
  ]
};