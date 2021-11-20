import axios from "axios";

const Auth = {
    login: (data, successCb, failCb) => {
        axios
            .post("/api/login", data)
            .then((response) => {
                successCb(response);
            })
            .catch((err) => {
                failCb(err);
            });
    },
    checkAuth: () => {
        const isAuth = localStorage.getItem("isAuth");
        if (isAuth == "true") {
            return true;
        } else {
            return false;
        }
    },
    logout: (successCb, failCb) => {
        axios
            .post(
                "/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((response) => {
                successCb(response);
            })
            .catch((err) => {
                failCb(err);
            });
    },
};

export default Auth;
