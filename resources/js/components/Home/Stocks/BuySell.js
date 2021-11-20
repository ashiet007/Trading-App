import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { openDeal } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const BuySell = ({ ticker, marketStatus, lastQuote }) => {
    const allStocks = useSelector((state) => state.allStocks.stocks);
    const allStocksQuotes = useSelector((state) => state.all_stocks_quotes);
    const tickSize = 2;
    const tick = 0.01;
    let sellPrice = 0.0;
    let buyPrice = 0.0;
    if (allStocksQuotes[ticker]) {
        sellPrice = Number(allStocksQuotes[ticker].bp).toFixed(tickSize);
        buyPrice = Number(allStocksQuotes[ticker].ap).toFixed(tickSize);
    }
    const dispatch = useDispatch();
    const formLoading = useSelector((state) => state.deal.form_loading);
    const deals = useSelector((state) => state.deal.deals);
    const userAuth = useSelector((state) => state.auth);
    const walletAmount = useSelector((state) => state.wallet_amount);
    const [betType, setBetType] = useState("");
    const [size, setSize] = useState("");
    const [stop, setStop] = useState("");
    const [limit, setLimit] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        axios
            .get("/api/wallet", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                dispatch({
                    type: "UPDATE_WALLET",
                    data: res.data.amount,
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [deals]);

    const handleBetClick = (e) => {
        e.preventDefault();
        setBetType(e.currentTarget.getAttribute("data-tab"));
    };

    const renderStopHtml = () => {
        if (stop && size && betType) {
            let stopPoint = 0;
            if (betType == "buy") {
                stopPoint = Number(sellPrice) - parseFloat(stop) * tick;
            } else {
                stopPoint = Number(buyPrice) + parseFloat(stop) * tick;
            }
            const loss = stop * size;
            return (
                <span>
                    {stopPoint.toFixed(tickSize)}/
                    <span className="text-danger">-&#163;{loss}</span>
                </span>
            );
        } else {
            return null;
        }
    };

    const renderLimitHtml = () => {
        if (limit && size && betType) {
            let limitPoint = 0;
            if (betType == "buy") {
                limitPoint = Number(sellPrice) + parseFloat(limit) * tick;
            } else {
                limitPoint = Number(buyPrice) - parseFloat(limit) * tick;
            }
            const profit = limit * size;
            return (
                <span>
                    {limitPoint.toFixed(tickSize)}/
                    <span className="text-success">&#163;{profit}</span>
                </span>
            );
        } else {
            return null;
        }
    };

    useEffect(() => {
        renderStopHtml();
        renderLimitHtml();
    }, [betType, size, stop, limit]);

    const clearInput = () => {
        setBetType("");
        setSize("");
        setStop("");
        setLimit("");
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        let customErrors = [];
        if (!userAuth.authenticated) {
            customErrors.push("Please Login to place deal.");
            setValidationErrors(customErrors);
            return false;
        }
        if (betType == "") {
            customErrors.push("Please select Bet Type");
        }
        if (size == "") {
            customErrors.push("Please enter size.");
        } else {
            const balance = parseFloat(size) * 0.01;
            if (balance > walletAmount) {
                customErrors.push("You don't have enough balance in wallet.");
            }
        }
        setValidationErrors(customErrors);
        if (customErrors.length) {
            return false;
        }
        let opening = 0;
        if (betType == "sell") {
            opening = sellPrice;
        } else {
            opening = buyPrice;
        }
        let formData = {
            market: ticker,
            type: betType,
            size: size,
            opening: opening,
            stop: stop,
            limit: limit,
            tick_size: tick,
            currency: "USD",
            market_type: "Stocks",
        };
        dispatch(openDeal(formData));
        clearInput();
    };

    return (
        <div className="card">
            <div className="card-header align-items-center d-flex">
                <div className="flex-shrink-0">
                    <ul
                        className="nav justify-content-end nav-tabs-custom rounded card-header-tabs"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                data-bs-toggle="tab"
                                href="#deal-tab"
                                role="tab"
                            >
                                Deal
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-body">
                {validationErrors.length ? (
                    <Alert variant="danger">
                        <ul>
                            {validationErrors.map((error, key) => {
                                return <li key={key}>{error}</li>;
                            })}
                        </ul>
                    </Alert>
                ) : null}
                {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                ) : null}
                {marketStatus == "closed" ? (
                    <Alert variant="danger">Market is closed now.</Alert>
                ) : null}
                <div className="tab-content">
                    <div
                        className="tab-pane active"
                        id="deal-tab"
                        role="tabpanel"
                    >
                        <div className="float-end ms-2">
                            <h5 className="font-size-14">
                                <i className="bx bx-wallet text-primary font-size-16 align-middle me-1"></i>
                                <a
                                    href="#!"
                                    className="text-reset text-decoration-underline"
                                >
                                    &#163;{walletAmount}
                                </a>
                            </h5>
                        </div>
                        <h5 className="font-size-14 mb-4">Available Balance</h5>
                        <div>
                            <form onSubmit={handleOrderSubmit}>
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <a
                                            className={
                                                betType == "sell"
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }
                                            aria-current="page"
                                            href="#"
                                            data-tab="sell"
                                            onClick={handleBetClick}
                                        >
                                            Sell
                                            <br />
                                            <span>{sellPrice}</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={
                                                betType == "buy"
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }
                                            href="#"
                                            data-tab="buy"
                                            onClick={handleBetClick}
                                        >
                                            Buy
                                            <br />
                                            <span>{buyPrice}</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="form-group mb-3">
                                    <label>Size :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={`Size per point min: ${parseFloat(
                                            tick
                                        )}`}
                                        value={size}
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Stop Normal :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pts away"
                                        value={stop}
                                        onChange={(e) =>
                                            setStop(e.target.value)
                                        }
                                    />
                                    {renderStopHtml()}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Limit</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pts away"
                                        value={limit}
                                        onChange={(e) =>
                                            setLimit(e.target.value)
                                        }
                                    />
                                    {renderLimitHtml()}
                                </div>
                                <div className="text-center">
                                    {formLoading ? (
                                        <button
                                            className="btn btn-primary w-100 waves-effect waves-light"
                                            type="submit"
                                            disabled
                                        >
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            &nbsp;Place Deal
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-success w-md"
                                            disabled={
                                                marketStatus == "closed"
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Place Deal
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div
                        className="tab-pane"
                        id="sell-tab"
                        role="tabpanel"
                    ></div>
                    <div
                        className="tab-pane"
                        id="stoploss-tab"
                        role="tabpanel"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default BuySell;
