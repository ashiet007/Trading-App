import React, { useState, useEffect } from "react";
import Layout from "./../Layouts/Layout";
import Crypto from "./Crypto/Crypto";
import Stocks from "./Stocks/Stocks";
import { useDispatch } from "react-redux";
import Forex from "./Forex/Forex";
import { useGetAllDealsQuery } from "../../utils/store/services/deal";
import { useGetWalletQuery } from "../../utils/store/services/user";
import { useGetMarketStatusQuery } from "../../utils/store/services/global";
import { updateWallet } from "../../utils/store/slice/userSlice";
import { updateDeals } from "../../utils/store/slice/dealSlice";
import { updateMarketStatus } from "../../utils/store/slice/commonSlice";

const Home = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("crypto");
    const walletRes = useGetWalletQuery();
    const dealRes = useGetAllDealsQuery();
    const marketRes = useGetMarketStatusQuery();

    const handleTabClick = (e) => {
        let tab = e.currentTarget
            ? e.currentTarget.getAttribute("data-tab")
            : e;
        setActiveTab(tab);
    };

    const RenderActiveTabContent = () => {
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

    useEffect(() => {
        if (walletRes.data) {
            dispatch(updateWallet(walletRes.data.amount));
        }
        if (dealRes.data) {
            dispatch(updateDeals(dealRes.data.deals));
        }
        if (marketRes.data) {
            dispatch(updateMarketStatus(marketRes.data.status));
        }
    }, [walletRes, dealRes, marketRes]);

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
                        <RenderActiveTabContent />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
