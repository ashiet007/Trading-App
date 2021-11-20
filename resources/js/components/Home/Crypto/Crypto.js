import React, { useState, useEffect, useRef } from "react";
import Chart from "./Chart";
import Order from "./Order";
import Ticker from "./Ticker";
import BuySell from "./BuySell";
import { getCryptocurrencies } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Crypto = () => {
    const dispatch = useDispatch();
    const marketPairs = useSelector((state) => state.market_pairs);
    const bookTicker = useSelector((state) => state.book_ticker);
    const activeMarket = useSelector((state) => state.active_market);
    const tick = useSelector((state) => state.currency_tick);
    const [activeCurrency, setActiveCurrency] = useState("BTCGBP");
    const ws = useRef(null);
    const abt = useRef(null);

    useEffect(() => {
        dispatch(getCryptocurrencies());
    }, []);

    const connectTicker = () => {
        //connect
        ws.current = new WebSocket(
            "wss://stream.binance.com:9443/ws/!ticker@arr"
        );
        // on message receive
        ws.current.onmessage = (e) => {
            const allTickers = JSON.parse(e.data);
            let tickers = {};
            allTickers.forEach((data) => {
                tickers[data.s] = data;
            });
            dispatch({
                type: "UPDATE_MARKET_PAIRS",
                data: tickers,
            });
        };
        //on connection close
        ws.current.onclose = (e) => {
            setTimeout(function () {
                connectTicker();
            }, 1000);
        };
    };

    //All Book Ticker Data
    const connectBookTicker = () => {
        //Connect
        abt.current = new WebSocket(
            "wss://stream.binance.com:9443/ws/!bookTicker"
        );
        //On message receive
        abt.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            let allBookTickersData = {};
            allBookTickersData[message.s] = message;
            dispatch({
                type: "UPDATE_ALL_BOOK_TICKERS",
                data: allBookTickersData,
            });
        };
        //on connection close
        ws.current.onclose = (e) => {
            setTimeout(function () {
                connectBookTicker();
            }, 1000);
        };
    };
    useEffect(() => {
        connectTicker();
        connectBookTicker();
        setInterval(() => {
            connectTicker();
            connectBookTicker();
        }, 60000);
    }, []);

    useEffect(() => {
        let market = activeMarket.market ? activeMarket.market : "GBP";
        dispatch({
            type: "SET_ACTIVE_MARKET",
            data: {
                filtered_pairs: Object.keys(marketPairs).filter((item) =>
                    item.endsWith(market)
                ),
                market: market,
            },
        });
    }, [marketPairs]);

    useEffect(() => {
        fetchSymbolInfo(activeCurrency);
    }, [activeCurrency]);

    const fetchSymbolInfo = (currency) => {
        axios
            .get("/api/symbol-informations", {
                params: {
                    symbol: currency,
                },
            })
            .then((res) => {
                dispatch({
                    type: "UPDATE_TICK",
                    data: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleUpdateCurrency(currency) {
        setActiveCurrency(currency);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Ticker
                    currency={activeCurrency}
                    handleUpdateCurrency={handleUpdateCurrency}
                    tickers={activeMarket.filtered_pairs}
                    market={activeMarket.market}
                    marketPairs={marketPairs}
                />
                <div className="col-xl-6">
                    <Chart
                        currency={activeCurrency}
                        market={activeMarket.market}
                        marketPairs={marketPairs}
                        handleUpdateCurrency={handleUpdateCurrency}
                    />
                </div>
                <div className="col-xl-3">
                    <BuySell
                        tickers={activeMarket.filtered_pairs}
                        market={activeMarket.market}
                        marketPairs={marketPairs}
                        bookTicker={bookTicker}
                        currency={activeCurrency}
                        tickSize={tick.tick_size}
                        tick={tick.tick}
                    />
                    <Order
                        marketPairs={marketPairs}
                        tickSize={tick.tick_size}
                        tick={tick.tick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Crypto;
