#!/bin/bash

# Change to the data_fetcher directory
cd server/data_fetcher || exit 1

# Compile using TypeScript
npx tsc || { echo "Error: Compilation failed"; exit 1; }

echo "DONE Compiling Data Fetcher 🛠️"
