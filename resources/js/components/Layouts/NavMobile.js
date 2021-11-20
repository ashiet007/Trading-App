import React from "react";

export const NavMobile = () => {
    return (
        <div className="topnav mobile">
            <div className="container-fluid">
                <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                    <div
                        className="collapse navbar-collapse"
                        id="topnav-menu-content"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link dropdown-toggle arrow-none"
                                    href="#"
                                    id="topnav-dashboard"
                                    role="button"
                                >
                                    Exchange
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link dropdown-toggle arrow-none"
                                    href="#"
                                    id="topnav-dashboard"
                                    role="button"
                                >
                                    P2P
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link dropdown-toggle arrow-none"
                                    href="#"
                                    id="topnav-dashboard"
                                    role="button"
                                >
                                    STF
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link dropdown-toggle arrow-none"
                                    href="#"
                                    id="topnav-dashboard"
                                    role="button"
                                >
                                    Funds
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};
