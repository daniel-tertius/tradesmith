import Tradesmith from "../server/api/trader2/Tradesmith";
const LUNO_API_KEY = "rjpbbwu397rm"
const LUNO_API_SECRET = "7duRqBIjaByrFlIjeoF8kctkjxoPLiWwqN3utCADcLw"

async function run() {
    // const tradesmith = new Tradesmith({
    //     btcGapBetweenBuys: 0.0001,
    //     btcTradeAmount: 0.0001,
    //     idleTime: 10 * 1000,
    //     profitPercentage: 1,
    //     lunoKey: LUNO_API_KEY,
    //     lunoSecret: LUNO_API_SECRET,
    //     isDebugging: true
    // });
    const tradesmith = new Tradesmith({
        key: LUNO_API_KEY,
        secret: LUNO_API_KEY
    });

    await tradesmith.start();
}

run();
