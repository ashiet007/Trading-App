import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import CurrencyPrefernce from "./Profile/CurrencyPrefernce/CurrencyPrefernce";
import NotificationPrefernce from "./Profile/NotificationPrefernce/NotificationPrefernce";
import Fees from "./Profile/Fees/Fees";
import TwoFactorAuth from "./Profile/TwoFactorAuth/TwoFactorAuth";
import ActivityLogs from "./Profile/ActivityLogs/ActivityLogs";
import PrivacyControl from "./Profile/PrivacyControl/PrivacyControl";
import CouponRewards from "./Profile/CouponRewards/CouponRewards";
import Report from "./Profile/Report/Report";
import Kyc from "./Kyc/Kyc";
import Register from "./Register/index";
import { useAuth } from "./context";
import { authConstant } from "./actions/constant";
import { useDispatch } from "react-redux";

function Routes() {
    const [auth, handleAuth] = useAuth(useAuth);
    const dispatch = useDispatch();

    useEffect(async () => {
        try {
            const res = await axios.post(
                "/api/check-authentication",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (res.status == 200) {
                handleAuth(true);
            } else {
                handleAuth(false);
            }
        } catch (error) {
            handleAuth(false);
            dispatch({ type: authConstant.LOGOUT_SUCCESS });
        }
    }, []);
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute path="/login" component={Login} auth={auth} />
            <AuthRoute path="/register" component={Register} auth={auth} />
            <PrivateRoute path="/dashboard" component={Dashboard} auth={auth} />
            <PrivateRoute
                path="/customer/profile"
                component={Profile}
                auth={auth}
            />
            <PrivateRoute
                path="/customer/currencyprefernce"
                component={CurrencyPrefernce}
                auth={auth}
            />
            <PrivateRoute
                path="/customer/notificationprefernce"
                component={NotificationPrefernce}
                auth={auth}
            />
            <PrivateRoute path="/customer/fees" component={Fees} auth={auth} />

            <PrivateRoute
                path="/customer/twofactorauth"
                component={TwoFactorAuth}
                auth={auth}
            />

            <PrivateRoute
                path="/customer/activitylogs"
                component={ActivityLogs}
                auth={auth}
            />
            <PrivateRoute
                path="/customer/privacycontrol"
                component={PrivacyControl}
                auth={auth}
            />
            <PrivateRoute
                path="/customer/couponreward"
                component={CouponRewards}
                auth={auth}
            />

            <PrivateRoute
                path="/customer/report"
                component={Report}
                auth={auth}
            />

            <PrivateRoute path="/customer/kyc" component={Kyc} auth={auth} />
        </Switch>
    );
}

export default Routes;
