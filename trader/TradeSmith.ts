
// This is the trader itself.
export class TradeSmith {
    status: statuses;
    minutesTimeout: number;
    
    constructor(options: optionsType) {
        this.status = options.status;
        this.minutesTimeout = options.minutesTimeout;
    }

    start() {
        try {

        } catch (error) {

        }
    }

    stop() {
        this.status = "dead";
    }

    executeNextAction() {
        // const current_btc_price = getBTCPrice(); // TODO
    }
}

type statuses = "open" | "bought" | "on_hold" | "dead"
type optionsType = {
    status: statuses,
    minutesTimeout: number,

}