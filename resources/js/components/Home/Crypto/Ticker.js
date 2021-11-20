import React, { useState } from "react";
import TickerData from "./TickerData";
import { useDispatch, useSelector } from "react-redux";

const Ticker = (props) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const marketPairs = useSelector((state) => state.market_pairs);
    const handleTabClick = (e) => {
        let market = e.currentTarget
            ? e.currentTarget.getAttribute("data-tab")
            : e;
        dispatch({
            type: "SET_ACTIVE_MARKET",
            data: {
                filtered_pairs: Object.keys(marketPairs).filter((item) =>
                    item.endsWith(market)
                ),
                market: market,
            },
        });
        const activeCurrency = `BTC${market}`;
        props.handleUpdateCurrency(activeCurrency);
    };
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
                                        props.market == "GBP"
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
                                        props.market == "USDT"
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
                                        {props.tickers
                                            ? props.tickers.map((ticker) => {
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
                                                              handleUpdateCurrency={
                                                                  props.handleUpdateCurrency
                                                              }
                                                              market={
                                                                  props.market
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
