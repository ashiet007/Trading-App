import { stocksConstants } from "../actions/constant";

const initialState = {
    stocks: {},
    lastId: null,
    isStocksFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case stocksConstants.GET_STOCKS_REQUEST:
            state = {
                ...state,
                isStocksFetching: true,
            };
            break;
        case stocksConstants.GET_STOCKS_SUCCESS:
            const data = action.payload.stocks;
            let polygonStocks = {};
            data.forEach((item) => {
                polygonStocks[item.ticker] = {
                    ticker: item.ticker,
                    name: item.name,
                    market: item.market,
                    exchange: item.primary_exchange,
                    currency: item.currency_name,
                    logo: item.logo,
                };
            });
            state = {
                ...state,
                stocks: Object.assign({}, state.stocks, polygonStocks),
                lastId: action.payload.last_id,
                isStocksFetching: false,
            };
            break;
        case stocksConstants.GET_STOCKS_ERROR:
            state = {
                ...state,
                isStocksFetching: false,
            };
            break;
        case stocksConstants.FILTER_STOCKS:
            const filterData = action.payload.stocks;
            let filterPolygonStocks = {};
            filterData.forEach((item) => {
                filterPolygonStocks[item.ticker] = {
                    ticker: item.ticker,
                    name: item.name,
                    market: item.market,
                    exchange: item.primary_exchange,
                    currency: item.currency_name,
                    logo: item.logo,
                };
            });
            state = {
                ...state,
                stocks: filterPolygonStocks,
                lastId: action.payload.last_id,
                isStocksFetching: false,
            };
            break;
    }
    return state;
};
