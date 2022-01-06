import React from "react";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";

const NotificationPrefernce = () => {
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
                                    Notification Preference
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="notificationprefernce" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="ccol-xl-12">
                                        <div className="form-check p-0">
                                            <div
                                                className="form-check form-switch form-switch-md mb-3"
                                                dir="ltr"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customSwitchsizemd"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="formRadiosRight1"
                                                >
                                                    <h5 className="m-0">
                                                        Price Alerts
                                                    </h5>
                                                </label>
                                            </div>
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
                                            <div
                                                className="form-check form-switch form-switch-md mb-3"
                                                dir="ltr"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customSwitchsizemd"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="formRadiosRight1"
                                                >
                                                    <h5 className="m-0">
                                                        Referral Commission
                                                        Alerts
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
            </div>
        </Layout>
    );
};

export default NotificationPrefernce;
