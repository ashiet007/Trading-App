import React from "react";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";

const CurrencyPrefernce = () => {
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">
                                Account Settings
                            </h4>
                            <div className="page-title-right">
                                <h4 className="mb-sm-0 font-size-18">
                                    Currency Preference
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="currencyprefernce" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="ccol-xl-12">
                                        <h4>
                                            Select your preferred display
                                            currency for all markets
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="ccol-xl-12">
                                        <div className="form-check p-0">
                                            <input
                                                className="form-check-input pull-right"
                                                type="radio"
                                                name="formRadiosRight"
                                                id="formRadiosRight1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="formRadiosRight1"
                                            >
                                                <h5 className="m-0">
                                                    <img
                                                        src={"/images/usdt.png"}
                                                        alt="usdt"
                                                        className="currency-icon"
                                                    />
                                                    Tether USD (USDT)
                                                </h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="ccol-xl-12">
                                        <div className="form-check p-0">
                                            <input
                                                className="form-check-input pull-right"
                                                type="radio"
                                                name="formRadiosRight"
                                                id="formRadiosRight1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="formRadiosRight1"
                                            >
                                                <h5 className="m-0">
                                                    <img
                                                        src={"/images/btc.png"}
                                                        alt="usdt"
                                                        className="currency-icon"
                                                    />
                                                    Bitcoin (BTC)
                                                </h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="ccol-xl-12">
                                        <div className="form-check p-0">
                                            <input
                                                className="form-check-input pull-right"
                                                type="radio"
                                                name="formRadiosRight"
                                                id="formRadiosRight1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="formRadiosRight1"
                                            >
                                                <h5 className="m-0">
                                                    <img
                                                        src={"/images/inr.png"}
                                                        alt="usdt"
                                                        className="currency-icon"
                                                    />
                                                    Rupee (INR)
                                                </h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CurrencyPrefernce;
