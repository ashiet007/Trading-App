import React, { useEffect } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAlert } from "react-alert";
import { useCloseDealMutation } from "../../../utils/store/services/deal";

const Order = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const deals = useSelector((state) => state.deal.deals);
    const { forexQuotes, tickerInfo } = useSelector((state) => state.forex);
    const [closeDeal, { isLoading }] = useCloseDealMutation();
    const tick = tickerInfo.tick;
    const tickSize = tickerInfo.tickSize;
    const closedDeals = deals.filter((dealData) => {
        if (dealData.closed_at && dealData.market_type == "Forex") {
            return dealData;
        }
    });
    const openDeals = deals.filter((dealData) => {
        if (!dealData.closed_at && dealData.market_type == "Forex") {
            return dealData;
        }
    });
    const updateProfitLoss = (type, opening, size, market) => {
        let profitLoss = 0.0;
        let ptsDiff = 0;
        if (forexQuotes[market]) {
            if (type == "sell") {
                ptsDiff =
                    (parseFloat(opening) - parseFloat(forexQuotes[market].ap)) /
                    tick;
                profitLoss = parseFloat(size) * ptsDiff;
            } else {
                ptsDiff =
                    (parseFloat(forexQuotes[market].bp) - parseFloat(opening)) /
                    tick;
                profitLoss = parseFloat(size) * ptsDiff;
            }
        }

        if (profitLoss > 0) {
            return (
                <td className="text-success">&#163;{profitLoss.toFixed(2)}</td>
            );
        } else {
            return (
                <td className="text-danger">&#163;{profitLoss.toFixed(2)}</td>
            );
        }
    };

    const latestTickerValue = (market, type) => {
        if (type == "sell") {
            return (
                <td>
                    {forexQuotes[market]
                        ? parseFloat(forexQuotes[market].ap).toFixed(4)
                        : ""}
                </td>
            );
        } else {
            return (
                <td>
                    {forexQuotes[market]
                        ? parseFloat(forexQuotes[market].bp).toFixed(4)
                        : ""}
                </td>
            );
        }
    };

    const handleCloseDeal = (id, market, type) => {
        const formData = {
            latest:
                type == "sell"
                    ? parseFloat(forexQuotes[market].ap)
                    : parseFloat(forexQuotes[market].bp),
            deal_id: id,
            tick: tick,
            tick_size: tickSize,
        };
        const { data, error } = closeDeal(formData);
        if (data) {
            dispatch(updateDeals(data.deals));
        }
        if (error) {
            alert.show(error.data.message, { type: "error" });
        }
    };

    return (
        <div className="card  mt-4">
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
                                href="#orders-tab"
                                role="tab"
                            >
                                Open Deals
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#completed-tab"
                                role="tab"
                            >
                                Closed Deals
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-body px-0">
                {isAuthenticated ? (
                    <div className="tab-content">
                        <div
                            className="tab-pane active"
                            id="orders-tab"
                            role="tabpanel"
                        >
                            <div
                                className="table-responsive px-3"
                                data-simplebar
                                style={{ minHeight: "328px" }}
                            >
                                <table className="table align-middle table-nowrap table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Market</th>
                                            <th>Size</th>
                                            <th>Opening</th>
                                            <th>Latest</th>
                                            <th>Stop</th>
                                            <th>Limit</th>
                                            <th>Profit/Loss</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {openDeals.length != 0 ? (
                                            openDeals.map((deal) => {
                                                return (
                                                    <tr key={deal.id}>
                                                        <td>{deal.market}</td>
                                                        <td>{deal.size}</td>
                                                        <td>{deal.opening}</td>
                                                        {latestTickerValue(
                                                            deal.market,
                                                            deal.type
                                                        )}
                                                        <td>{deal.stop}</td>
                                                        <td>{deal.limit}</td>
                                                        {updateProfitLoss(
                                                            deal.type,
                                                            deal.opening,
                                                            deal.size,
                                                            deal.market
                                                        )}
                                                        <td
                                                            onClick={() =>
                                                                handleCloseDeal(
                                                                    deal.id,
                                                                    deal.market,
                                                                    deal.type
                                                                )
                                                            }
                                                        >
                                                            {isLoading ? (
                                                                <button
                                                                    className="btn btn-success w-100 waves-effect waves-light"
                                                                    type="button"
                                                                    disabled
                                                                >
                                                                    <Spinner
                                                                        as="span"
                                                                        animation="border"
                                                                        size="sm"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                    />
                                                                    &nbsp;Close
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                >
                                                                    Close
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="8">
                                                    No record available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className="tab-pane"
                            id="completed-tab"
                            role="tabpanel"
                        >
                            <div
                                className="table-responsive px-3"
                                data-simplebar
                                style={{ minHeight: "328px" }}
                            >
                                <table className="table align-middle table-nowrap table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Market</th>
                                            <th>Profit/Loss</th>
                                            <th>Transaction Type</th>
                                            <th>Open Level</th>
                                            <th>Close Level</th>
                                            <th>Size</th>
                                            <th>Currency</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {closedDeals.map((deal) => {
                                            return (
                                                <tr key={deal.id}>
                                                    <td>
                                                        <Moment format="DD/MM/YYYY">
                                                            {deal.created_at}
                                                        </Moment>
                                                    </td>
                                                    <td>{deal.market}</td>
                                                    <td
                                                        className={
                                                            deal.profit_loss > 0
                                                                ? "text-success"
                                                                : "text-danger"
                                                        }
                                                    >
                                                        &#163;
                                                        {deal.profit_loss}
                                                    </td>
                                                    <td>Long</td>
                                                    <td>{deal.opening}</td>
                                                    <td>{deal.latest}</td>
                                                    <td>{deal.size}</td>
                                                    <td>&#163;</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: "15px" }} className="text-center">
                        <Link to={"/login"} className="btn btn-success">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
