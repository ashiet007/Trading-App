import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { NavMobile } from "./NavMobile";

const Layout = (props) => {
    return (
        <>
            <Header />
            <NavMobile />
            <div className="main-content">
                <div className="page-content">{props.children}</div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
