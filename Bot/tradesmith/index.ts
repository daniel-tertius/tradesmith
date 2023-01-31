import Interface from './classes/interface';

let loop: NodeJS.Timer
let trader: Interface;

export async function run() {
    // Define the class we will use to trade with.
    trader = new Interface();

    // Handling Arguments
    if (process.argv[2] != null && process.argv[2] === "reset") {
        print("Resetting...");
        trader.status.set("open");
    }

    // Set the loop to do the trading after each interval.
    try {
        loop = setInterval(main, config.minutes_interval_loop * 60 * 1000);
        await main();
    } catch (error) {
        console.error(`❌ ${error.stack || JSON.stringify(error, null, 2)}`);
        clearInterval(loop);
        await trader.end()
    }
}
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
