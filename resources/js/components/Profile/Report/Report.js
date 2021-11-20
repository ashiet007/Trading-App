import React, { useState, useReducer, useEffect } from "react";
import Layout from "../../Layouts/Layout";
import Sidebar from "../Sidebar";
import axios from "axios";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const initState = {
    reports: [],
    errors: null,
    message: "",
    loading: false,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "REPORT_REQUEST":
            return { ...state, loading: true };
        case "REPORT_SUCCESS":
            return {
                ...state,
                reports: action.payload.reports,
                errors: null,
                message: "",
            };
        case "REPORT_ERROR":
            return {
                ...state,
                errors: action.payload.errors,
                message: action.payload.message,
            };
        default:
            return state;
    }
};

const Report = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const [reportDownloadLoading, setReportDownloadLoading] = useState(false);
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    useEffect(() => {
        dispatch({ type: "REPORT_REQUEST" });
        axios
            .get("/api/backdated-reports", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                dispatch({
                    type: "REPORT_SUCCESS",
                    payload: {
                        reports: res.data.reports,
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: "REPORT_ERROR",
                    payload: {
                        errors: err.response.errors,
                        message: err.response.message,
                    },
                });
            });
    }, []);

    const downloadReport = (e) => {
        e.preventDefault();
        // console.log(dateRange);
        setReportDownloadLoading(true);
        axios
            .get("/api/download-report", {
                params: {
                    start_date: dateRange[0],
                    end_date: dateRange[1],
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setReportDownloadLoading(false);
                window.open(res.data.file_url, "_blank");
            })
            .catch((err) => {
                setReportDownloadLoading(false);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
    };

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
                                    Download Trading Report
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Sidebar activeTab="report" />
                    <div className="col-xl-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <DateRangePicker
                                    onChange={setDateRange}
                                    value={dateRange}
                                />
                                &nbsp;&nbsp;
                                {reportDownloadLoading ? (
                                    <a
                                        className="btn btn-success"
                                        href="#"
                                        disabled
                                    >
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Download
                                    </a>
                                ) : (
                                    <a
                                        className="btn btn-success"
                                        href="#"
                                        onClick={(e) => downloadReport(e)}
                                    >
                                        Download
                                    </a>
                                )}
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Market Name</th>
                                                <th>Profit/Loss</th>
                                                <th>Transaction Type</th>
                                                <th>Open Level</th>
                                                <th>Close Level</th>
                                                <th>Size</th>
                                                <th>Currency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.reports.map((report) => {
                                                return (
                                                    <tr
                                                        key={report.id}
                                                        className="table-success"
                                                    >
                                                        <td>
                                                            <Moment format="DD/MM/YYYY">
                                                                {
                                                                    report.created_at
                                                                }
                                                            </Moment>
                                                        </td>
                                                        <td>
                                                            {report.base_asset}/
                                                            {report.quote_asset}
                                                        </td>
                                                        <td>
                                                            &#163;
                                                            {
                                                                report.profit_n_loss
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                report.transaction_type
                                                            }
                                                        </td>
                                                        <td>
                                                            {report.open_level}
                                                        </td>
                                                        <td>
                                                            {report.close_level}
                                                        </td>
                                                        <td>{report.size}</td>
                                                        <td>&#163;</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Report;
