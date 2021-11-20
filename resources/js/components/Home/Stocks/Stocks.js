import React, { useState, useEffect, useRef } from "react";
import Chart from "./Chart";
import Order from "./Order";
import Ticker from "./Ticker";
import BuySell from "./BuySell";
import { useDispatch, useSelector } from "react-redux";
import { getStocks, getLastQuotes } from "../../actions";
import axios from "axios";

const Stocks = () => {
    const dispatch = useDispatch();
    const allStocksQuotes = useSelector((state) => state.all_stocks_quotes);
    const [activeTicker, setActiveTicker] = useState("A");
    const [marketStatus, setMarketStatus] = useState("closed");
    const [openDeals, setOpenDeals] = useState([]);
    const deal = useSelector((state) => state.deal);
    const ws = useRef(null);

    const updateMarketStatus = () => {
        axios
            .get("/api/market-status")
            .then((res) => {
                const status = res.data.status;
                setMarketStatus(status);
            })
            .catch((err) => {
                setMarketStatus("closed");
            });
    };

    useEffect(() => {
        updateMarketStatus();
        setInterval(() => {
            updateMarketStatus();
        }, 60000);
        dispatch(getStocks());
        let allOpenDeals = [];
        allOpenDeals = deal.deals.filter((dealData) => {
            if (!dealData.closed_at && dealData.market_type == "Stocks") {
                return dealData;
            }
        });
        setOpenDeals(allOpenDeals);
    }, [deal]);

    useEffect(() => {
        let quoteTickers = [];
        quoteTickers.push(activeTicker);
        if (openDeals.length) {
            openDeals.forEach((dealData) => {
                quoteTickers.push(dealData.market);
            });
        }
        dispatch(getLastQuotes(quoteTickers, allStocksQuotes));
    }, [marketStatus, activeTicker, openDeals]);

    useEffect(() => {
        if (ws.current) {
            ws.current.close();
        }
        connectStocksQuote();
    }, [activeTicker, openDeals]);

    const connectStocksQuote = () => {
        ws.current = new WebSocket("wss://socket.polygon.io/stocks");

        let tickers = [];
        tickers.push(`Q.${activeTicker}`);
        if (openDeals.length) {
            openDeals.forEach((dealData) => {
                tickers.push(`Q.${dealData.market}`);
            });
        }
        // Connection Opened:
        ws.current.onopen = (e) => {
            ws.current.send(
                `{"action":"auth","params":"${process.env.MIX_POLYGON_API_KEY}"}`
            );
            ws.current.send(
                `{"action":"subscribe", "params":"${tickers.join()}"}`
            );
        };

        // Per message packet:
        ws.current.onmessage = (e) => {
            const allStocks = JSON.parse(e.data);
            let stocks = {};
            allStocks.forEach((item) => {
                if (item.sym != undefined) {
                    stocks[item.sym] = {
                        sym: item.sym,
                        bp: item.bp,
                        ap: item.ap,
                    };
                }
            });
            dispatch({
                type: "UPDATE_ALL_STOCKS_QUOTES",
                data: stocks,
            });
        };
    };

    function handleUpdateTicker(ticker) {
        setActiveTicker(ticker);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Ticker handleUpdateTicker={handleUpdateTicker} />
                <div className="col-xl-6">
                    <Chart
                        ticker={activeTicker}
                        handleUpdateTicker={handleUpdateTicker}
                    />
                </div>

                <div className="col-xl-3">
                    <BuySell
                        ticker={activeTicker}
                        marketStatus={marketStatus}
                    />
                    <Order />
                </div>
            </div>
        </div>
    );
};

export default Stocks;
