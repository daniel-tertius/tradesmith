module.exports = {
  apps: [
    {
      name: 'Data Fetcher Compiler',
      script: 'bash run',
      cwd: 'server/data_fetcher/',
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
      script: 'bash run',
      cwd: 'server/api/'
    },
    {
      name: "Tradesmith",
      script: "npm run serve",
      cwd: "client/"
    }
  ]
};