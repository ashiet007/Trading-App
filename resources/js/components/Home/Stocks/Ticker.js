import React, { useState } from "react";
import TickerData from "./TickerData";
import { useDispatch, useSelector } from "react-redux";
import {
    useGetStocksBySearchMutation,
    useGetStocksByLastIdMutation,
} from "../../../utils/store/services/stocks";
import Loader from "react-loader-spinner";

//css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
    updateSearchedStocks,
    updateStocks,
} from "../../../utils/store/slice/stocksSlice";
import { useAlert } from "react-alert";
import { Spinner } from "react-bootstrap";

const Ticker = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [loading, setLoading] = useState(false);
    const { stocks, lastId } = useSelector((state) => state.stocks);
    const [search, setSearch] = useState("");
    const [getStocksBySearch, { isLoading }] = useGetStocksBySearchMutation();
    const [getStocksByLastId, result] = useGetStocksByLastIdMutation();

    const handleLoadStocks = async () => {
        const { data, error } = await getStocksByLastId(lastId);
        if (data) {
            const stocksData = data.stocks;
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
                    lastId: data.last_id,
                })
            );
        }
        if (error) {
            alert.show(error.data.message, { type: "error" });
        }
    };

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        const { data, error, isLoading } = await getStocksBySearch(
            e.target.value
        );
        setLoading(isLoading);
        if (data) {
            const stocksData = data.stocks;
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
                updateSearchedStocks({
                    stocks: polygonStocks,
                    lastId: data.last_id,
                })
            );
        }
        if (error) {
            alert.show(error.data.message, { type: "error" });
        }
    };

    const RenderTickersListComponent = () => {
        if (loading) {
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
            if (Object.keys(stocks).length != 0) {
                return Object.keys(stocks).map((key) => {
                    const stockData = stocks[key];
                    return (
                        <TickerData
                            key={stockData.ticker}
                            name={stockData.name}
                            ticker={stockData.ticker}
                            logo={stockData.logo}
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
                                    <RenderTickersListComponent />
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
                                                    Load More...&nbsp;
                                                    {result.isLoading ? (
                                                        <Spinner
                                                            animation="border"
                                                            variant="success"
                                                            size="sm"
                                                        />
                                                    ) : null}
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
