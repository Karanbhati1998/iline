import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import { useDispatch } from "react-redux";
import { toastService } from "../../utils/toastify";
import { imageUpload } from "../../features/slices/imageUpload";
import { addNewDriver } from "../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { useNavigate } from "react-router-dom";
import ReactPlaceAutocomplete from "../../components/ReactPlaceAutocomplete";
import LoaderForImage from "../../components/LoaderForImage";
const initialState = {
  fullName: "",
  phoneNumber: "",
  aadharNumber: "",
  dlNumber: "",
  vehicleNumber: "",
  gender: "",
  dob: "",
  profilePic: "",
  aadharFront: "",
  aadharBack: "",
  dlFront: "",
  dlBack: "",
  expiryDate: "",
  email: "",
  errors: {},
  // imageLoader: false,
  location: {
    address: "",
    lat: "",
    long: "",
  },
};
const AddNewDriver = () => {
  const [iState, setUpdateState] = useState(initialState);
  const [imageLoader, updateImageLoader] = useState({
    profilePic: false,
    aadharFront: false,
    aadharBack: false,
    dlFront: false,
    dlBack: false,
  });
  const [input, setInput] = useState({
    address: "",
  });
  const { address } = input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    fullName,
    phoneNumber,
    aadharNumber,
    dlNumber,
    vehicleNumber,
    gender,
    dob,
    profilePic,
    aadharFront,
    aadharBack,
    dlFront,
    dlBack,
    expiryDate,
    email,
    errors,
    // imageLoader,
    location,
  } = iState;

  const handleEditClick = (inputId) => {
    console.log("Edit clicked:", inputId);

    const fileInput = document.getElementById(inputId);
    if (fileInput) {
      console.log("File input found, triggering click.");
      fileInput.click();
    } else {
      console.error("File input not found:", inputId);
    }
  };

  const uploadImage = (e) => {
    console.log({ errors });
    console.log(e.target.name);
    updateImageLoader((prev) => ({ ...prev, [e.target.name]: true }));
    setUpdateState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [e.target.name]: "",
      },
    }));
    const file = e.target?.files[0];
    if (file) {
      console.log({ file });
      const formData = new FormData();
      formData.append("fileName", file);
      dispatch(imageUpload(formData)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("image uploaded successfully");
          setUpdateState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [e.target.name]: "",
            },
            [e.target.name]: res?.payload?.url,
          }));
          updateImageLoader((prev) => ({ ...prev, [e.target.name]: false }));
        } else {
          toastService.error("image upload failed");
          setUpdateState((prev) => ({
            ...prev,
            [e.target.name]: "",
          }));
          updateImageLoader((prev) => ({ ...prev, [e.target.name]: false }));
        }
      });
    } else {
      toastService.error("File not found");
      updateImageLoader((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateState((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: "",
      },
    }));
  };
 const handleValidation = () => {
   let formErrors = {};
   let isValid = true;

   if (!fullName.trim()) {
     formErrors.fullName = "Full Name is required";
     isValid = false;
   }
   // Phone Number Validation (10-15 digits, no special characters)
   const phoneRegex = /^[0-9]{10,15}$/;
   if (!phoneNumber.trim()) {
     formErrors.phoneNumber = "Phone Number is required";
     isValid = false;
   } else if (!phoneRegex.test(phoneNumber)) {
     formErrors.phoneNumber =
       "Phone Number must be 10-15 digits without special characters";
     isValid = false;
   }

   // Email Validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!email.trim()) {
     formErrors.email = "Email is required";
     isValid = false;
   } else if (!emailRegex.test(email)) {
     formErrors.email = "Invalid email format";
     isValid = false;
   }

   // Date of Birth Validation (Age between 18 and 120)
   if (!dob.trim()) {
     formErrors.dob = "Date of Birth is required";
     isValid = false;
   } else {
     const birthYear = new Date(dob).getFullYear();
     const currentYear = new Date().getFullYear();
     const age = currentYear - birthYear;

     if (age < 18) {
       formErrors.dob = "Age must be 18 or older";
       isValid = false;
     } else if (age > 120) {
       formErrors.dob = "Invalid Date of Birth";
       isValid = false;
     }
   }

   // Aadhar Number Validation (Exactly 12 digits)
   const aadharRegex = /^[0-9]{12}$/;
   if (!aadharNumber.trim()) {
     formErrors.aadharNumber = "Aadhar Number is required";
     isValid = false;
   } else if (!aadharRegex.test(aadharNumber)) {
     formErrors.aadharNumber = "Aadhar Number must be exactly 12 digits";
     isValid = false;
   }

   // Insurance Number Validation (10-15 digits, like phone number)
  //  const insuranceRegex = /^[0-9]{10,15}$/;
  //  if (!insuranceNumber.trim()) {
  //    formErrors.insuranceNumber = "Insurance Number is required";
  //    isValid = false;
  //  } else if (!insuranceRegex.test(insuranceNumber)) {
  //    formErrors.insuranceNumber = "Insurance Number must be 10-15 digits";
  //    isValid = false;
  //  }

   // Location Validation
   if (!location.address.trim()) {
     formErrors.location = "Location is required";
     isValid = false;
   }

   // Gender Validation
   if (!gender.trim()) {
     formErrors.gender = "Gender is required";
     isValid = false;
   }

   // Driving License Validation
  const dlRegex = /^[A-Za-z0-9]{12,16}$/;
  if (!dlNumber.trim()) {
    formErrors.dlNumber = "Driving License Number is required";
    isValid = false;
  } else if (!dlRegex.test(dlNumber)) {
    formErrors.dlNumber =
      "Driving License must be 12-16 alphanumeric characters";
    isValid = false;
  }


   // Profile Picture Validation
   if (!profilePic.trim()) {
     formErrors.profilePic = "Profile Pic is required";
     isValid = false;
   }

   // Aadhar Front & Back Image Validation
   if (!aadharFront.trim()) {
     formErrors.aadharFront = "Aadhar Front Image is required";
     isValid = false;
   }
   if (!aadharBack.trim()) {
     formErrors.aadharBack = "Aadhar Back Image is required";
     isValid = false;
   }

   // Driving License Front & Back Image Validation
   if (!dlFront.trim()) {
     formErrors.dlFront = "Driving License Front Image is required";
     isValid = false;
   }
   if (!dlBack.trim()) {
     formErrors.dlBack = "Driving License Back Image is required";
     isValid = false;
   }

   // Expiry Date Validation
   if (!expiryDate.trim()) {
     formErrors.expiryDate = "Expiry Date is required";
     isValid = false;
   } else {
     const expiry = new Date(expiryDate);
     const today = new Date();
     if (expiry <= today) {
       formErrors.expiryDate = "Expiry Date must be in the future";
       isValid = false;
     }
   }if (!expiryDate.trim()) {
     formErrors.expiryDate = "Expiry Date is required";
     isValid = false;
   }

   setUpdateState((prev) => ({
     ...prev,
     errors: formErrors,
   }));

   console.log({ isValid });
   return isValid;
 };

  const handleAddDriver = () => {
    const data = {
      fullName,
      phoneNumber,
      aadharNumber,
      dlNumber,
      gender,
      dob,
      profilePic,
      aadharFront,
      aadharBack,
      dlFront,
      dlBack,
      expiryDate,
      email,
      // location,
      lat: location?.lat,
      long: location?.long,
    };
    if (handleValidation()) {
      console.log({ data });
      dispatch(addNewDriver(data)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Driver added successfully");
          setUpdateState(initialState);
          navigate("/driverManagement");
        } else {
          toastService.error(res?.payload?.message);
          console.log({ res });
        }
      });
    }
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Add New Driver </h4>
          <div className="commenone mb-2">
            <BackButton />
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            <h4>1.Profile Information</h4>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Driver Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="fullName"
                    value={fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Driver Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Driver Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder=""
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Upload Profile Image</label>
                  {imageLoader?.profilePic ? (
                    <LoaderForImage />
                  ) : !profilePic ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          id="inputimage1"
                          type="file"
                          name="profilePic"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg" // Hide the file input
                        />
                      </div>
                    </div>
                  ) : (
                    <figure
                      style={{
                        margin: "0",
                        width: "150px",
                        height: "150px",
                        borderRadius: "0",
                        overflow: "hidden",
                        border: "2px solid #979797",
                        position: "relative",
                      }}
                    >
                      <img
                        src={profilePic}
                        alt="Uploaded Icon"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <i
                        className="fa fa-edit"
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          color: "#fff",
                          background: "rgba(0, 0, 0, 0.6)",
                          borderRadius: "50%",
                          padding: "5px",
                          zIndex: 2, // Place icon above the image
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditClick("inputimage1")}
                      />
                    </figure>
                  )}
                  <input
                    id="inputimage1"
                    type="file"
                    name="profilePic"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.profilePic && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.profilePic}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Location</label>
                  <ReactPlaceAutocomplete
                    setUpdateState={setUpdateState}
                    address={location?.address}
                  />
                  {errors.location && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.location}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    className="form-control"
                    value={gender}
                    onChange={handleChange}
                  >
                    <option value="" hidden>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.gender}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>DOB </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder=""
                    name="dob"
                    value={dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <p className="d-flex justify-content-start text-danger mt-2 ">
                      {errors.dob}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <h4>2.Documents</h4>
            <div className="Small-Wrapper mt-4">
              <div className="row">
                <div className="col-sm-6">
                  <div className="InformationBox">
                    <h3>Adhaar Card</h3>
                    <div className="VehicleDocument">
                      <div className="CommonForm">
                        {/* <span>65465165165FSA54</span> */}
                        <div className="form-group">
                          <label>Adhaar Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="aadharNumber"
                            value={aadharNumber}
                            onChange={handleChange}
                          />
                          {errors.aadharNumber && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.aadharNumber}
                            </p>
                          )}
                        </div>
                        {/* <div className="form-group">
                          <label>Expiry</label>
                          <input type="date" name="" className="form-control" />
                          {errors.fullName && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.fullName}
                            </p>
                          )}
                        </div> */}
                      </div>
                      <ul>
                        <li>
                          <span>Adhaar Card front Side</span>
                          {imageLoader?.aadharFront ? (
                            <LoaderForImage />
                          ) : !aadharFront ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="aadharFront"
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg" // Hide the file input
                                />
                              </div>
                            </div>
                          ) : (
                            <figure
                              style={{
                                margin: "0",
                                width: "150px",
                                height: "150px",
                                borderRadius: "0",
                                overflow: "hidden",
                                border: "2px solid #979797",
                                position: "relative",
                              }}
                            >
                              <img
                                src={aadharFront}
                                alt="Uploaded Icon"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                              <i
                                className="fa fa-edit"
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  color: "#fff",
                                  background: "rgba(0, 0, 0, 0.6)",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  zIndex: 2, // Place icon above the image
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick("inputimage2")}
                              />
                            </figure>
                          )}
                          <input
                            id="inputimage2"
                            type="file"
                            name="aadharFront"
                            onChange={uploadImage}
                            accept=".jpg,.png,.jpeg"
                            style={{ display: "none" }} // Hide input, but keep it accessible for click events
                          />
                          {errors.aadharFront && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.aadharFront}
                            </p>
                          )}
                        </li>
                        {/* <li>
                          <strong className="Red">
                            <i className="fa fa-exclamation-triangle" />{" "}
                            Expiring in 5 days
                          </strong>
                        </li> */}
                      </ul>
                      <ul>
                        <li>
                          <span>Adhaar Card Back Side</span>
                          {imageLoader?.aadharBack ? (
                            <LoaderForImage />
                          ) : !aadharBack ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="aadharBack"
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg" // Hide the file input
                                />
                              </div>
                            </div>
                          ) : (
                            <figure
                              style={{
                                margin: "0",
                                width: "150px",
                                height: "150px",
                                borderRadius: "0",
                                overflow: "hidden",
                                border: "2px solid #979797",
                                position: "relative",
                              }}
                            >
                              <img
                                src={aadharBack}
                                alt="Uploaded Icon"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                              <i
                                className="fa fa-edit"
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  color: "#fff",
                                  background: "rgba(0, 0, 0, 0.6)",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  zIndex: 2, // Place icon above the image
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick("inputimage3")}
                              />
                            </figure>
                          )}
                          <input
                            id="inputimage3"
                            type="file"
                            name="aadharBack"
                            onChange={uploadImage}
                            accept=".jpg,.png,.jpeg"
                            style={{ display: "none" }} // Hide input, but keep it accessible for click events
                          />

                          {errors.aadharBack && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.aadharBack}
                            </p>
                          )}
                        </li>
                        {/* <li>
                          <strong className="Red">
                            <i className="fa fa-exclamation-triangle" />{" "}
                            Expiring in 5 days
                          </strong>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="InformationBox">
                    <h3>Drivers License</h3>
                    <div className="VehicleDocument">
                      <div className="CommonForm">
                        {/* <span>65465165165FSA54</span> */}
                        <div className="form-group">
                          <label>Drivers License Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="dlNumber"
                            value={dlNumber}
                            onChange={handleChange}
                          />
                          {errors.dlNumber && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.dlNumber}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Expiry</label>
                          <input
                            type="date"
                            name="expiryDate"
                            className="form-control"
                            value={expiryDate}
                            onChange={handleChange}
                          />
                          {errors.expiryDate && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>
                      </div>
                      <ul>
                        <li>
                          <span>Drivers License front Side</span>
                          {imageLoader?.dlFront ? (
                            <LoaderForImage />
                          ) : !dlFront ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="dlFront"
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg" // Hide the file input
                                />
                              </div>
                            </div>
                          ) : (
                            <figure
                              style={{
                                margin: "0",
                                width: "150px",
                                height: "150px",
                                borderRadius: "0",
                                overflow: "hidden",
                                border: "2px solid #979797",
                                position: "relative",
                              }}
                            >
                              <img
                                src={dlFront}
                                alt="Uploaded Icon"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                              <i
                                className="fa fa-edit"
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  color: "#fff",
                                  background: "rgba(0, 0, 0, 0.6)",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  zIndex: 2, // Place icon above the image
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick("inputimage4")}
                              />
                            </figure>
                          )}
                          <input
                            id="inputimage4"
                            type="file"
                            name="dlFront"
                            onChange={uploadImage}
                            accept=".jpg,.png,.jpeg"
                            style={{ display: "none" }} // Hide input, but keep it accessible for click events
                          />

                          {errors.dlFront && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.dlFront}
                            </p>
                          )}
                        </li>
                        {/* <li>
                          <strong className="Red">
                            <i className="fa fa-exclamation-triangle" />{" "}
                            Expiring in 5 days
                          </strong>
                        </li> */}
                      </ul>
                      <ul>
                        <li>
                          <span>Drivers License Back Side</span>
                          {imageLoader?.dlBack ? (
                            <LoaderForImage />
                          ) : !dlBack ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="dlBack"
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg" // Hide the file input
                                />
                              </div>
                            </div>
                          ) : (
                            <figure
                              style={{
                                margin: "0",
                                width: "150px",
                                height: "150px",
                                borderRadius: "0",
                                overflow: "hidden",
                                border: "2px solid #979797",
                                position: "relative",
                              }}
                            >
                              <img
                                src={dlBack}
                                alt="Uploaded Icon"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                              <i
                                className="fa fa-edit"
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  color: "#fff",
                                  background: "rgba(0, 0, 0, 0.6)",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  zIndex: 2, // Place icon above the image
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick("inputimage5")}
                              />
                            </figure>
                          )}
                          <input
                            id="inputimage5"
                            type="file"
                            name="dlBack"
                            onChange={uploadImage}
                            accept=".jpg,.png,.jpeg"
                            style={{ display: "none" }} // Hide input, but keep it accessible for click events
                          />

                          {errors.dlBack && (
                            <p className="d-flex justify-content-start text-danger mt-2 ">
                              {errors.dlBack}
                            </p>
                          )}
                        </li>
                        {/* <li>
                          <strong className="Red">
                            <i className="fa fa-exclamation-triangle" />{" "}
                            Expiring in 5 days
                          </strong>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="Button" onClick={handleAddDriver}>
              Add Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewDriver;
