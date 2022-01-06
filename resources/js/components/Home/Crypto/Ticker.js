import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateMarketPairs,
    updateActiveMarket,
} from "../../../utils/store/slice/tickerSlice";

import TickerData from "./TickerData";

const Ticker = (props) => {
    const [search, setSearch] = useState("");
    const { activeMarket, marketPairs } = useSelector((state) => state.ticker);
    const dispatch = useDispatch();
    const ws = useRef(null);

    let filteredPairs = marketPairs
        ? Object.keys(marketPairs).filter((item) => item.endsWith(activeMarket))
        : [];

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
            dispatch(updateMarketPairs(tickers));
        };
        //on connection close
        ws.current.onclose = (e) => {
            setTimeout(function () {
                connectTicker();
            }, 1000);
        };
    };
    const handleTabClick = (e) => {
        let market = e.currentTarget
            ? e.currentTarget.getAttribute("data-tab")
            : e;
        dispatch(updateActiveMarket(market));
    };

    useEffect(() => {
        connectTicker();
    }, []);

    return (
        <div className="col-xl-3">
            <div className="card">
                <div className="card-header align-items-center d-flex">
                    <div className="flex-shrink-0">
                        <ul
                            className="nav justify-content-end nav-tabs-custom rounded card-header-tabs"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className={
                                        activeMarket == "GBP"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    role="tab"
                                    data-tab="GBP"
                                    onClick={handleTabClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    GBP
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={
                                        activeMarket == "USDT"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    role="tab"
                                    data-tab="USDT"
                                    onClick={handleTabClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    USDT
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body px-0">
                    <div className="tab-content">
                        <div className="container">
                            <input
                                type="text"
                                className="form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                            />
                        </div>

                        <div className="tab-pane active" role="tabpanel">
                            <div
                                className="table-responsive px-3"
                                style={{
                                    maxHeight: "821px",
                                    minHeight: "635px",
                                }}
                            >
                                <table className="table align-middle table-nowrap table-borderless">
                                    <tbody>
                                        {filteredPairs
                                            ? filteredPairs.map((ticker) => {
                                                  const tickerData =
                                                      marketPairs[ticker];
                                                  if (
                                                      tickerData.s.includes(
                                                          search.toUpperCase()
                                                      )
                                                  ) {
                                                      return (
                                                          <TickerData
                                                              key={tickerData.s}
                                                              name={
                                                                  tickerData.s
                                                              }
                                                              change={
                                                                  tickerData.P
                                                              }
                                                              currentValue={
                                                                  tickerData.b
                                                              }
                                                              amount="Amount"
                                                              market={
                                                                  activeMarket
                                                              }
                                                          />
                                                      );
                                                  }
                                              })
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticker;
