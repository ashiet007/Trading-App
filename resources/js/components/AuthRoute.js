import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../apis/Auth";

const AuthRoute = ({ auth: auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!auth) {
                    return <Component />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default AuthRoute;
