import React from "react";
import Form from "./Form";
import Background from "./../Register/Background";

const Register = () => {
    return (
        <div className="auth-page">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <Form />
                    <Background />
                </div>
            </div>
        </div>
    );
};

export default Register;
