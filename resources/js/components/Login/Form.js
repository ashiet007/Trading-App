import React, { useState } from "react";
import { login } from "../actions";
import { Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
    const dispatch = useDispatch();
    const userAuth = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
            return false;
        }
        const user = {
            email: email,
            password: password,
        };
        dispatch(login(user));
    };
    const noClick = (e) => {
        e.preventDefault();
    };
    return (
        <div className="auth-content my-auto">
            <div className="text-center">
                <h5 className="mb-0">Welcome Back !</h5>
                <p className="text-muted mt-2">Sign in to continue to CFD.</p>
            </div>
            <form className="mt-4 pt-2" onSubmit={handleSubmit}>
                {userAuth.message ? (
                    <Alert variant="danger">{userAuth.message}</Alert>
                ) : null}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                            <label className="form-label">Password</label>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="">
                                <a href="#" className="text-muted">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="input-group auth-pass-inputgroup">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            aria-label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            aria-describedby="password-addon"
                        />
                        <button
                            className="btn btn-light shadow-none ms-0"
                            type="submit"
                            id="password-addon"
                        >
                            <i className="mdi mdi-eye-outline"></i>
                        </button>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember-check"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="remember-check"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    {userAuth.loading ? (
                        <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                            disabled
                        >
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            &nbsp;Log In
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </form>

            <div className="mt-4 pt-2 text-center">
                <div className="signin-other-title">
                    <h5 className="font-size-14 mb-3 text-muted fw-medium">
                        - Sign in with -
                    </h5>
                </div>

                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <a
                            href="#"
                            onClick={noClick}
                            className="social-list-item bg-primary text-white border-primary"
                        >
                            <i className="mdi mdi-facebook"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a
                            href="#"
                            onClick={noClick}
                            className="social-list-item bg-info text-white border-info"
                        >
                            <i className="mdi mdi-twitter"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a
                            href="#"
                            onClick={noClick}
                            className="social-list-item bg-danger text-white border-danger"
                        >
                            <i className="mdi mdi-google"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="mt-5 text-center">
                <p className="text-muted mb-0">
                    Don't have an account ?
                    <Link to={"/register"} className="text-primary fw-semibold">
                        Signup now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Form;
