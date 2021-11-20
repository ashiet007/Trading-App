import React, { useEffect, useState } from "react";
import Layout from "./../Layouts/Layout";
import Crypto from "./Crypto/Crypto";
import Stocks from "./Stocks/Stocks";
import { allDeals } from "../actions";
import { useDispatch } from "react-redux";
import Forex from "./Forex/Forex";

const Home = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("crypto");

    useEffect(() => {
        dispatch(allDeals());
    }, []);

    const handleTabClick = (e) => {
        let tab = e.currentTarget
            ? e.currentTarget.getAttribute("data-tab")
            : e;
        setActiveTab(tab);
    };

    const renderActiveTabContent = () => {
        if (activeTab == "crypto") {
            return (
                <div
                    className="tab-pane active"
                    id="crypto-tab"
                    role="tabpanel"
                >
                    <Crypto />
                </div>
            );
        } else if (activeTab == "stocks") {
            return (
                <div
                    className="tab-pane active"
                    id="shares-tab"
                    role="tabpanel"
                >
                    <Stocks />
                </div>
            );
        } else {
            return (
                <div className="tab-pane active" id="forex-tab" role="tabpanel">
                    <Forex />
                </div>
            );
        }
    };

    return (
        <Layout>
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
                                        activeTab == "crypto"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    role="tab"
                                    data-tab="crypto"
                                    onClick={handleTabClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    Cryptocurrency
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={
                                        activeTab == "stocks"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    role="tab"
                                    data-tab="stocks"
                                    onClick={handleTabClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    Stocks
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={
                                        activeTab == "forex"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    role="tab"
                                    data-tab="forex"
                                    onClick={handleTabClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    Forex
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body px-0">
                    <div className="tab-content">
                        {renderActiveTabContent()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
