import React, { useState, useEffect, useRef } from "react";
import Chart from "./Chart";
import Order from "./Order";
import Ticker from "./Ticker";
import BuySell from "./BuySell";
import { useDispatch, useSelector } from "react-redux";
import { getForexes, getLastForexQuotes } from "../../actions";
import axios from "axios";

const Forex = () => {
    const dispatch = useDispatch();
    const allForexQuotes = useSelector((state) => state.all_forex_quotes);
    const [activeTicker, setActiveTicker] = useState("AED/AUD");
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
        dispatch(getForexes());
        let allOpenDeals = [];
        allOpenDeals = deal.deals.filter((dealData) => {
            if (!dealData.closed_at && dealData.market_type == "Forex") {
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
        dispatch(getLastForexQuotes(quoteTickers, allForexQuotes));
    }, [marketStatus, activeTicker, openDeals]);

    useEffect(() => {
        if (ws.current) {
            ws.current.close();
        }
        connectForexQuote();
    }, [activeTicker, openDeals]);

    const connectForexQuote = () => {
        ws.current = new WebSocket("wss://socket.polygon.io/forex");

        let tickers = [];
        tickers.push(`C.${activeTicker}`);
        if (openDeals.length) {
            openDeals.forEach((dealData) => {
                tickers.push(`C.${dealData.market}`);
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
            const allForexes = JSON.parse(e.data);
            let forexes = {};
            allForexes.forEach((item) => {
                if (item.p != undefined) {
                    forexes[item.p] = {
                        sym: item.p,
                        bp: item.b,
                        ap: item.a,
                    };
                }
            });
            dispatch({
                type: "UPDATE_ALL_FOREX_QUOTES",
                data: forexes,
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

export default Forex;
