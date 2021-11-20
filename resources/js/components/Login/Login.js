import React, { useEffect } from "react";
import Background from "./Background";
import Form from "./Form";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context";

function Login() {
    const userAuth = useSelector((state) => state.auth);
    const [auth, handleAuth] = useAuth(useAuth);
    useEffect(() => {
        if (userAuth.authenticated) {
            handleAuth(true);
            return <Redirect to={"/"} />;
        }
    }, [userAuth.authenticated]);
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
                                                src={"images/logo-sm.svg"}
                                                alt=""
                                                height="28"
                                            />
                                            <span className="logo-txt">
                                                CFD
                                            </span>
                                        </Link>
                                    </div>
                                    <Form />
                                    <div className="mt-4 mt-md-5 text-center">
                                        <p className="mb-0">
                                            ©{new Date().getFullYear()} CFD.
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
