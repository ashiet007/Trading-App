import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { Provider, useDispatch } from "react-redux";
import { store } from "./../utils/store/store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { updateUser } from "../utils/store/slice/userSlice";

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch(updateUser(user));
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
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <App />
                </Router>
            </AlertProvider>
        </Provider>,
        document.getElementById("layout-wrapper")
    );
}
