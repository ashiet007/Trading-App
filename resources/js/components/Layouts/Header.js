import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../utils/store/services/user";
import { removeUser } from "../../utils/store/slice/userSlice";
import { useAlert } from "react-alert";

const Header = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [userLogout] = useLogoutMutation();
    const handleLogout = async (e) => {
        e.preventDefault();
        const result = await userLogout();
        if (result.data) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            dispatch(removeUser());
        }
        if (result.error) {
            alert.show(result.error.data.message, { type: "error" });
        }
    };
    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <Link to={"/"} className="logo logo-dark">
                            <span className="logo-sm">
                                <img
                                    src={"/images/logo_levitas_small.png"}
                                    alt=""
                                    height="44"
                                />
                            </span>
                            <span className="logo-lg">
                                <img
                                    src={"/images/logo_levitas_small.png"}
                                    alt=""
                                    height="44"
                                />
                            </span>
                        </Link>
                        <Link to={"/"} className="logo logo-light">
                            <span className="logo-sm">
                                <img
                                    src={"/images/logo_levitas_small.png"}
                                    alt=""
                                    height="44"
                                />
                            </span>
                            <span className="logo-lg">
                                <img
                                    src={"/images/logo_levitas_small.png"}
                                    alt=""
                                    height="44"
                                />
                            </span>
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                        data-bs-toggle="collapse"
                        data-bs-target="#topnav-menu-content"
                    >
                        <i className="fa fa-fw fa-bars"></i>
                    </button>
                    <nav className="navbar navbar-light navbar-expand-lg topnav-menu desktop">
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
                                        About Us
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to={"/"}
                                        id="topnav-dashboard"
                                        role="button"
                                    >
                                        Trading
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to={"/customer/profile"}
                                        id="topnav-dashboard"
                                        role="button"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link dropdown-toggle arrow-none"
                                        href="#"
                                        id="topnav-dashboard"
                                        role="button"
                                    >
                                        Charges and Fees
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="d-flex">
                    <div className="dropdown d-inline-block">
                        {isAuthenticated ? (
                            <>
                                <button
                                    type="button"
                                    className="btn header-item bg-soft-light border-start border-end"
                                    id="page-header-user-dropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        className="rounded-circle header-profile-user"
                                        src={"/images/users/avatar-1.jpg"}
                                        alt="Header Avatar"
                                    />
                                    <span className="d-none d-xl-inline-block ms-1 fw-medium">
                                        {user.name}
                                    </span>
                                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link
                                        className="dropdown-item"
                                        to={"/customer/profile"}
                                    >
                                        <i className="mdi mdi-face-profile font-size-16 align-middle me-1"></i>
                                        Profile
                                    </Link>
                                    <a className="dropdown-item" href="#">
                                        <i className="mdi mdi-lock font-size-16 align-middle me-1"></i>
                                        Lock screen
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={handleLogout}
                                    >
                                        <i className="mdi mdi-logout font-size-16 align-middle me-1"></i>
                                        Logout
                                    </a>
                                </div>
                            </>
                        ) : (
                            <Button variant="light">
                                <Link to={"/login"}>Login</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
