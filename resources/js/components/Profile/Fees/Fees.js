import React from "react";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";
const Fees = () => {
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
                                <h4 className="mb-sm-0 font-size-18">Fees</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="fees" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="ccol-xl-12">
                                        <div className="form-check p-0">
                                            <div
                                                className="form-check form-switch form-switch-md p-0"
                                                dir="ltr"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input pull-right"
                                                    id="customSwitchsizemd"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="formRadiosRight1"
                                                >
                                                    <h5 className="m-0">
                                                        Pay trading fees with
                                                        USDT
                                                    </h5>
                                                    <p className="font-size-12 m-0">
                                                        Enable this option to
                                                        pay trading fees with:
                                                    </p>
                                                    <ul>
                                                        <li>
                                                            USDT you buy from
                                                            the exchange
                                                        </li>
                                                        <li>
                                                            Unlocked USDT
                                                            balance reserved for
                                                            trading fees
                                                        </li>
                                                    </ul>
                                                    <p className="font-size-14 m-0">
                                                        <strong>Note:</strong>{" "}
                                                        You'll get 50% discount
                                                        if you pay fees via USDT
                                                    </p>
                                                </label>
                                            </div>
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

export default Fees;
