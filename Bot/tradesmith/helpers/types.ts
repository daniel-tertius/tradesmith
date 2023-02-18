// import BinanceTrader from "../classes/binance";
import LunoTrader from "../classes/luno";

export type trader_type = 'luno' | 'binance';
export type trader_class = LunoTrader;
export type bot_status = 'open' | 'bought' | 'on_hold';
export type currency_pair = { target: string, capital: string };
export type saved_data = {
    status: bot_status,
    buy_at: number,
    sell_at: number,
    buying_levels: number,
    max_buys: number
    save: Function,
}
export type luno_ticker_type = {
    pair: string,
    timestamp: number,
    bid: string,
    ask: string,
    last_trade: string,
    rolling_24_hour_volume: string,
    status: string
}

export type config_type = {
    minutes_interval_loop: number,
    buying_levels: number,
    status: bot_status,
    buy_at: number,
    sell_at: number,
    max_buys: number,
    zar_bid_amount: number,
    sell_percentage: number,
    buy_percentage: number,
    save: () => Promise<void>,
    disconnect: () => Promise<void>
}