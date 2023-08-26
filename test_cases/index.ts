import Tradesmith from "../server/api/trader/TradeSmith";
const LUNO_API_KEY="ckt4zur6teytt"
const LUNO_API_SECRET="DN64ILFTcbuubHO0cBQQsQCgUXFBfN6BPCk1feaVMdo"

function run() {
    const tradesmith = new Tradesmith({
        btcGapBetweenBuys: 0.0001,
        btcTradeAmount: 0.0001,
        idleTime: 30 * 1000,
        profitPercentage: 1,
        lunoKey: "",
        lunoSecret: ""
    });

    tradesmith.start();
}

run();