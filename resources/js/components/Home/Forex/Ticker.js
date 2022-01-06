import React, { useState } from "react";
import TickerData from "./TickerData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

//css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAlert } from "react-alert";
import {
    useGetForexesByLastIdMutation,
    useGetForexesBySearchMutation,
} from "../../../utils/store/services/forex";
import {
    updateForexes,
    updateSearchedForex,
} from "../../../utils/store/slice/forexSlice";
import { Spinner } from "react-bootstrap";

const Ticker = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [loading, setLoading] = useState(false);
    const { forexes, lastId } = useSelector((state) => state.forex);
    const [search, setSearch] = useState("");
    const [getForexBySearch, { isLoading }] = useGetForexesBySearchMutation();
    const [getForexByLastId, result] = useGetForexesByLastIdMutation();

    const handleLoadForex = async () => {
        const { data, error } = await getForexByLastId(lastId);
        if (data) {
            const forexesData = data.forexes;
            let polygonForex = {};
            forexesData.forEach((item) => {
                const symbol = `${item.base_currency_symbol}/${item.currency_symbol}`;
                polygonForex[symbol] = {
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
                    forexes: polygonForex,
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
        const { data, error, isLoading } = await getForexBySearch(
            e.target.value
        );
        setLoading(isLoading);
        if (data) {
            const forexesData = data.forexes;
            let polygonForex = {};
            forexesData.forEach((item) => {
                const symbol = `${item.base_currency_symbol}/${item.currency_symbol}`;
                polygonForex[symbol] = {
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
                updateSearchedForex({
                    stocks: polygonForex,
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
            if (Object.keys(forexes).length != 0) {
                return Object.keys(forexes).map((key) => {
                    const forexData = forexes[key];
                    return (
                        <TickerData
                            key={key}
                            name={forexData.name}
                            ticker={key}
                            logo={forexData.logo}
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
                                                onClick={handleLoadForex}
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
