#!/bin/bash

# Change directory and compile TypeScript
cd server/api || { echo "Error: Unable to change directory."; exit 1; }
npx tsc || { echo "Error: TypeScript compilation failed."; exit 1; }

# Go back to the original directory
cd ../.. || { echo "Error: Unable to change directory."; exit 1; }

# Run the Node.js server
echo "Done Compiling Tradesmith API! 🛠️"
node server/api/dist/server/api/index.js || { echo "Error: Unable to start server."; exit 1; }
