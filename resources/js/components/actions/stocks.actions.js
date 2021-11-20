import axios from "axios";
import { stocksConstants } from "./constant";

export const getStocks = (lastId = null, search = null) => {
    return (dispatch) => {
        dispatch({ type: stocksConstants.GET_STOCKS_REQUEST });
        axios
            .get("/api/polygon-stocks", {
                params: {
                    lastId: lastId,
                    search: search,
                },
            })
            .then((res) => {
                if (search != null) {
                    dispatch({
                        type: stocksConstants.FILTER_STOCKS,
                        payload: {
                            stocks: res.data.stocks,
                            last_id: res.data.last_id,
                        },
                    });
                } else {
                    dispatch({
                        type: stocksConstants.GET_STOCKS_SUCCESS,
                        payload: {
                            stocks: res.data.stocks,
                            last_id: res.data.last_id,
                        },
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: stocksConstants.GET_STOCKS_ERROR,
                });
            });
    };
};

export const getLastQuotes = (tickers, allStocksQuotes) => {
    return (dispatch) => {
        axios
            .get("/api/last-quotes", {
                params: {
                    tickers: JSON.stringify(tickers),
                },
            })
            .then((res) => {
                let quotes = res.data.quotes;
                let stocks = {};
                quotes.map((quote) => {
                    if (allStocksQuotes[quote.T] == undefined) {
                        stocks[quote.T] = {
                            sym: quote.T,
                            bp: quote.p,
                            ap: quote.P,
                        };
                    }
                });
                dispatch({
                    type: "UPDATE_ALL_STOCKS_QUOTES",
                    data: stocks,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
