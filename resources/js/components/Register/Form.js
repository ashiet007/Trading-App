import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const initialState = {
    isLoading: false,
    success_message: "",
    error_message: "",
    errors: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return { ...state, isLoading: true };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                success_message: action.payload.success_message,
                isLoading: false,
            };
        case "REGISTER_ERROR":
            return {
                ...state,
                isLoading: false,
                error_message: action.payload.error_message,
                errors: action.payload.errors,
            };
        default:
            throw new Error("Unkown action type");
    }
};

const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [show, setShow] = useState(true);
    const [state, dispatch] = useReducer(reducer, initialState);
    let history = useHistory();

    const onSubmit = (data) => {
        dispatch({ type: "REGISTER_REQUEST" });
        axios
            .post("/api/register", data)
            .then((res) => {
                dispatch({
                    type: "REGISTER_SUCCESS",
                    payload: {
                        success_message:
                            "User registered successfully. Redirecting to Login...",
                    },
                });
                setTimeout(() => {
                    history.push("/login");
                }, 2000);
            })
            .catch((err) => {
                dispatch({
                    type: "REGISTER_ERROR",
                    payload: {
                        error_message: err.response.data.message,
                        errors: err.response.data.errors,
                    },
                });
                setShow(true);
            });
    };

    const renderErrors = () => {
        const errorItems = state.errors
            ? Object.keys(state.errors).map((key, i) => {
                  const error = state.errors[key][0];
                  return (
                      <li key={key}>
                          <span style={{ fontWeight: "bold" }}>{key}:</span>
                          <br />
                          {error}
                      </li>
                  );
              })
            : null;

        return <ul>{errorItems}</ul>;
    };

    const noClick = (e) => {
        e.preventDefault();
    };
    return (
        <div className="col-xxl-3 col-lg-4 col-md-5">
            <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                    <div className="d-flex flex-column h-100">
                        <div className="mb-4 mb-md-5 text-center">
                            <Link to={"/"} className="d-block auth-logo">
                                <img
                                    src={"/images/logo-sm.svg"}
                                    alt=""
                                    height="28"
                                />
                                <span className="logo-txt">CFD</span>
                            </Link>
                        </div>
                        <div className="auth-content my-auto">
                            <div className="text-center">
                                <h5 className="mb-0">Register Account</h5>
                                <p className="text-muted mt-2">
                                    Get your free CFD account now.
                                </p>
                            </div>
                            {state.error_message && show ? (
                                <Alert
                                    variant="danger"
                                    onClose={() => setShow(false)}
                                    dismissible
                                >
                                    {state.error_message}
                                    {renderErrors()}
                                </Alert>
                            ) : null}
                            {state.success_message ? (
                                <Alert variant="success">
                                    {state.success_message}
                                </Alert>
                            ) : null}
                            <form
                                className="needs-validation mt-4 pt-2"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="useremail"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className={
                                            errors.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Enter email"
                                        {...register("email", {
                                            required: true,
                                        })}
                                    />
                                    <div
                                        className={
                                            errors.email
                                                ? "invalid-feedback is-invalid"
                                                : "invalid-feedback"
                                        }
                                    >
                                        {errors.email?.type === "required" &&
                                            "Email is required"}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className={
                                            errors.name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Enter name"
                                        {...register("name", {
                                            required: true,
                                        })}
                                    />
                                    <div
                                        className={
                                            errors.name
                                                ? "invalid-feedback is-invalid"
                                                : "invalid-feedback"
                                        }
                                    >
                                        {errors.name?.type === "required" &&
                                            "Name is required"}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="userpassword"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className={
                                            errors.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    <div
                                        className={
                                            errors.password
                                                ? "invalid-feedback is-invalid"
                                                : "invalid-feedback"
                                        }
                                    >
                                        {errors.password?.type === "required" &&
                                            "Password is required"}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-0">
                                        By registering you agree to the CFD
                                        <a href="#" className="text-primary">
                                            Terms of Use
                                        </a>
                                    </p>
                                </div>
                                <div className="mb-3">
                                    {state.isLoading ? (
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
                                            &nbsp;Register
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary w-100 waves-effect waves-light"
                                            type="submit"
                                        >
                                            Register
                                        </button>
                                    )}
                                </div>
                            </form>

                            <div className="mt-4 pt-2 text-center">
                                <div className="signin-other-title">
                                    <h5 className="font-size-14 mb-3 text-muted fw-medium">
                                        - Sign up using -
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
                                    Already have an account ?
                                    <Link
                                        to={"/login"}
                                        className="text-primary fw-semibold"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 mt-md-5 text-center">
                            <p className="mb-0">
                                ©{new Date().getFullYear()} Demo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
