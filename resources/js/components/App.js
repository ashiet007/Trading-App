import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./context";
import { Provider, useDispatch } from "react-redux";
import { authConstant } from "./actions/constant";
import Store from "./Store";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const access_token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    access_token,
                    user,
                },
            });
        }
    });
    return (
        <>
            <Routes />
        </>
    );
}

export default App;

if (document.getElementById("layout-wrapper")) {
    ReactDOM.render(
        <Provider store={Store}>
            <AuthProvider>
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </Provider>,
        document.getElementById("layout-wrapper")
    );
}
