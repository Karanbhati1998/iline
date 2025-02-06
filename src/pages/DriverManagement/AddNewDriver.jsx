import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import { useDispatch } from "react-redux";
import { toastService } from "../../utils/toastify";
import { imageUpload } from "../../features/slices/imageUpload";
import { addNewDriver } from "../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { useNavigate } from "react-router-dom";
import ReactPlaceAutocomplete from "../../components/ReactPlaceAutocomplete";
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
  imageLoader: false,
  location: {
    address: "",
    lat: "",
    long: "",
  },
};
const AddNewDriver = () => {
  const [iState, setUpdateState] = useState(initialState);
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
    imageLoader,
    location,
  } = iState;

  const uploadImage = (e) => {
    console.log({ errors });
    console.log(e.target.name);

    setUpdateState((prev) => ({
      ...prev,
      imageLoader: true,
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
            imageLoader: false,
          }));
        } else {
          toastService.error("image upload failed");
          setUpdateState((prev) => ({
            ...prev,
            [e.target.name]: "",
            imageLoader: false,
          }));
        }
      });
    } else {
      toastService.error("File not found");
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
    let isValid = false;
    if (!fullName.trim()) {
      formErrors.fullName = "Full Name is required";
      isValid = true;
    }
    if (!location.trim()) {
      formErrors.location = "Location is required";
      isValid = true;
    }
    if (!gender.trim()) {
      formErrors.gender = "Gender is required";
      isValid = true;
    }
    if (!phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone Number is required";
      isValid = true;
    }
    if (!aadharNumber.trim()) {
      formErrors.aadharNumber = "Aadhar Number is required";
      isValid = true;
    }
    if (!dlNumber.trim()) {
      formErrors.dlNumber = "Driving License Number is required";
      isValid = true;
    }
    if (!dob.trim()) {
      formErrors.dob = "Date of Birth is required";
      isValid = true;
    }
    if (!email.trim()) {
      formErrors.email = "Email is required";
      isValid = true;
    }
    if (!profilePic.trim()) {
      formErrors.profilePic = "Profile Pic is required";
      isValid = true;
    }
    if (!aadharFront.trim()) {
      formErrors.aadharFront = "Aadhar Front Image is required";
      isValid = true;
    }
    if (!aadharBack.trim()) {
      formErrors.aadharBack = "Aadhar Back Image is required";
      isValid = true;
    }
    if (!dlFront.trim()) {
      formErrors.dlFront = "Driving License Front Image is required";
      isValid = true;
    }
    if (!dlBack.trim()) {
      formErrors.dlBack = "Driving License Back Image is required";
      isValid = true;
    }
    if (!expiryDate.trim()) {
      formErrors.expiryDate = "Expiry Date is required";
      isValid = true;
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
      location,
    };
    if (!handleValidation()) {
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
                  {!profilePic ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="profilePic"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
                        />
                      </div>
                    </div>
                  ) : (
                    <figure
                      style={{
                        margin: "0",
                        width: "120px",
                        borderRadius: "0",
                        overflow: "hidden",
                        border: "2px solid #979797",
                      }}
                    >
                      <img src={profilePic} />
                    </figure>
                  )}
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
                          <label>Registration Certificate Number</label>
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
                          {!aadharFront ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="aadharFront"
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg"
                                />
                              </div>
                            </div>
                          ) : (
                            <figure>
                              <img src={aadharFront} />
                            </figure>
                          )}
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
                          {!aadharBack ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="aadharBack"
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg"
                                />
                              </div>
                            </div>
                          ) : (
                            <figure>
                              <img src={aadharBack} />
                            </figure>
                          )}
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
                          <label>Registration Certificate Number</label>
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
                          {!dlFront ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="dlFront"
                                  value={dlFront}
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg"
                                />
                              </div>
                            </div>
                          ) : (
                            <figure>
                              <img src={dlFront} />
                            </figure>
                          )}
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
                          {!dlBack ? (
                            <div className="UploadBox">
                              <div className="Upload">
                                <i className="fa fa-upload" />{" "}
                                <span>Upload Icon</span>
                                <input
                                  type="file"
                                  name="dlBack"
                                  value={dlBack}
                                  onChange={uploadImage}
                                  accept=".jpg,.png,.jpeg"
                                />
                              </div>
                            </div>
                          ) : (
                            <figure>
                              <img src={dlBack} />
                            </figure>
                          )}
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
