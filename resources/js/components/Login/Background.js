import React from "react";

const Background = () => {
    return (
        <div className="col-xxl-9 col-lg-8 col-md-7">
            <div className="auth-bg pt-md-5 p-4 d-flex">
                <div className="bg-overlay bg-primary"></div>
                <ul className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-7">
                        <div className="p-0 p-sm-4 px-xl-0">
                            <div
                                id="reviewcarouselIndicators"
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-indicators carousel-indicators-rounded justify-content-start ms-0 mb-0">
                                    <button
                                        type="button"
                                        data-bs-target="#reviewcarouselIndicators"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#reviewcarouselIndicators"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#reviewcarouselIndicators"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="testi-contain text-white">
                                            <i className="bx bxs-quote-alt-left text-success display-6"></i>

                                            <h4 className="mt-4 fw-medium lh-base text-white">
                                                “The sucker has always tried to
                                                get something for nothing, and
                                                the appeal in all booms is
                                                always frankly to the gambling
                                                instinct aroused by cupidity and
                                                spurred by a pervasive
                                                prosperity. People who look for
                                                easy money invariably pay for
                                                the privilege of proving
                                                conclusively that it cannot be
                                                found on this sordid earth.”
                                            </h4>
                                            <div className="mt-4 pt-3 pb-5">
                                                <div className="d-flex align-items-start">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={
                                                                "images/jessie.jpeg"
                                                            }
                                                            className="avatar-md img-fluid rounded-circle"
                                                            alt="..."
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3 mb-4">
                                                        <h5 className="font-size-18 text-white">
                                                            Jessie Livermore
                                                        </h5>
                                                        <p className="mb-0 text-white-50">
                                                            The Wolf of Wall
                                                            Street
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Background;
