import React from "react";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";

const TwoFactorAuth = () => {
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
                                    Two Factor Authentication
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="twofactorauth" />
                    <div className="col-xl-9 col-lg-8">
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
                                                    Authenticator App
                                                </h5>
                                                <p className="font-size-12 m-0">
                                                    Highly secure
                                                </p>
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
                                                    Mobile SMS
                                                </h5>
                                                <p className="font-size-12 m-0">
                                                    Moderately secure
                                                </p>
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
                                                <h5 className="m-0">None</h5>
                                                <p className="font-size-12 m-0">
                                                    Not Secure
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
        </Layout>
    );
};

export default TwoFactorAuth;
