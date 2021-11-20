import React, { useEffect, useState, useReducer } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Sidebar from "./Sidebar";

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
const Profile = () => {
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
                                    Profile
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="profile" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm order-2 order-sm-1">
                                        <div className="d-flex align-items-start mt-3 mt-sm-0">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-xl me-3">
                                                    <img
                                                        src={
                                                            "/images/users/avatar-2.jpg"
                                                        }
                                                        alt=""
                                                        className="img-fluid rounded-circle d-block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div>
                                                    <h5 className="mb-2">
                                                        {state.user?.name}
                                                    </h5>
                                                    <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                                                        <div>
                                                            <i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>
                                                            +91 9999 xxxxxx
                                                        </div>
                                                        <div>
                                                            <i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>
                                                            {state.user?.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    className="nav nav-tabs-custom card-header-tabs border-top mt-4"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link px-3 active"
                                            data-bs-toggle="tab"
                                            href="#overview"
                                            role="tab"
                                        >
                                            Overview
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link px-3"
                                            data-bs-toggle="tab"
                                            href="#about"
                                            role="tab"
                                        >
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div
                                className="tab-pane active"
                                id="overview"
                                role="tabpanel"
                            >
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">
                                            About
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <div className="pb-3">
                                                <div className="row">
                                                    <div className="col-xl">
                                                        <div className="text-muted">
                                                            <p className="mb-2">
                                                                Hi I'm Phyllis
                                                                Gatlin, Lorem
                                                                Ipsum is simply
                                                                dummy text of
                                                                the printing and
                                                                typesetting
                                                                industry. Lorem
                                                                Ipsum has been
                                                                the industry's
                                                                standard dummy
                                                                text ever since
                                                                the 1500s, when
                                                                an unknown
                                                                printer took a
                                                                galley of type
                                                                and scrambled it
                                                                to make a type
                                                                specimen book.
                                                                It has survived
                                                                not only five
                                                                centuries, but
                                                                also the leap
                                                                into electronic
                                                                typesetting,
                                                                remaining
                                                                essentially
                                                                unchanged. It
                                                                was popularised
                                                                in the 1960s
                                                                with the release
                                                                of Letraset
                                                                sheets
                                                                containing Lorem
                                                                Ipsum passages
                                                            </p>
                                                            <p className="mb-0">
                                                                It is a long
                                                                established fact
                                                                that a reader
                                                                will be
                                                                distracted by
                                                                the readable
                                                                content of a
                                                                page when
                                                                looking at it
                                                                has a
                                                                more-or-less
                                                                normal
                                                                distribution of
                                                                letters
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane"
                                id="about"
                                role="tabpanel"
                            >
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">
                                            About
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <div className="pb-3">
                                                <div className="text-muted">
                                                    <p className="mb-2">
                                                        Hi I'm Phyllis Gatlin,
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry. Lorem Ipsum
                                                        has been the industry's
                                                        standard dummy text ever
                                                        since the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book. It
                                                        has survived not only
                                                        five centuries, but also
                                                        the leap into electronic
                                                        typesetting, remaining
                                                        essentially unchanged.
                                                        It was popularised in
                                                        the 1960s with the
                                                        release of Letraset
                                                        sheets containing Lorem
                                                        Ipsum passages
                                                    </p>
                                                    <p className="mb-2">
                                                        It is a long established
                                                        fact that a reader will
                                                        be distracted by the
                                                        readable content of a
                                                        page when looking at it
                                                        has a more-or-less
                                                        normal distribution of
                                                        letters
                                                    </p>
                                                    <p>
                                                        It will be as simple as
                                                        Occidental; in fact, it
                                                        will be Occidental. To
                                                        an English person, it
                                                        will seem like
                                                        simplified English, as a
                                                        skeptical Cambridge
                                                        friend of mine told me
                                                        what Occidental is. The
                                                        European languages are
                                                        members of the same
                                                        family. Their separate
                                                        existence is a myth.
                                                    </p>
                                                </div>
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

export default Profile;
