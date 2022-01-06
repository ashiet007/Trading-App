import React from "react";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";

const PrivacyControl = () => {
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
                                    Privacy Control
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="privacycontrol" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <h4>
                                            You control your data, and we
                                            respect that.
                                        </h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <p>For requests regarding:</p>
                                        <ul>
                                            <li>Copy of your data</li>
                                            <li>Data export</li>
                                            <li>Data correction</li>
                                        </ul>

                                        <p>
                                            Please reach out to us. Our team
                                            will be happy to help you out.
                                        </p>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-md"
                                            >
                                                Contact Us
                                            </button>
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

export default PrivacyControl;
