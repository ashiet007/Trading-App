import React, { useState, useContext } from "react";

const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
    const isAuth =
        localStorage.getItem("isAuth") && localStorage.getItem("isAuth") == true
            ? true
            : false;
    const [auth, setAuth] = useState(isAuth);
    const handleAuth = (value) => {
        setAuth(value);
    };
    const data = [auth, handleAuth];
    return (
        <AuthContext.Provider value={data}>{children} </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth can only be used inside AuthProvider");
    }
    return context;
};
