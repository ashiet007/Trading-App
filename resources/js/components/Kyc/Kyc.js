import React, { useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import Layout from "../Layouts/Layout";
import { Country, State } from "country-state-city";
import { useHistory } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const initState = {
    errors: null,
    errorMessage: null,
    isLoading: false,
};

const reducer = (appState = initState, action) => {
    switch (action.type) {
        case "SUBMIT_REQUEST":
            return { ...appState, isLoading: true };
        case "SUBMIT_SUCCESS":
            return { ...appState, isLoading: false };
        case "SUBMIT_ERROR":
            return {
                ...appState,
                isLoading: false,
                errorMessage: action.payload.error_message,
                errors: action.payload.errors,
            };
        case "VALIDATION_ERROR":
            return { ...appState, errorMessage: action.payload.error_message };
        default:
            throw new Error("Unkown action type");
    }
};

const Kyc = () => {
    const NATIONAL_ID_CARD = "National ID Card";
    const PASSPORT = "Psassport";
    const DRIVING_LICENSE = "Driving License";
    const [country, setCountry] = useState("");
    const [kycType, setKycType] = useState("personal");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [panNumberConfirm, setPanNumberConfirm] = useState("");
    const [panFile, setPanFile] = useState([]);
    const [documentType, setDocumentType] = useState(NATIONAL_ID_CARD);
    const [nationaIdNumber, setNationalIdNumber] = useState("");
    const [nationaIdNumberConfirm, setNationalIdNumberConfirm] = useState("");
    const [idFrontFile, setIdFrontFile] = useState([]);
    const [idBackFile, setIdBackFile] = useState([]);
    const [idSelfieFile, setIdSelfieFile] = useState([]);
    const [licnseNumber, setLicenseNumber] = useState("");
    const [licnseNumberConfirm, setLicenseNumberConfirm] = useState("");
    const [licenseFrontFile, setLicenseFrontFile] = useState([]);
    const [licenseBackFile, setLicenseBackFile] = useState([]);
    const [licenseSelfieFile, setLicenseSelfieFile] = useState([]);
    const [passport, setPassport] = useState("");
    const [passportConfirm, setPassportConfirm] = useState("");
    const [passportFrontFile, setPassportFrontFile] = useState([]);
    const [passportBackFile, setPassportBackFile] = useState([]);
    const [passportSelfieFile, setPassportSelfieFile] = useState([]);
    const [birthDate, setBirthDate] = useState(new Date());
    const [appState, dispatch] = useReducer(reducer, initState);

    let history = useHistory();
    let documentTypeForm;
    if (documentType == NATIONAL_ID_CARD) {
        documentTypeForm = (
            <>
                <div className="mb-3">
                    <label className="form-label">National ID Card *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your National ID Card Number"
                        value={nationaIdNumber}
                        onChange={(e) => setNationalIdNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Re-Enter National ID Card *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your National ID Card Number"
                        value={nationaIdNumberConfirm}
                        onChange={(e) =>
                            setNationalIdNumberConfirm(e.target.value)
                        }
                    />
                </div>
                <div className="doc mb-3">
                    <img src={"/images/sample_aadhaar_card_front.jpeg"} />
                    <FilePond
                        files={idFrontFile}
                        onupdatefiles={setIdFrontFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="idFrontFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div className="doc mb-3">
                    <FilePond
                        files={idBackFile}
                        onupdatefiles={setIdBackFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="idBackFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div className="doc mb-3">
                    <img src={"/images/document_selfie.jpg"} />
                    <FilePond
                        files={idSelfieFile}
                        onupdatefiles={setIdSelfieFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="idSelfieFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
            </>
        );
    } else if (documentType == DRIVING_LICENSE) {
        documentTypeForm = (
            <>
                <div className="mb-3">
                    <label className="form-label">
                        DRIVING LICENSE NUMBER *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Driving License Number"
                        value={licnseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        RE-ENTER DRIVING LICENSE NUMBER *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Re-Enter Your Driving License Number"
                        value={licnseNumberConfirm}
                        onChange={(e) =>
                            setLicenseNumberConfirm(e.target.value)
                        }
                    />
                </div>
                <div className="doc mb-3">
                    <img src={"/images/sample_aadhaar_card_front.jpeg"} />
                    <FilePond
                        files={licenseFrontFile}
                        onupdatefiles={setLicenseFrontFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="licnseFrontFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div className="doc mb-3">
                    <FilePond
                        files={licenseBackFile}
                        onupdatefiles={setLicenseBackFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="licenseBackFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div className="doc mb-3">
                    <img src={"/images/document_selfie.jpg"} />
                    <FilePond
                        files={licenseSelfieFile}
                        onupdatefiles={setLicenseSelfieFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="licenseSelfieFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
            </>
        );
    } else if (documentType == PASSPORT) {
        documentTypeForm = (
            <>
                <div className="mb-3">
                    <label className="form-label">PASSPORT NUMBER *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Passport Number"
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        RE-ENTER PASSPORT NUMBER *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Re-Enter Your Passport Number"
                        value={passportConfirm}
                        onChange={(e) => setPassportConfirm(e.target.value)}
                    />
                </div>
                <div className="doc mb-3">
                    <img src={"/images/sample_aadhaar_card_front.jpeg"} />
                    <FilePond
                        files={passportFrontFile}
                        onupdatefiles={setPassportFrontFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="passportFrontFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div className="doc mb-3">
                    <FilePond
                        files={passportBackFile}
                        onupdatefiles={setPassportBackFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="passportBackFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div className="doc mb-3">
                    <img src={"/images/document_selfie.jpg"} />
                    <FilePond
                        files={passportSelfieFile}
                        onupdatefiles={setPassportSelfieFile}
                        allowMultiple={false}
                        maxFiles={1}
                        name="passportSelfieFile"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
            </>
        );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {};
        let fileFrontData = "";
        let fileBackData = "";
        let fileSelfieData = "";
        let documentNumber = "";
        let documentNumberConfirm = "";
        if (
            documentType == NATIONAL_ID_CARD &&
            idFrontFile.length &&
            idBackFile.length &&
            idSelfieFile.length
        ) {
            fileFrontData = await getBase64(idFrontFile[0].file);
            fileBackData = await getBase64(idBackFile[0].file);
            fileSelfieData = await getBase64(idSelfieFile[0].file);
            documentNumber = nationaIdNumber;
            documentNumberConfirm = nationaIdNumberConfirm;
        } else if (
            documentType == PASSPORT &&
            passportFrontFile.length &&
            passportBackFile.length &&
            passportSelfieFile.length
        ) {
            fileFrontData = await getBase64(passportFrontFile[0].file);
            fileBackData = await getBase64(passportBackFile[0].file);
            fileSelfieData = await getBase64(passportSelfieFile[0].file);
            documentNumber = passport;
            documentNumberConfirm = passportConfirm;
        } else if (
            documentType == DRIVING_LICENSE &&
            licenseFrontFile.length &&
            licenseBackFile.length &&
            licenseSelfieFile.length
        ) {
            fileFrontData = await getBase64(licenseFrontFile[0].file);
            fileBackData = await getBase64(licenseBackFile[0].file);
            fileSelfieData = await getBase64(licenseSelfieFile[0].file);
            documentNumber = licnseNumber;
            documentNumberConfirm = licnseNumberConfirm;
        }
        const panFileData = panFile.length
            ? await getBase64(panFile[0].file)
            : "";
        const countryData = Country.getCountryByCode(country);
        formData = {
            country_name: countryData ? countryData.name : "",
            kyc_type: kycType,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            birth_date: birthDate,
            address,
            state,
            city,
            zip_code: zipCode,
            pan_number: panNumber,
            pan_number_confirmation: panNumberConfirm,
            pan_file: panFileData,
            document_type: documentType,
            document_number: documentNumber,
            document_number_confirmation: documentNumberConfirm,
            front_image: fileFrontData,
            back_image: fileBackData,
            selfie_image: fileSelfieData,
        };

        dispatch({ type: "SUBMIT_REQUEST" });
        axios
            .post("/api/kyc-verification", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch({ type: "SUBMIT_SUCCESS" });
                Swal.fire({
                    title: "Success!",
                    text: "Form submited successfully!",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                setTimeout(() => {
                    history.push("/profile");
                }, 500);
            })
            .catch((err) => {
                dispatch({
                    type: "SUBMIT_ERROR",
                    payload: {
                        error_message: err.response.data.message,
                        errors: err.response.data.errors,
                    },
                });
                Swal.fire({
                    title: "Error!",
                    position: "top-end",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
    };

    const getBase64 = (file) => {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        {appState.errorMessage ? (
                            <Alert variant="danger">
                                <Alert.Heading>
                                    {appState.errorMessage}
                                </Alert.Heading>
                            </Alert>
                        ) : null}
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header text-center">
                                    <h5 className="mb-0">
                                        SELECT YOUR COUNTRY
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="useremail"
                                            className="form-label"
                                        >
                                            Select your country *
                                        </label>
                                        <select
                                            className="form-control"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        >
                                            <option>Select country</option>
                                            {Country.getAllCountries().map(
                                                (country) => {
                                                    return (
                                                        <option
                                                            key={
                                                                country.isoCode
                                                            }
                                                            value={
                                                                country.isoCode
                                                            }
                                                        >
                                                            {country.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="useremail"
                                            className="form-label"
                                        >
                                            Type of KYC *
                                        </label>
                                        <select
                                            className="form-control"
                                            value={kycType}
                                            onChange={(e) =>
                                                setKycType(e.target.value)
                                            }
                                        >
                                            <option value="personal">
                                                Personal
                                            </option>
                                            <option value="company">
                                                Company
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header text-center">
                                    <h5 className="mb-0">Personal Info</h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            FIRST NAME *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter First Name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            MIDDLE NAME *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Middle Name"
                                            value={middleName}
                                            onChange={(e) =>
                                                setMiddleName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            LAST NAME *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Last Name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            DATE OF BIRTH (DD-MM-YYYY) *
                                        </label>
                                        <DatePicker
                                            className="form-control"
                                            selected={birthDate}
                                            onChange={(date) =>
                                                setBirthDate(date)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            State *
                                        </label>
                                        <select
                                            className="form-control"
                                            value={state}
                                            onChange={(e) =>
                                                setState(e.target.value)
                                            }
                                        >
                                            <option>Select state</option>
                                            {State.getStatesOfCountry(
                                                country
                                            ).map((state) => {
                                                return (
                                                    <option
                                                        key={state.isoCode}
                                                        value={state.name}
                                                    >
                                                        {state.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter City Name"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Pin / Zip Code *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Pin Code"
                                            value={zipCode}
                                            onChange={(e) =>
                                                setZipCode(e.target.value)
                                            }
                                        />
                                    </div>
                                    <h4>Pan Card</h4>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Pan Number *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Pan Number"
                                            value={panNumber}
                                            onChange={(e) =>
                                                setPanNumber(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Re-Enter Pan Number *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Re-Enter Your Pan Number"
                                            value={panNumberConfirm}
                                            onChange={(e) =>
                                                setPanNumberConfirm(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="doc mb-3">
                                        <img
                                            src={"/images/sample_pan_card.jpeg"}
                                        />
                                        <FilePond
                                            files={panFile}
                                            onupdatefiles={setPanFile}
                                            allowMultiple={false}
                                            name="panFile"
                                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                        />
                                    </div>
                                    <h4>Document Type</h4>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="docType"
                                            className="form-label"
                                        >
                                            Type of Document
                                        </label>
                                        <select
                                            name="docType"
                                            className="form-control"
                                            value={documentType}
                                            onChange={(e) =>
                                                setDocumentType(e.target.value)
                                            }
                                        >
                                            <option value={NATIONAL_ID_CARD}>
                                                National ID Card
                                            </option>
                                            <option value={PASSPORT}>
                                                Passport
                                            </option>
                                            <option value={DRIVING_LICENSE}>
                                                Driving License
                                            </option>
                                        </select>
                                    </div>
                                    {documentTypeForm}
                                    <div className="mb-3">
                                        {appState.isLoading ? (
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
                                                &nbsp; Submit
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary w-100 waves-effect waves-light"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Kyc;
