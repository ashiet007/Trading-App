import axios from "axios";
import { authConstant } from "./constant";

export const login = (formData) => {
    return (dispatch) => {
        dispatch({ type: authConstant.LOGIN_REQUEST });
        axios
            .post("/api/login", formData)
            .then((res) => {
                const { access_token, user } = res.data;
                localStorage.setItem("token", access_token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({
                    type: authConstant.LOGIN_SUCCESS,
                    payload: {
                        access_token,
                        user,
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: {
                        errors: err.response.data.errors,
                        message: err.response.data.message,
                    },
                });
            });
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstant.LOGOUT_REQUEST });
        const res = await axios.post(
            "/api/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstant.LOGOUT_SUCCESS,
            });
        } else {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: {
                    errors: res.data.errors,
                    message: res.data.message,
                },
            });
        }
    };
};
