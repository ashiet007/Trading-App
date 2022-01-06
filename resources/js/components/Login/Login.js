import React from "react";
import Background from "./Background";
import Form from "./Form";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
    const isAutenticated = useSelector((state) => state.user.isAuthenticated);
    if (isAutenticated) {
        return <Redirect to={"/"} />;
    }
    return (
        <div className="auth-page">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xxl-3 col-lg-4 col-md-5">
                        <div className="auth-full-page-content d-flex p-sm-5 p-4">
                            <div className="w-100">
                                <div className="d-flex flex-column h-100">
                                    <div className="mb-4 mb-md-5 text-center">
                                        <Link
                                            to={"/"}
                                            className="d-block auth-logo"
                                        >
                                            <img
                                                src={
                                                    "images/logo_levitas_small.png"
                                                }
                                                alt=""
                                                height="48"
                                            />
                                        </Link>
                                    </div>
                                    <Form />
                                    <div className="mt-4 mt-md-5 text-center">
                                        <p className="mb-0">
                                            ©{new Date().getFullYear()}{" "}
                                            Levitas-globalmarkets.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Background />
                </div>
            </div>
        </div>
    );
}

export default Login;
