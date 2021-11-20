import axios from "axios";
import { cryptoConstants } from "./constant";

export const getCryptocurrencies = () => {
    return (dispatch) => {
        dispatch({ type: cryptoConstants.GET_CRYPTO_REQUEST });
        axios
            .get("/api/cryptocurrencies")
            .then((res) => {
                dispatch({
                    type: cryptoConstants.GET_CRYPTO_SUCCESS,
                    payload: {
                        cryptocurrencies: res.data.cryptocurrencies,
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: cryptoConstants.GET_CRYPTO_ERROR,
                });
            });
    };
};
