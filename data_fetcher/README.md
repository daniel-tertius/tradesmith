# Data Fetcher
Data Fetcher is a Node.js application running on AWS EC2 that fetches data from an external API and inserts it into a MongoDB database. It is designed to run as a background process using PM2 to ensure continuous data retrieval and storage.

## Prerequisites
Before running the application, ensure that you have the following set up:

- Node.js installed on your system
- MongoDB database connection details (URI, database name, and collection name)
- External API URL for data retrieval (I am using Luno)

## Installation
1. Clone this repository to your local machine.
2. Install the required npm packages by running the following command in the project directory:

```
npm install
```

## Configuration
Update the PM2 configuration in `ecosystem.config.js` to customize the behaviour of the Data Fetcher process. You can modify the `cron_restart` schedule, environment variables, and other settings according to your requirements.

## Usage
To start the Data Fetcher process, run the following command:

```
pm2 start pm2.config.js --env production
```

The process will now run continuously according to the specified cron schedule, fetching data from the external API and inserting it into the configured MongoDB database.

## Environment Variables
The Data Fetcher uses the following environment variables for configuration:

- NODE_ENV: Specifies the execution environment (e.g., development, production).
- MONGODB_URI: The MongoDB connection URI.
- MONGODB_DB_NAME: The name of the MongoDB database to use.
- MONGODB_COLLECTION_NAME: The name of the collection within the database to store the data.
- BTC_PRICE_API_URL: The URL of the external API for data retrieval.

Ensure that these environment variables are properly set before running the application.

## Monitoring
You can monitor the Data Fetcher process using PM2. Some useful PM2 commands are:

To view the list of running processes:

```
pm2 list
```
To view detailed information about a specific process:

```
pm2 show "Data Fetcher"
```
To stop the process:

```
pm2 stop Data Fetcher
```
For more information on using PM2, please refer to the official documentation: PM2 Documentation