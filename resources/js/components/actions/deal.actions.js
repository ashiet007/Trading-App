import axios from "axios";
import { dealConstants } from "./constant";

export const openDeal = (formData) => {
    return (dispatch) => {
        dispatch({ type: dealConstants.OPEN_DEAL_REQUEST });
        axios
            .post("/api/open-deal", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                dispatch({
                    type: dealConstants.OPEN_DEAL_SUCCESS,
                    payload: {
                        deals: res.data.deals,
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: dealConstants.OPEN_DEAL_ERROR,
                    payload: {
                        errors: err.response.data.errors,
                        message: err.response.data.message,
                    },
                });
            });
    };
};

export const closeDeal = (formData) => {
    return (dispatch) => {
        dispatch({ type: dealConstants.CLOSE_DEAL_REQUEST });
        axios
            .post("/api/close-deal", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                dispatch({
                    type: dealConstants.CLOSE_DEAL_SUCCESS,
                    payload: {
                        deals: res.data.deals,
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: dealConstants.CLOSE_DEAL_ERROR,
                    payload: {
                        errors: err.response.data.errors,
                        message: err.response.data.message,
                    },
                });
            });
    };
};

export const allDeals = () => {
    return (dispatch) => {
        dispatch({ type: dealConstants.GET_ALL_DEAL_REQUEST });
        axios
            .get("/api/all-deals", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                dispatch({
                    type: dealConstants.GET_ALL_DEAL_SUCCESS,
                    payload: {
                        deals: res.data.deals,
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: dealConstants.OPEN_DEAL_ERROR,
                    payload: {
                        errors: err.response.data.errors,
                        message: err.response.data.message,
                    },
                });
            });
    };
};
