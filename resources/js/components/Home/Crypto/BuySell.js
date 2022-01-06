import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTickInfo } from "../../../utils/store/slice/tickerSlice";
import { useGetTickInfoQuery } from "../../../utils/store/services/crypto";
import { useOpenDealMutation } from "../../../utils/store/services/deal";
import { updateDeals } from "../../../utils/store/slice/dealSlice";
import { useAlert } from "react-alert";

const BuySell = (props) => {
    const alert = useAlert();
    const { activeMarket, activeTicker, marketPairs, tickerInfo } = useSelector(
        (state) => state.ticker
    );
    const [openDeal, { isLoading }] = useOpenDealMutation();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const tickSize = tickerInfo.tickSize;
    const tick = parseFloat(tickerInfo.tick);
    const sellPrice = marketPairs[activeTicker]
        ? Number(marketPairs[activeTicker].b).toFixed(tickSize)
        : 0.0;
    const buyPrice = marketPairs[activeTicker]
        ? Number(marketPairs[activeTicker].a).toFixed(tickSize)
        : 0.0;
    const dispatch = useDispatch();
    const walletAmount = useSelector((state) => state.user.wallet);
    const [betType, setBetType] = useState("");
    const [size, setSize] = useState("");
    const [stop, setStop] = useState("");
    const [limit, setLimit] = useState("");

    const { data } = useGetTickInfoQuery(activeTicker);

    useEffect(() => {
        if (data) {
            dispatch(updateTickInfo(data));
        }
    });
    const handleBetClick = (e) => {
        e.preventDefault();
        setBetType(e.currentTarget.getAttribute("data-tab"));
    };

    const RenderStopHtml = () => {
        if (stop && size && betType) {
            let stopPoint = 0;
            if (betType == "buy") {
                stopPoint = Number(buyPrice) - parseFloat(stop) * tick;
            } else {
                stopPoint = Number(sellPrice) + parseFloat(stop) * tick;
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

    const RenderLimitHtml = () => {
        if (limit && size && betType) {
            let limitPoint = 0;
            if (betType == "buy") {
                limitPoint = Number(buyPrice) + parseFloat(limit) * tick;
            } else {
                limitPoint = Number(sellPrice) - parseFloat(limit) * tick;
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

    const clearInput = () => {
        setBetType("");
        setSize("");
        setStop("");
        setLimit("");
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert.show("Please Login to place deal.", { type: "error" });
            return false;
        }
        if (betType == "") {
            alert.show("Please select Bet Type", { type: "error" });
            return false;
        }
        if (size == "") {
            alert.show("Please enter size.", { type: "error" });
            return false;
        } else {
            const balance = parseFloat(size) * 0.01;
            if (balance > walletAmount) {
                alert.show("You don't have enough balance in wallet.", {
                    type: "error",
                });
                return false;
            }
        }
        let opening = 0;
        if (betType == "sell") {
            opening = sellPrice;
        } else {
            opening = buyPrice;
        }
        let formData = {
            market: activeTicker,
            type: betType,
            size: size,
            opening: opening,
            stop: stop,
            limit: limit,
            tick_size: tick,
            currency: "GBP",
            market_type: "Cryptocurrency",
        };
        const { data, error } = await openDeal(formData);
        if (error) {
            alert.show(error.data, message, { type: "error" });
        }
        if (data) {
            dispatch(updateDeals(data.deals));
            clearInput();
        }
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
                                    <label>Size({activeMarket}) :</label>
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
                                    <RenderStopHtml />
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
                                    <RenderLimitHtml />
                                </div>
                                <div className="text-center">
                                    {isLoading ? (
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
