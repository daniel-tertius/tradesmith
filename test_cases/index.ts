import Tradesmith from "../server/api/trader/TradeSmith";
const LUNO_API_KEY = "rjpbbwu397rm"
const LUNO_API_SECRET = "7duRqBIjaByrFlIjeoF8kctkjxoPLiWwqN3utCADcLw"

function run() {
    const tradesmith = new Tradesmith({
        btcGapBetweenBuys: 0.0001,
        btcTradeAmount: 0.0001,
        idleTime: 10 * 1000,
        profitPercentage: 1,
        lunoKey: LUNO_API_KEY,
        lunoSecret: LUNO_API_SECRET,
        isDebugging: true
    });

    tradesmith.start();
}

run();