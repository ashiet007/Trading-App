import React, { useState } from "react";
import TickerData from "./TickerData";
import { useDispatch, useSelector } from "react-redux";
import { getForexes } from "../../actions";
import Loader from "react-loader-spinner";

//css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Ticker = (props) => {
    const dispatch = useDispatch();
    const allForex = useSelector((state) => state.allForexes.forexes);
    const isForexFetching = useSelector(
        (state) => state.allForexes.isForexFetching
    );
    const lastId = useSelector((state) => state.allForexes.lastId);
    const [search, setSearch] = useState("");

    const handleLoadForex = () => {
        dispatch(getForexes(nextUrl));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(getForexes(null, e.target.value));
    };

    const renderTickersListComponent = () => {
        if (isForexFetching) {
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
            if (allForex) {
                return Object.keys(allForex).map((key) => {
                    const forexData = allForex[key];
                    return (
                        <TickerData
                            key={key}
                            name={forexData.name}
                            ticker={key}
                            logo={forexData.logo}
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
                                                onClick={handleLoadForex}
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
