module.exports = {
  apps: [
    {
      name: 'Data Fetcher Compiler',
      script: 'server/data_fetcher/script.sh',
      autorestart: false,
    },
    {
      name: 'Data Fetcher',
      script: 'node server/data_fetcher/dist/index.js',

      // Run every hour in production, every minute in development
      cron_restart: process.env.NODE_ENV === 'production' ? '0 * * * *' : '*/1 * * * *',
      autorestart: false,
    },
    {
      name: 'Tradesmith API',
      script: 'server/api/script.sh',
    },
    {
      name: "Tradesmith",
      script: "npm run serve",
      cwd: "client/"
    }
  ]
};