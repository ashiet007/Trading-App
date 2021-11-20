import axios from "axios";
import { forexConstants } from "./constant";

export const getForexes = (lastId = null, search = null) => {
    return (dispatch) => {
        dispatch({ type: forexConstants.GET_FOREX_REQUEST });
        axios
            .get("/api/polygon-forex", {
                params: {
                    lastId: lastId,
                    search: search,
                },
            })
            .then((res) => {
                if (search != null) {
                    dispatch({
                        type: forexConstants.FILTER_FOREXES,
                        payload: {
                            forexes: res.data.forexes,
                            last_id: res.data.last_id,
                        },
                    });
                } else {
                    dispatch({
                        type: forexConstants.GET_FOREX_SUCCESS,
                        payload: {
                            forexes: res.data.forexes,
                            last_id: res.data.last_id,
                        },
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: forexConstants.GET_FOREX_ERROR,
                });
            });
    };
};

export const getLastForexQuotes = (tickers, allForexQuotes) => {
    return (dispatch) => {
        axios
            .get("/api/last-forex-quotes", {
                params: {
                    tickers: JSON.stringify(tickers),
                },
            })
            .then((res) => {
                let quotes = res.data.quotes;
                let forexes = {};
                quotes.map((quote) => {
                    if (allForexQuotes[quote.symbol] == undefined) {
                        forexes[quote.symbol] = {
                            sym: quote.symbol,
                            bp: quote.last.bid,
                            ap: quote.last.ask,
                        };
                    }
                });
                dispatch({
                    type: "UPDATE_ALL_FOREX_QUOTES",
                    data: forexes,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
