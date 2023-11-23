export type statuses = "buy" | "wait" | "kill"
export type optionsType = {
    status?: statuses,
    idleTime: number,
    lunoKey: string,
    lunoSecret: string,
    btcTradeAmount: number,
    btcGapBetweenBuys: number,
    profitPercentage: number
    waitForValue?: {
        buy: number,
        sell: number
    },
    buyPrices?: number[],
    isDebugging?: boolean
}

export type lunoOrder = {
        "base": string,
        "completed_timestamp": string,
        "counter": string,
        "creation_timestamp": string,
        "expiration_timestamp": string,
        "fee_base": string,
        "fee_counter": string,
        "limit_price": string,
        "limit_volume": string,
        "order_id": string,
        "pair": string,
        "state": "PENDING" | "COMPLETE",
        "time_in_force": string,
        "type": "BID" | "ASK"
    }