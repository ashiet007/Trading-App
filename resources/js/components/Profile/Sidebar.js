import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeTab }) => {
    return (
        <div className="col-xl-3 col-lg-4">
            <div className="card">
                <div className="card-body profile-left">
                    <ul>
                        <li>
                            <Link
                                to={"/customer/profile"}
                                className={
                                    activeTab == "profile" ? "active" : ""
                                }
                            >
                                <i className="fas fa-user"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to={"/customer/currencyprefernce"} className={
                                    activeTab == "currencyprefernce" ? "active" : ""
                                }>
                                <i className="fas fa-comments-dollar"></i>
                                Currency Preference
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/customer/kyc"}
                                
                                className=""
                            >
                                <i className="fas fa-comments-dollar"></i>
                                Verify KYC
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/customer/notificationprefernce"}
                                className={
                                    activeTab == "notificationprefernce" ? "active" : ""
                                }
                            >
                                <i className="fas fa-bell"></i> Notification
                                Preferences
                            </Link>
                        </li>
                        <li>
                            <Link to={"/customer/fees"} className={
                                    activeTab == "fees" ? "active" : ""
                                }>
                                <i className="fas fa-percent"></i> Fees
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/customer/twofactorauth"}
                                className={
                                    activeTab == "twofactorauth" ? "active" : ""
                                }
                            >
                                <i className="fas fa-user"></i> Two Factor
                                Authentication
                            </Link>
                        </li>
                        <li>
                            <Link to={"/customer/activitylogs"} className={
                                    activeTab == "activitylogs" ? "active" : ""
                                }>
                                <i className="fas fa-user"></i> Activity Logs
                            </Link>
                        </li>
                        <li>
                            <Link to={"/customer/report"} className={
                                    activeTab == "report" ? "active" : ""
                                }>
                                <i className="fas fa-file-download"></i>
                                Download Trading Report
                            </Link>
                        </li>
                        <li>
                            <Link to={"/customer/privacycontrol"} className={
                                    activeTab == "privacycontrol" ? "active" : ""
                                }>
                                <i className="fas fa-user-lock"></i> Privacy
                                Control
                            </Link>
                        </li>
                        <li>
                            <Link to={"/customer/couponreward"} className={
                                    activeTab == "couponreward" ? "active" : ""
                                }>
                                <i className="fas fa-gift"></i> Coupon rewards
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
