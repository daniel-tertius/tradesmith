import Interface from './classes/interface';

let loop: NodeJS.Timer

export async function run() {
    const should_reset = process.argv[2] === "reset";
    const trader = await new Interface().start(should_reset);

    try {
        const minutes_timeout = trader.config.minutes_interval_loop * 60 * 1000;

        // Set the loop to do the trading after each interval.
        loop = setInterval(trader.execute, minutes_timeout);
    } catch (error) {
        console.error(error.stack || typeof error === "string" ? error : JSON.stringify(error, (key, value) => (value + "").length > 200 ? value.slice(0, 200) + "..." : value, 2));
        clearInterval(loop);
        await trader.end()
    }
}
run();