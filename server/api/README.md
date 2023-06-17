# Tradesmith API

This part of the project is an API that connects Vue.js, Express, and MongoDB. The API provides endpoints for retrieving, adding, and deleting data from MongoDB collections.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
```
git clone <repository-url>
```

2. Install the dependencies by running the following command in the project directory:
```
npm install
```

3. Create a `.env` file in the project directory and populate it with the necessary environment variables:
```
PORT=<port>
MONGODB_URI=<mongodb-uri>
MONGODB_DB_NAME=<mongodb-database-name>
```

Replace `<port>` with the desired port number to run the server on, `<mongodb-uri>` with the MongoDB connection URI, and `<mongodb-database-name>` with the name of the MongoDB database.

4. Start the server by running the following command:
```
npm start
```

## Project Structure

The project consists of the following files:

- `index.ts`: This file is the entry point of the application. It sets up an Express server, configures middleware (body parser and CORS), and registers the router returned by the `getRouter` function.
- `mongoDB.ts`: This file exports a function `getRouter` that sets up an Express router with endpoints for interacting with MongoDB collections. It establishes a connection to the MongoDB database using the provided URI and database name. The router provides GET, POST, and DELETE routes for each collection found in the database.

## Usage

Once the server is running, you can access the API endpoints using the following base URL:
```
http://localhost:<port>/api
```

Replace `<port>` with the port number specified in the `.env` file.

The available endpoints are dynamically generated based on the collections found in the MongoDB database. For each collection, the following routes are available:

- **GET /collection_name**: Retrieves all documents in the collection.
- **POST /collection_name**: Adds a new document to the collection. The document should be sent in the request body.
- **DELETE /collection_name/:id**: Deletes a document from the collection specified by its ID.

Replace `collection_name` with the actual name of the collection you want to interact with.
