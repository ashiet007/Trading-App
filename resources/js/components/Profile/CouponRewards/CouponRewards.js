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
const CouponRewards = () => {
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
                                    Coupon rewards
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="couponreward" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <h4>
                                            Claim your coupon reward on WazirX
                                        </h4>
                                        <p>
                                            Enter your coupon code and perform
                                            the required activities to claim
                                            your reward.
                                        </p>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-xl-9">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="default-input"
                                            placeholder="Enter Code"
                                        />
                                    </div>

                                    <div className="col-xl-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-md"
                                        >
                                            Apply
                                        </button>
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

export default CouponRewards;
