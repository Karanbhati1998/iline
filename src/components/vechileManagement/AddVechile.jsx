import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVechileCategory } from "../../features/slices/vechileManagement/vechileCategory";
import { imageUpload } from "../../features/slices/imageUpload";
import { toastService } from "../../utils/toastify";
import LoaderForImage from "../LoaderForImage";
import {
  addVechile,
  getIlineOrP2pVechileList,
} from "../../features/slices/vechileManagement/vechileManagement";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

const initialState = {
  categoryId: "",
  rcNumber: "",
  rcFront: "",
  rcBack: "",
  rcExpiryDate: "",
  vehicleNumberPlate: "",
  vehicleColour: "",
  vehicleModel: "",
  vehicleManufacturer: "",
  vehicleFrontImage: "",
  vehicleBackImage: "",
  vehicleLeftImage: "",
  vehicleRightImage: "",
  vehicleInsideImage: "",
  vehicleOverallImage: "",
  insurenceFront: "",
  insurenceBack: "",
  insurenceExpiryDate: "",
  insurenceNumber: "",

  errors: {},
  // imageLoader: false,
  loading: false,
};
const AddVechile = () => {
  const [iState, setUpdateState] = useState(initialState);
  const [imageLoader, updateImageLoader] = useState({
    rcFront: false,
    rcBack: false,
    vehicleFrontImage: false,
    vehicleBackImage: false,
    vehicleLeftImage: false,
    vehicleRightImage: false,
    vehicleInsideImage: false,
    vehicleOverallImage: false,
    insurenceFront: false,
    insurenceBack: false,
  });
  const {
    categoryId,
    rcNumber,
    rcFront,
    rcBack,
    rcExpiryDate,
    vehicleNumberPlate,
    vehicleColour,
    vehicleModel,
    vehicleManufacturer,
    vehicleFrontImage,
    vehicleBackImage,
    vehicleLeftImage,
    vehicleRightImage,
    vehicleInsideImage,
    vehicleOverallImage,
    insurenceFront,
    insurenceBack,
    insurenceExpiryDate,
    insurenceNumber,
    errors,
    // imageLoader,
    loading,
  } = iState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ navigate });

  const { VechileCategories } = useSelector((state) => {
    return state?.vechileCategory;
  });
  console.log({ VechileCategories });
  useEffect(() => {
    dispatch(getVechileCategory({ limit: 1000000 }));
  }, []);

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

  const handleEditClick = (inputId) => {
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
      fileInput.click(); // Programmatically trigger the click event
    }
  };

  const uploadImage = (e) => {
    const { name } = e.target;
    updateImageLoader((prev) => ({ ...prev, [name]: true }));
    setUpdateState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: "",
      },
    }));
    const file = e.target?.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("fileName", file);
      dispatch(imageUpload(formData)).then((res) => {
        if (res?.payload?.code === 200) {
          toastService.success("Image uploaded successfully");
          setUpdateState((prev) => ({
            ...prev,
            [name]: res?.payload?.url,
          }));
          updateImageLoader((prev) => ({ ...prev, [name]: false }));
        } else {
          toastService.error("Image upload failed");
          setUpdateState((prev) => ({
            ...prev,
            [name]: "",
          }));
          updateImageLoader((prev) => ({ ...prev, [name]: false }));
        }
      });
    } else {
      toastService.error("File not found");
      updateImageLoader((prev) => ({ ...prev, imageLoader: false }));
    }
  };
  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;

    if (!categoryId.trim()) {
      formErrors.categoryId = "category is required";
      isValid = false;
    }

    if (!rcNumber.trim()) {
      formErrors.rcNumber = "Registration No. is required";
      isValid = false;
    }

    if (!rcFront.trim()) {
      formErrors.rcFront = "Registration Front is required";
      isValid = false;
    }
    // if (!rcBack.trim()) {
    //   formErrors.rcBack = "Registration Back is required";
    //   isValid = false;
    // }
    if (!rcExpiryDate.trim()) {
      formErrors.rcExpiryDate = "Registration Expiry Date is required";
      isValid = false;
    }
    if (!vehicleNumberPlate.trim()) {
      formErrors.vehicleNumberPlate = "Vehicle Number Plate is required";
      isValid = false;
    }
    if (!vehicleColour.trim()) {
      formErrors.vehicleColour = "vehicle colour is required";
      isValid = false;
    }
    if (!vehicleModel.trim()) {
      formErrors.vehicleModel = "vehicle model is required";
      isValid = false;
    }
    if (!vehicleManufacturer.trim()) {
      formErrors.vehicleManufacturer = "vehicle manufacturer is required";
      isValid = false;
    }
    if (!vehicleFrontImage.trim()) {
      formErrors.vehicleFrontImage = "vehicle front image  is required";
      isValid = false;
    }
    if (!vehicleBackImage.trim()) {
      formErrors.vehicleBackImage = "vehicle back image  is required";
      isValid = false;
    }
    // if (!vehicleLeftImage.trim()) {
    //   formErrors.vehicleLeftImage = "vehicle left image  is required";
    //   isValid = false;
    // }
    // if (!vehicleRightImage.trim()) {
    //   formErrors.vehicleRightImage = "vehicle right image  is required";
    //   isValid = false;
    // }
    // if (!vehicleInsideImage.trim()) {
    //   formErrors.vehicleInsideImage = "vehicle inside image  is required";
    //   isValid = false;
    // }
    // if (!vehicleOverallImage.trim()) {
    //   formErrors.vehicleOverallImage = "vehicle overall image  is required";
    //   isValid = false;
    // }
    // if (!insurenceBack.trim()) {
    //   formErrors.insurenceBack = "insurence back image  is required";
    //   isValid = false;
    // }
    if (!insurenceFront.trim()) {
      formErrors.insurenceFront = "insurence front image  is required";
      isValid = false;
    }
    if (!insurenceExpiryDate.trim()) {
      formErrors.insurenceExpiryDate = "insurence expiry date  is required";
      isValid = false;
    }
    if (!insurenceNumber.trim()) {
      formErrors.insurenceNumber = "insurence number  is required";
      isValid = false;
    }

    setUpdateState((prev) => ({
      ...prev,
      errors: formErrors,
    }));

    return isValid;
  };
  const handleSubmit = () => {
    if (handleValidation()) {
      const data = {
        categoryId,
        rcNumber,
        rcFront,
        // rcBack,
        rcExpiryDate,
        vehicleNumberPlate,
        vehicleColour,
        vehicleModel,
        vehicleManufacturer,
        vehicleFrontImage,
        vehicleBackImage,
        // vehicleLeftImage,
        // vehicleRightImage,
        // vehicleInsideImage,
        // vehicleOverallImage,
        insurenceFront,
        // insurenceBack,
        insurenceExpiryDate,
        // insurenceNumber,
      };
      setUpdateState((prev) => ({
        ...prev,
        loading: true,
      }));
      console.log("succes submit");

      dispatch(addVechile(data)).then((res) => {
        if (res?.payload?.code === 200) {
          toastService.success("Vechile added successfully");
          dispatch(getIlineOrP2pVechileList());
          navigate("/vehicleManagement");
          setUpdateState(initialState);
        } else {
          toastService.error("Vechile added failed");
          setUpdateState((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      });
    }
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        {/* <div class="TitleBox"> 
          <h4 class="Title">Add Vehicle Category</h4> 
          <div class="backarrow">
              <a href="vehicle-management.html">
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back
              </a>                    
          </div>
      </div> */}
        <div className="TitleBox">
          <h4 className="Title">Add New Vehicle</h4>
          <div className="TitleLink">
            <a className="TitleLink">
              <BackButton />
            </a>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            <h4>1.Vehicle Information</h4>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Vehicle Category</label>
                  <select
                    className="form-control"
                    name="categoryId"
                    value={categoryId}
                    onChange={handleChange}
                  >
                    <option>Select Role</option>
                    {VechileCategories?.result?.[0]?.paginationData?.map(
                      (res, i) => {
                        return (
                          <option key={i} value={res?._id}>
                            {res?.categoryName}
                          </option>
                        );
                      }
                    )}
                  </select>
                  {errors.categoryId && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.categoryId}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Vehicle Number Plate</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="vehicleNumberPlate"
                    value={vehicleNumberPlate}
                    onChange={handleChange}
                  />
                  {errors.vehicleNumberPlate && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleNumberPlate}
                    </p>
                  )}
                </div>
                {/* <div className="form-group">
                  <label>Vehicle Registration No.</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="rcNumber"
                    value={rcNumber}
                    onChange={handleChange}
                  />
                  {errors.rcNumber && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.rcNumber}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Vehicle Registration Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder=""
                    name="rcExpiryDate"
                    value={rcExpiryDate}
                    onChange={handleChange}
                  />
                  {errors.rcExpiryDate && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.rcExpiryDate}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Insurence Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="insurenceNumber"
                    value={insurenceNumber}
                    onChange={handleChange}
                  />
                  {errors.insurenceNumber && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.insurenceNumber}
                    </p>
                  )}
                </div> */}
                <div className="form-group">
                  <label>Upload Vehicle Front Image</label>
                  {imageLoader?.vehicleFrontImage ? (
                    <LoaderForImage />
                  ) : !vehicleFrontImage ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="vehicleFrontImage"
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
                        src={vehicleFrontImage}
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
                    name="vehicleFrontImage"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.vehicleFrontImage && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleFrontImage}
                    </p>
                  )}
                </div>
                {/* <div className="form-group">
                  <label>Upload Vehicle Left Image</label>
                  {imageLoader?.vehicleLeftImage ? (
                    <LoaderForImage />
                  ) : !vehicleLeftImage ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="vehicleLeftImage"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
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
                        src={vehicleLeftImage}
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
                    name="vehicleLeftImage"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.vehicleLeftImage && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleLeftImage}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Upload Vehicle Inside Image</label>
                  {imageLoader?.vehicleInsideImage ? (
                    <LoaderForImage />
                  ) : !vehicleInsideImage ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="vehicleInsideImage"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
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
                        src={vehicleInsideImage}
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
                    name="vehicleInsideImage"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.vehicleInsideImage && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleInsideImage}
                    </p>
                  )}
                </div> */}
              </div>
              <div className="col-sm-6">
                {/* <div className="form-group">
                  <label>Vehicle Insurance Expiry Date</label>
                  <input type="date" className="form-control" placeholder="" />
                </div> */}
                <div className="form-group">
                  <label>Vehicle Color</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="vehicleColour"
                    value={vehicleColour}
                    onChange={handleChange}
                  />
                  {errors.vehicleColour && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleColour}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Vehicle Model</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="vehicleModel"
                    value={vehicleModel}
                    onChange={handleChange}
                  />
                  {errors.vehicleModel && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleModel}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Vehicle Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="vehicleManufacturer"
                    value={vehicleManufacturer}
                    onChange={handleChange}
                  />
                  {errors.vehicleManufacturer && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleManufacturer}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Upload Vehicle Back Image</label>
                  {imageLoader?.vehicleBackImage ? (
                    <LoaderForImage />
                  ) : !vehicleBackImage ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="vehicleBackImage"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
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
                        src={vehicleBackImage}
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
                    name="vehicleBackImage"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.vehicleBackImage && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleBackImage}
                    </p>
                  )}
                </div>

                {/* <div className="form-group">
                  <label>Upload Vehicle Right Image</label>
                  {imageLoader?.vehicleRightImage ? (
                    <LoaderForImage />
                  ) : !vehicleRightImage ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="vehicleRightImage"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
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
                        src={vehicleRightImage}
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
                    name="vehicleRightImage"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.vehicleRightImage && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleRightImage}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Upload Vehicle Overall Image</label>
                  {imageLoader?.vehicleOverallImage ? (
                    <LoaderForImage />
                  ) : !vehicleOverallImage ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          type="file"
                          name="vehicleOverallImage"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
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
                        src={vehicleOverallImage}
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
                        onClick={() => handleEditClick("inputimage6")}
                      />
                    </figure>
                  )}
                  <input
                    id="inputimage6"
                    type="file"
                    name="vehicleOverallImage"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                    style={{ display: "none" }} // Hide input, but keep it accessible for click events
                  />
                  {errors.vehicleOverallImage && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.vehicleOverallImage}
                    </p>
                  )}
                </div> */}
              </div>
            </div>
            <h4>2.Documents</h4>
            <div className="Small-Wrapper mt-4">
              <div className="row">
                <div className="col-sm-6">
                  <div className="InformationBox">
                    <h3 className="mb-4">
                      Registration Card
                      {/* <button className="Button" style={{ float: "right" }}>
                        Upload
                      </button> */}
                    </h3>
                    <div className="VehicleDocument">
                      <div className="form-group">
                        <label>Vehicle Registration No.</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="rcNumber"
                          value={rcNumber}
                          onChange={handleChange}
                        />
                        {errors.rcNumber && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors.rcNumber}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Vehicle Registration  Date</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder=""
                          name="rcExpiryDate"
                          value={rcExpiryDate}
                          onChange={handleChange}
                        />
                        {errors.rcExpiryDate && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors.rcExpiryDate}
                          </p>
                        )}
                      </div>
                      <ul>
                        <li>
                          <div className="form-group">
                            <label>
                              Upload Vehicle Registration Front Image
                            </label>
                            {imageLoader?.rcFront ? (
                              <LoaderForImage />
                            ) : !rcFront ? (
                              <div className="UploadBox">
                                <div className="Upload">
                                  <i className="fa fa-upload" />{" "}
                                  <span>Upload Icon</span>
                                  <input
                                    type="file"
                                    name="rcFront"
                                    onChange={uploadImage}
                                    accept=".jpg,.png,.jpeg"
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
                                  src={rcFront}
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
                                  onClick={() => handleEditClick("inputimage7")}
                                />
                              </figure>
                            )}
                            <input
                              id="inputimage7"
                              type="file"
                              name="rcFront"
                              onChange={uploadImage}
                              accept=".jpg,.png,.jpeg"
                              style={{ display: "none" }} // Hide input, but keep it accessible for click events
                            />
                            {errors.rcFront && (
                              <p className="d-flex justify-content-start text-danger mt-2 error">
                                {errors.rcFront}
                              </p>
                            )}
                          </div>
                          {/* <div className="form-group">
                            <label>
                              Upload Vehicle Registration Back Image
                            </label>
                            {imageLoader?.rcBack ? (
                              <LoaderForImage />
                            ) : !rcBack ? (
                              <div className="UploadBox">
                                <div className="Upload">
                                  <i className="fa fa-upload" />{" "}
                                  <span>Upload Icon</span>
                                  <input
                                    type="file"
                                    name="rcBack"
                                    onChange={uploadImage}
                                    accept=".jpg,.png,.jpeg"
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
                                  src={rcBack}
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
                                  onClick={() => handleEditClick("inputimage8")}
                                />
                              </figure>
                            )}
                            <input
                              id="inputimage8"
                              type="file"
                              name="rcBack"
                              onChange={uploadImage}
                              accept=".jpg,.png,.jpeg"
                              style={{ display: "none" }}
                            />
                            {errors.rcBack && (
                              <p className="d-flex justify-content-start text-danger mt-2 error">
                                {errors.rcBack}
                              </p>
                            )}
                          </div> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="InformationBox">
                    <h3 className="mb-4">
                      Insurance Card{" "}
                      {/* <button className="Button" style={{ float: "right" }}>
                        Upload
                      </button> */}
                    </h3>
                    <div className="VehicleDocument">
                      <div className="form-group">
                        <label>Insurence Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="insurenceNumber"
                          value={insurenceNumber}
                          onChange={handleChange}
                        />
                        {errors.insurenceNumber && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors.insurenceNumber}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Vehicle Insurance Expiry Date</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder=""
                          name="insurenceExpiryDate"
                          value={insurenceExpiryDate}
                          onChange={handleChange}
                        />
                        {errors.insurenceExpiryDate && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors.insurenceExpiryDate}
                          </p>
                        )}
                      </div>
                      <ul>
                        <li>
                          <div className="form-group">
                            <label>Upload insurence Front Image</label>
                            {imageLoader?.insurenceFront ? (
                              <LoaderForImage />
                            ) : !insurenceFront ? (
                              <div className="UploadBox">
                                <div className="Upload">
                                  <i className="fa fa-upload" />{" "}
                                  <span>Upload Icon</span>
                                  <input
                                    type="file"
                                    name="insurenceFront"
                                    onChange={uploadImage}
                                    accept=".jpg,.png,.jpeg"
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
                                  src={insurenceFront}
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
                                  onClick={() => handleEditClick("inputimage9")}
                                />
                              </figure>
                            )}
                            <input
                              id="inputimage9"
                              type="file"
                              name="insurenceFront"
                              onChange={uploadImage}
                              accept=".jpg,.png,.jpeg"
                              style={{ display: "none" }}
                            />
                            {errors.insurenceFront && (
                              <p className="d-flex justify-content-start text-danger mt-2 error">
                                {errors.insurenceFront}
                              </p>
                            )}
                          </div>
                          {/* <div className="form-group">
                            <label>Upload insurence Back Image</label>
                            {imageLoader?.insurenceBack ? (
                              <LoaderForImage />
                            ) : !insurenceBack ? (
                              <div className="UploadBox">
                                <div className="Upload">
                                  <i className="fa fa-upload" />{" "}
                                  <span>Upload Icon</span>
                                  <input
                                    type="file"
                                    name="insurenceBack"
                                    onChange={uploadImage}
                                    accept=".jpg,.png,.jpeg"
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
                                  src={insurenceBack}
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
                                  onClick={() =>
                                    handleEditClick("inputimage10")
                                  }
                                />
                              </figure>
                            )}
                            <input
                              id="inputimage10"
                              type="file"
                              name="insurenceBack"
                              onChange={uploadImage}
                              accept=".jpg,.png,.jpeg"
                              style={{ display: "none" }}
                            />
                            {errors.insurenceBack && (
                              <p className="d-flex justify-content-start text-danger mt-2 error">
                                {errors.insurenceBack}
                              </p>
                            )}
                          </div> */}
                        </li>
                        {/* <li>
                                          <strong class="Red"><i class="fa fa-exclamation-triangle"></i> Expiring in 5 days</strong>
                                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="Button" onClick={handleSubmit}>
              Add Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVechile;
