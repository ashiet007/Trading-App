import React, { useState, useEffect, useRef } from "react";
import Chart from "./Chart";
import Order from "./Order";
import Ticker from "./Ticker";
import BuySell from "./BuySell";
import { useDispatch, useSelector } from "react-redux";
import {
    useGetForexesQuery,
    useGetForexLastQuoteQuery,
} from "../../../utils/store/services/forex";
import {
    updateForexes,
    updateForexQuotes,
} from "../../../utils/store/slice/forexSlice";
import Feed from "./../Feed";

const Forex = () => {
    const dispatch = useDispatch();
    const { forexes, forexQuotes, activeForex } = useSelector(
        (state) => state.forex
    );
    const ws = useRef(null);
    const deals = useSelector((state) => state.deal.deals);
    const forexesResponse = useGetForexesQuery();
    const openDeals = deals.filter((dealData) => {
        if (!dealData.closed_at && dealData.market_type == "Forex") {
            return dealData;
        }
    });
    let quoteTickers = [];
    quoteTickers.push(activeForex);
    if (openDeals.length) {
        openDeals.forEach((dealData) => {
            quoteTickers.push(dealData.market);
        });
    }
    const quoteRes = useGetForexLastQuoteQuery(quoteTickers);

    useEffect(() => {
        if (forexesResponse.data) {
            const forexesData = forexesResponse.data.forexes;
            let polygonForexes = {};
            forexesData.forEach((item) => {
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
            dispatch(
                updateForexes({
                    forexes: polygonForexes,
                    lastId: forexesResponse.data.last_id,
                })
            );
        }
        if (quoteRes.data) {
            let quotes = quoteRes.data.quotes;
            let forexLastQuotes = {};
            quotes.map((quote) => {
                if (forexQuotes[quote.symbol] == undefined) {
                    forexLastQuotes[quote.symbol] = {
                        sym: quote.symbol,
                        bp: quote.last.bid,
                        ap: quote.last.ask,
                    };
                }
            });
            dispatch(updateForexQuotes(forexLastQuotes));
        }
    }, [forexesResponse, quoteRes]);

    useEffect(() => {
        if (ws.current) {
            ws.current.close();
        }
        connectForexQuote();
    }, [activeForex, openDeals]);

    const connectForexQuote = () => {
        ws.current = new WebSocket("wss://socket.polygon.io/forex");

        let tickers = [];
        tickers.push(`C.${activeForex}`);
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
            let forexesQuotesList = {};
            allForexes.forEach((item) => {
                if (item.p != undefined) {
                    forexesQuotesList[item.p] = {
                        sym: item.p,
                        bp: item.b,
                        ap: item.a,
                    };
                }
            });
            dispatch(updateForexQuotes(forexesQuotesList));
        };
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Ticker />
                <div className="col-xl-6">
                    <Chart />
                    <Feed />
                </div>

                <div className="col-xl-3">
                    <BuySell />
                    <Order />
                </div>
            </div>
        </div>
    );
};

export default Forex;
