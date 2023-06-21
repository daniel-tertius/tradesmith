#!/bin/bash
cd server/api
npx tsc
cd ../..
echo Done Compiling Tradesmith API! 🛠️
node server/api/dist/index.js