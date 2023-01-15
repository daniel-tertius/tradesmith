import { trader_type, currency_pair } from "./types"
export default {
    // If debug is true, no real trading will happen.
    debug: true as boolean,
    
    // Your trading platform of choice. Currently available: 'luno', 'binance'.
    trader_type: "luno" as trader_type,
    
    // Your trading pair of choice. Available: USD to BTC, ZAR to BTC.
    currency_pair: {
        // Buying and Selling will be using this currency.
        target: "BTC",
        // The currency you will be buying/selling with.
        capital: "ZAR"
    } as currency_pair,
    
    // Depending on 'trader_type' which API details you'll use.
    api: {
        binance: {
            key: "LyfVj1Uwv9hIy2aOhVvmQY7Ky3vnFLVhZZ50aUWIVjmSStCmHGljzlfLWPqDKXvN",
            secret: "VFwdyJcWcoBoPmuXO5qjjnyHUUWR75lrSmeB3Z1CgDY8cSdBx6XqMLYh8NuYC1rp"
        },
        luno: {
            key: "ckt4zur6teytt",
            secret: "DN64ILFTcbuubHO0cBQQsQCgUXFBfN6BPCk1feaVMdo",
        }
    },
    
    // Amount of percentage the BTC price has to increase/decrease before buying or selling again.
    // WARNING: LUNO takes a specific amount as trading fee. Makes sure the %'es are not too low.
    buy_percentage: "0.002" as string,
    sell_percentage: "0.0002" as string,
    
    // Amount of BTC to trade with.
    btc_bid_amount: "0.0002" as string,
    // How long pause between each time the bot runs (in minute, fractions are possible).
    minutes_interval_loop: 0.5 as number,
    // This is the amount of buys that may be done, before the bot is put on hold.
    max_buys: 5 as number
}