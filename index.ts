'use strict'

import config from './helpers/config';
import Interface from './interface';
import { print, setFileName } from './helpers/functions'

setFileName(`Output/Output_${new Date().toLocaleString('fr-CA')}`.replace(/ /g, "_"));

// Define the class we will use to trade with.
const trader = new Interface(config.trader_type);

// Set the loop to do the trading after each interval.
const loop = setInterval(run, config.minutes_interval_loop * 60 * 1000);

// Initialise other variables
let PRINT_PRICE = false;
// @ts-ignore
const PROCESS = process;
// Handling Arguments
if (PROCESS.argv[2] != null && PROCESS.argv[2] === "reset") {
    print("Resetting...");
    trader.status.set("open");
}

async function run() {
    try {
        await main();
    } catch (error) {
        console.error(`❌ ${error.stack || JSON.stringify(error, null, 2)}`);
        clearInterval(loop);
    }
}

// Run the first instance.
run();

async function main() {
    const bot_status = trader.status.get();
    const usd_to_btc_price = await trader.trader.getBTCPrice();

    if (PRINT_PRICE) {
        const time = new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
        PROCESS.stdout.write(new TextEncoder().encode(`[${time}] BTC Price: ${usd_to_btc_price}\r`));
    }

    PRINT_PRICE = false;
    switch (bot_status) {
        case "open": // Can buy (happens at start, after a sell or after a freeze).
            await trader.resetBot();
            await trader.trade.buy();
            break;
        case "bought": // Waiting for the correct buy or sell price.
            const next_step = await trader.getNextStep();
            switch (next_step) {
                case 'buy': trader.trade.buy(); break;
                case 'sell': trader.trade.sell(); break;
                case 'nothing': PRINT_PRICE = true; break;
                default: throw new Error(`Unknown 'Next Step' found: ${next_step}.`);
            }
            break;
        case "on_hold": // Waiting for the price to settle, before continuing trading.
            // TODO: This will be implemented in later versions.
            clearInterval(loop);
            break;
        default: throw new Error(`Unknown 'Status' found: ${bot_status}.`);
    }
}