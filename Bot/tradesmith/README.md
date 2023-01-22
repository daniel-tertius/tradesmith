# TradeSmith
version 1.0.1

## Description
Tradesmith is a bot that trades Bitcoin on Luno or Binance(WIP).

## Files concerning Users
Here is a description of all files concerning users.
Since there is no front end (yet), the user will have to get his hands dirty.

- `helpers/config.ts` - NB! All the settings and information (configurations) are stored in this file. Please make sure all the values are correct before starting TradeSmith. There are comments to help the user know what each value should be. **NOTE:** Please ignore the `as <text>` that are at the end of most lines. Those are for TradeSmith.
- `Output/` directory - Each time the user starts TradeSmith, TradeSmith will make a file to log all the output. The file's name will be the date and time the user ran TradeSmith (eg. `Output_2000-01-01_00_h_00_min_00_s`).

## Startup
### Ubuntu
Node and Typescript should be installed on the user's device. Improved installation steps page is in order.
After the user installed everything run these commands:
1. `tsc index.ts`
2. `node index.js` - if you want to reset the Bot (forgetting the previous run's data): `node index.js reset`

## Vision
The current version of TradeSmith (v1.0.0) is a far cry from what it can and should be. Hopefully, over time the Program will improve to a fully formed App with a frontend and much more user-friendly features.

## Changelog
### v1.0.1 - 15 January 2023
#### Changed
- Some code clean up.
#### Added
- Added check for enough funds.

### v1.0.0 - 15 January 2023
#### Changed
- Initial Build