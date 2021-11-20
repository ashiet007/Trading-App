import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import dealReducers from "./deal.reducers";
import stocksReducer from "./stocks.reducer";
import forexReducers from "./forex.reducers";
import cryptoReducers from "./crypto.reducers";

const MarketPairs = (state = {}, action) => {
    switch (action.type) {
        case "ADD_MARKET_PAIRS":
            return Object.assign({}, action.data);
        case "UPDATE_MARKET_PAIRS":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const BookTicker = (state = {}, action) => {
    switch (action.type) {
        case "ADD_BOOK_TICKER":
            return Object.assign({}, action.data);
        case "UPDATE_BOOK_TICKER":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const AllBookTickers = (state = {}, action) => {
    switch (action.type) {
        case "ADD_ALL_BOOK_TICKERS":
            return Object.assign({}, action.data);
        case "UPDATE_ALL_BOOK_TICKERS":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const AllStocksQuotes = (state = {}, action) => {
    switch (action.type) {
        case "ADD_ALL_STOCKS_QUOTES":
            return Object.assign({}, action.data);
        case "UPDATE_ALL_STOCKS_QUOTES":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const AllForexQuotes = (state = {}, action) => {
    switch (action.type) {
        case "ADD_ALL_FOREX_QUOTES":
            return Object.assign({}, action.data);
        case "UPDATE_ALL_FOREX_QUOTES":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const ActiveCurrencyTick = (state = { tick_size: 2, tick: "0.01" }, action) => {
    switch (action.type) {
        case "ADD_TICK":
            return (state = action.data);
        case "UPDATE_TICK":
            return (state = action.data);
        default:
            return state;
    }
};

const ActiveMarket = (state = {}, action) => {
    switch (action.type) {
        case "SET_ACTIVE_MARKET":
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const Tickers = (state = {}, action) => {
    switch (action.type) {
        case "SET_TICKER":
            return Object.assign({}, action.data);
        default:
            return state;
    }
};

const WalletAmount = (state = 0, action) => {
    switch (action.type) {
        case "UPDATE_WALLET":
            return (state = action.data);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    market_pairs: MarketPairs,
    active_market: ActiveMarket,
    book_ticker: BookTicker,
    all_book_tickers: AllBookTickers,
    all_stocks_quotes: AllStocksQuotes,
    all_forex_quotes: AllForexQuotes,
    currency_tick: ActiveCurrencyTick,
    auth: authReducers,
    deal: dealReducers,
    allStocks: stocksReducer,
    allForexes: forexReducers,
    crypto: cryptoReducers,
    wallet_amount: WalletAmount,
});

export default rootReducer;
