import { forexConstants } from "../actions/constant";

const initialState = {
    forexes: {},
    lastId: null,
    isForexFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case forexConstants.GET_FOREX_REQUEST:
            state = {
                ...state,
                isForexFetching: true,
            };
            break;
        case forexConstants.GET_FOREX_SUCCESS:
            const data = action.payload.forexes;
            let polygonForexes = {};
            data.forEach((item) => {
                const symbol = `${item.base_currency_symbol}/${item.currency_symbol}`;
                polygonForexes[symbol] = {
                    ticker: item.ticker,
                    name: item.name,
                    market: item.market,
                    currency: item.currency_name,
                    currency_symbol: item.currency_symbol,
                    base_currency_symbol: item.base_currency_symbol,
                    logo: item.logo,
                };
            });
            state = {
                ...state,
                forexes: Object.assign({}, state.forexes, polygonForexes),
                lastId: action.payload.last_id,
                isForexFetching: false,
            };
            break;
        case forexConstants.GET_FOREX_ERROR:
            state = {
                ...state,
                isForexFetching: false,
            };
            break;
        case forexConstants.FILTER_FOREXES:
            const filterData = action.payload.forexes;
            let filterPolygonForexes = {};
            filterData.forEach((item) => {
                const symbol = `${item.base_currency_symbol}/${item.currency_symbol}`;
                filterPolygonForexes[symbol] = {
                    ticker: item.ticker,
                    name: item.name,
                    market: item.market,
                    currency: item.currency_name,
                    currency_symbol: item.currency_symbol,
                    base_currency_symbol: item.base_currency_symbol,
                    logo: item.logo,
                };
            });
            state = {
                ...state,
                forexes: filterPolygonForexes,
                lastId: action.payload.last_id,
                isForexFetching: false,
            };
            break;
    }
    return state;
};
