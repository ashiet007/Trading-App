import React, { useState, useEffect, useRef } from "react";
import Chart from "./Chart";
import Order from "./Order";
import Ticker from "./Ticker";
import BuySell from "./BuySell";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./../Feed";
import {
    useGetStockLastQuoteQuery,
    useGetStocksQuery,
} from "../../../utils/store/services/stocks";
import {
    updateStocks,
    updateStocksQuotes,
} from "../../../utils/store/slice/stocksSlice";

const Stocks = () => {
    const dispatch = useDispatch();
    const { stocks, stocksQuotes, activeStock } = useSelector(
        (state) => state.stocks
    );
    const deals = useSelector((state) => state.deal.deals);
    const ws = useRef(null);
    const stocksResponse = useGetStocksQuery();
    const openDeals = deals.filter((dealData) => {
        if (!dealData.closed_at && dealData.market_type == "Stocks") {
            return dealData;
        }
    });
    let quoteTickers = [];
    quoteTickers.push(activeStock);
    if (openDeals.length) {
        openDeals.forEach((dealData) => {
            quoteTickers.push(dealData.market);
        });
    }
    const quoteRes = useGetStockLastQuoteQuery(quoteTickers);
    useEffect(() => {
        if (stocksResponse.data) {
            const stocksData = stocksResponse.data.stocks;
            let polygonStocks = {};
            stocksData.forEach((item) => {
                polygonStocks[item.ticker] = {
                    ticker: item.ticker,
                    name: item.name,
                    market: item.market,
                    exchange: item.primary_exchange,
                    currency: item.currency_name,
                    logo: item.logo,
                };
            });
            dispatch(
                updateStocks({
                    stocks: polygonStocks,
                    lastId: stocksResponse.data.last_id,
                })
            );
        }
        if (quoteRes.data) {
            let quotes = quoteRes.data.quotes;
            let stockLastQuotes = {};
            quotes.map((quote) => {
                if (stocksQuotes[quote.T] == undefined) {
                    stockLastQuotes[quote.T] = {
                        sym: quote.T,
                        bp: quote.p,
                        ap: quote.P,
                    };
                }
            });
            dispatch(updateStocksQuotes(stockLastQuotes));
        }
    }, [stocksResponse, quoteRes]);

    useEffect(() => {
        if (ws.current) {
            ws.current.close();
        }
        connectStocksQuote();
    }, [activeStock, openDeals]);

    const connectStocksQuote = () => {
        ws.current = new WebSocket("wss://socket.polygon.io/stocks");

        let tickers = [];
        tickers.push(`Q.${activeStock}`);
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
            let stocksQuotesList = {};
            allStocks.forEach((item) => {
                if (item.sym != undefined) {
                    stocksQuotesList[item.sym] = {
                        sym: item.sym,
                        bp: item.bp,
                        ap: item.ap,
                    };
                }
            });
            dispatch(updateStocksQuotes(stocksQuotesList));
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

export default Stocks;
