import React, { useState } from "react";
import TickerData from "./TickerData";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../../actions";
import Loader from "react-loader-spinner";

//css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Ticker = (props) => {
    const dispatch = useDispatch();
    const allStocks = useSelector((state) => state.allStocks.stocks);
    const isStocksFetching = useSelector(
        (state) => state.allStocks.isStocksFetching
    );
    const lastId = useSelector((state) => state.allStocks.lastId);
    const [search, setSearch] = useState("");

    const handleLoadStocks = () => {
        dispatch(getStocks(lastId));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(getStocks(null, e.target.value));
    };

    const renderTickersListComponent = () => {
        if (isStocksFetching) {
            return (
                <tr>
                    <td>
                        <Loader
                            type="ThreeDots"
                            color="#3067f0"
                            height={100}
                            width={100}
                            style={{ textAlign: "center" }}
                        />
                    </td>
                </tr>
            );
        } else {
            if (allStocks) {
                return Object.keys(allStocks).map((key) => {
                    const stockData = allStocks[key];
                    return (
                        <TickerData
                            key={stockData.ticker}
                            name={stockData.name}
                            ticker={stockData.ticker}
                            logo={stockData.logo}
                            handleUpdateTicker={props.handleUpdateTicker}
                        />
                    );
                });
            } else {
                return null;
            }
        }
    };

    return (
        <div className="col-xl-3">
            <div className="card">
                <div className="card-body px-0">
                    <div className="tab-content">
                        <div className="container">
                            <input
                                type="text"
                                className="form-control"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search by name..."
                            />
                        </div>
                        <div
                            className="table-responsive px-3"
                            style={{ maxHeight: "821px", minHeight: "635px" }}
                        >
                            <table className="table align-middle table-nowrap table-borderless">
                                <tbody>
                                    {renderTickersListComponent()}
                                    {lastId != null ? (
                                        <tr>
                                            <td
                                                colSpan="2"
                                                onClick={handleLoadStocks}
                                            >
                                                <span
                                                    style={{
                                                        color: "#2ab57d",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Load More...
                                                </span>
                                            </td>
                                        </tr>
                                    ) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticker;
