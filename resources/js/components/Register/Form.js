import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useRegisterMutation } from "../../utils/store/services/user";
import { useAlert } from "react-alert";

const Form = () => {
    const alert = useAlert();
    const [userRegister, { isLoading }] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    let history = useHistory();

    const onSubmit = async (formData) => {
        const { data, error } = await userRegister(formData);
        if (data) {
            alert.show(
                "Registration successful. Redirecting to Login page...",
                { type: "success" }
            );
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }
        if (error) {
            alert.show(error.data.message, { type: "error" });
        }
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
                                    src={"/images/logo_levitas_small.png"}
                                    alt=""
                                    height="48"
                                />
                            </Link>
                        </div>
                        <div className="auth-content my-auto">
                            <div className="text-center">
                                <h5 className="mb-0">Register Account</h5>
                                <p className="text-muted mt-2">
                                    Get your free Levitas-globalmarkets account
                                    now.
                                </p>
                            </div>
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
                                        By registering you agree to the
                                        Levitas-globalmarkets
                                        <a href="#" className="text-primary">
                                            Terms of Use
                                        </a>
                                    </p>
                                </div>
                                <div className="mb-3">
                                    {isLoading ? (
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
                                ©{new Date().getFullYear()}{" "}
                                Levitas-globalmarkets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
