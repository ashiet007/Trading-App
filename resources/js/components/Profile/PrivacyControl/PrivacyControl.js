import React, { useEffect, useState, useReducer } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";

const initState = {
    user: null,
    errors: null,
    errorMessage: null,
    isLoading: true,
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "USER_REQUEST":
            return { ...state, isLoading: true };
        case "USER_SUCCESS":
            return { ...state, user: action.payload.user, isLoading: false };
        case "USER_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.error_message,
                errors: action.payload.errors,
            };
        default:
            throw new Error("Unkown action type");
    }
};
const PrivacyControl = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    let history = useHistory();

    useEffect(() => {
        dispatch({ type: "USER_REQUEST" });
        axios
            .get("/api/profile", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                dispatch({
                    type: "USER_SUCCESS",
                    payload: { user: response.data.user },
                });
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    localStorage.removeItem("isAuth", false);
                    setTimeout(() => {
                        history.push("/login");
                    }, 500);
                } else {
                    dispatch({
                        type: "USER_ERROR",
                        payload: {
                            error_message: err.response.data.message,
                            errors: err.response.data.errors,
                        },
                    });
                }
            });
    }, []);
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
