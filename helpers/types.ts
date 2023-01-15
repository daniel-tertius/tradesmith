import BinanceTrader from "../interfaces/binance";
import LunoTrader from "../interfaces/luno";

export type trader_type = 'luno' | 'binance';
export type trader_class = BinanceTrader | LunoTrader;
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