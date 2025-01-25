import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../BackButton";
import { useDispatch } from "react-redux";
import { imageUpload } from "../../../features/slices/imageUpload";
import { toastService } from "../../../utils/toastify";
import {
  addVechileCategory,
  editVechileCategory,
} from "../../../features/slices/vechileManagement/vechileCategory";
import LoaderForImage from "../../LoaderForImage";
const initialState = {
  categoryName: "",
  categoryId: "",
  tagLine: "",
  uploadIcon: "",
  weightCapicity: "",
  length: 0,
  width: 0,
  height: 0,
  volume: 0,
  loadingTime: 0,
  unloadingTime: 0,
  fareData: [
    {
      serviceType: "LOCAL",
      baseCharge: "",
      ratePerKm: "",
      ratePerMin: "",
      waitingChargePerMin: "",
      cancellationCharge: "",
      commissionPercentage: "",
      freeLodingAndUnloadingTime: "",
      loadingUploadingChargePerMin: "",
      penaltyForIncorrectLoadReport: "",
      insuranceAmount: "",
    },
    {
      serviceType: "OUTSTATION",
      baseCharge: "",
      ratePerKm: "",
      ratePerMin: "",
      waitingChargePerMin: "",
      cancellationCharge: "",
      commissionPercentage: "",
      freeLodingAndUnloadingTime: "",
      loadingUploadingChargePerMin: "",
      penaltyForIncorrectLoadReport: "",
      insuranceAmount: "",
    },
    {
      serviceType: "EXPRESS",
      baseCharge: "",
      ratePerKm: "",
      ratePerMin: "",
      waitingChargePerMin: "",
      cancellationCharge: "",
      commissionPercentage: "",
      freeLodingAndUnloadingTime: "",
      loadingUploadingChargePerMin: "",
      penaltyForIncorrectLoadReport: "",
      insuranceAmount: "",
    },
  ],
};

const EditVechileCategory = () => {
  const [iState, setUpdateState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [imageLoader, setImageLoader] = useState(false);
  const {
    categoryName,
    fareData,
    weightCapicity,
    uploadIcon,
    tagLine,
    length,
    width,
    height,
    volume,
    unloadingTime,
    loadingTime,
  } = iState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log({ state });
  const fileInputRef = useRef(null);
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      categoryName: state?.categoryName || "",
      categoryId:state?._id,
      tagLine: state?.tagLine || "",
      weightCapicity: state?.weightCapicity || "",
      uploadIcon: state?.uploadIcon || "",
      fareData: state?.fareData[0]?.fareData || [],
    }));
  }, [state]);
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
  
    // Ensure all dimensions are valid numbers before calculating the volume
    if (
      width &&
      height &&
      length &&
      !isNaN(width) &&
      !isNaN(height) &&
      !isNaN(length)
    ) {
      const calculatedVolume =
        parseFloat(width) * parseFloat(height) * parseFloat(length);
      setUpdateState((prev) => ({
        ...prev,
        volume: calculatedVolume,
      }));
    } else {
      setUpdateState((prev) => ({
        ...prev,
        volume: "",
      }));
    }
  }, [width, height, length]);
  
  const uploadImage = (e) => {
    console.log({ errors });
    console.log(e.target.name);
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
    setImageLoader(true);
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
            [e.target.name]: res?.payload?.url,
          }));
          setImageLoader(false);
        } else {
          toastService.error("image upload failed");
          setUpdateState((prev) => ({
            ...prev,
            [e.target.name]: "",
          }));
          setImageLoader(false);
        }
      });
    } else {
      toastService.error("File not found");
    }
  };
  const handleChange = (e, i, type) => {
    const { name, value } = e.target;
    if (type == "fare") {
      setUpdateState((prev) => {
        const updateFareData = [...prev.fareData];
        updateFareData[i] = {
          ...updateFareData[i],
          [name]: value,
        };
        return {
          ...prev,
          fareData: updateFareData,
        };
      });
      setErrors((prev) => {
        const updatedFareErrors = [...(prev.fareData || [])];
        updatedFareErrors[i] = {
          ...updatedFareErrors[i],
          [name]: "", // Clear error for the specific field
        };
        return {
          ...prev,
          fareData: updatedFareErrors,
        };
      });
    } else {
      setUpdateState((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: "", // Clear error for the field
      }));
    }
  };
 const handleValidation = () => {
   let formErrors = {};
   let isValid = true;

   // Validate categoryName
   if (!categoryName?.toString().trim()) {
     formErrors.categoryName = "Category Name is required";
     isValid = false;
   }

   // Validate tagLine
   if (!tagLine?.toString().trim()) {
     formErrors.tagLine = "Tag Line is required";
     isValid = false;
   }

   // Validate weightCapicity
   if (!weightCapicity?.toString().trim()) {
     formErrors.weightCapicity = "Weight Capacity is required";
     isValid = false;
   }
  if (!length.trim()) {
    formErrors.length = "Length is required";
    isValid = false;
  }
  if (!width.trim()) {
    formErrors.width = "Width is required";
    isValid = false;
  }
  if (!height.trim()) {
    formErrors.height = "Height is required";
    isValid = false;
  }
  if (!loadingTime.trim()) {
    formErrors.loadingTime = "Height is required";
    isValid = false;
  }
  if (!unloadingTime.trim()) {
    formErrors.unloadingTime = "unloading Time is required";
    isValid = false;
  }
   // Validate uploadIcon
   if (!uploadIcon?.toString().trim()) {
     formErrors.uploadIcon = "Upload Icon is required";
     isValid = false;
   }

   // Validate fareData
   if (Array.isArray(fareData)) {
     formErrors.fareData = [];

     fareData.forEach((item, index) => {
       let itemErrors = {};

       // Validate fields, handling both numbers and strings
       if (item?.baseCharge === undefined || item?.baseCharge === "") {
         itemErrors.baseCharge = "Base Charge is required";
         isValid = false;
       }
       if (item?.ratePerKm === undefined || item?.ratePerKm === "") {
         itemErrors.ratePerKm = "Rate/km is required";
         isValid = false;
       }
       if (item?.ratePerMin === undefined || item?.ratePerMin === "") {
         itemErrors.ratePerMin = "Rate/Min is required";
         isValid = false;
       }
       if (
         item?.waitingChargePerMin === undefined ||
         item?.waitingChargePerMin === ""
       ) {
         itemErrors.waitingChargePerMin = "Waiting Charge/Min is required";
         isValid = false;
       }
       if (
         item?.cancellationCharge === undefined ||
         item?.cancellationCharge === ""
       ) {
         itemErrors.cancellationCharge = "Cancellation Charge is required";
         isValid = false;
       }
       if (
         item?.freeLodingAndUnloadingTime === undefined ||
         item?.freeLodingAndUnloadingTime === ""
       ) {
         itemErrors.freeLodingAndUnloadingTime =
           "Free Loading/Unloading Time is required";
         isValid = false;
       }
       if (
         item?.penaltyForIncorrectLoadReport === undefined ||
         item?.penaltyForIncorrectLoadReport === ""
       ) {
         itemErrors.penaltyForIncorrectLoadReport =
           "Penalty for Incorrect Load Report is required";
         isValid = false;
       }
       if (
         item?.insuranceAmount === undefined ||
         item?.insuranceAmount === ""
       ) {
         itemErrors.insuranceAmount = "Insurance Amount is required";
         isValid = false;
       }

       // Add errors for the current fareData item
       formErrors.fareData[index] = itemErrors;
     });
   }

   setErrors(formErrors);
   console.log({ isValid });
   return isValid;
 };


  console.log({ errors });

  const handleSubmit = () => {
    if (handleValidation()) {
      dispatch(editVechileCategory(iState)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Vehicle category added successfully");
          navigate("/vehicleManagement/vehicleCategory");
        } else {
          toastService.error("Failed to add vehicle category");
        }
      });
    }
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Add Vehicle Category</h4>
          <a className="TitleLink">
            <BackButton />
          </a>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Category Profile</h4>
          </div>
          <div className="CommonForm">
            {/* <h4>Category Profile</h4> */}
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter Vehicle Category Name </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Motor bike"
                    name="categoryName"
                    value={categoryName}
                    onChange={handleChange}
                  />
                  {errors.categoryName && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.categoryName}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter Tagline</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="For Smaller Goods"
                    name="tagLine"
                    value={tagLine}
                    onChange={handleChange}
                  />
                  {errors.tagLine && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.tagLine}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter Load Capacity (in Kg)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={10}
                    name="weightCapicity"
                    value={weightCapicity}
                    onChange={handleChange}
                  />
                  {errors.weightCapicity && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.weightCapicity}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Length (in meter)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="length"
                    value={length}
                    onChange={handleChange}
                  />
                  {errors.length && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.length}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Width (in meter)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="width"
                    value={width}
                    onChange={handleChange}
                  />
                  {errors.width && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.width}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Height (in meter)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="height"
                    value={height}
                    onChange={handleChange}
                  />
                  {errors.height && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.height}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Volume</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="volume"
                    value={volume}
                    onChange={handleChange}
                  />
                  {errors.volume && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.volume}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Loading Time (in minus)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="loadingTime"
                    value={loadingTime}
                    onChange={handleChange}
                  />
                  {errors.loadingTime && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.loadingTime}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Unloading Time (in minus)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="unloadingTime"
                    value={unloadingTime}
                    onChange={handleChange}
                  />
                  {errors.unloadingTime && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.unloadingTime}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Upload icon</label>
                  {imageLoader ? (
                    <LoaderForImage />
                  ) : !uploadIcon ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="uploadIcon"
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
                        position: "relative",
                      }}
                    >
                      <img src={uploadIcon} alt="Uploaded Icon" />
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
                        onClick={handleEditClick} // Trigger the file input click
                      />
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="uploadIcon"
                        onChange={uploadImage}
                        accept=".jpg,.png,.jpeg"
                        style={{ display: "none" }} // Hide the file input
                      />
                    </figure>
                  )}

                  {errors.uploadIcon && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.uploadIcon}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="TitleBox">
          <h4 className="Title">Fare Management</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            {fareData?.map((res, i) => {
              return (
                <>
                  <h4>
                    {i + 1}.{" "}
                    {res?.serviceType == "LOCAL"
                      ? "Local Service Fare Management"
                      : res?.serviceType == "OUTSTATION"
                      ? "Outstation Delivery Fare Management"
                      : "Express Delivery Fare Management"}
                  </h4>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Base Charge</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Base charge in INR"
                          name="baseCharge"
                          value={res?.baseCharge}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.baseCharge && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.baseCharge}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Rate/km </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Rate/km in INR"
                          name="ratePerKm"
                          value={res?.ratePerKm}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.ratePerKm && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.ratePerKm}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Rate/ Min</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Rate/min in INR"
                          name="ratePerMin"
                          value={res?.ratePerMin}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.ratePerMin && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.ratePerMin}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Waiting charges per min </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter INR per min"
                          name="waitingChargePerMin"
                          value={res?.waitingChargePerMin}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.waitingChargePerMin && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.waitingChargePerMin}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Cancellation Charges</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter cancellation charge in INR"
                          name="cancellationCharge"
                          value={res?.cancellationCharge}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.cancellationCharge && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.cancellationCharge}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Free Loading/Unloading Time </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter cancellation charge in min"
                          name="freeLodingAndUnloadingTime"
                          value={res?.freeLodingAndUnloadingTime}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.freeLodingAndUnloadingTime && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.freeLodingAndUnloadingTime}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Loading/Unloading Charges per min </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Loading/Unloading charges in INR"
                          name="loadingUploadingChargePerMin"
                          value={res?.loadingUploadingChargePerMin}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]
                          ?.loadingUploadingChargePerMin && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {
                              errors?.fareData?.[i]
                                ?.loadingUploadingChargePerMin
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Penalty for Incorrect Load Report</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter penality charges for incorrect load in INR"
                          name="penaltyForIncorrectLoadReport"
                          value={res?.penaltyForIncorrectLoadReport}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]
                          ?.penaltyForIncorrectLoadReport && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {
                              errors?.fareData?.[i]
                                ?.penaltyForIncorrectLoadReport
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Insurance Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter insurance amount for safe ride options in INR"
                          name="insuranceAmount"
                          value={res?.insuranceAmount}
                          onChange={(e) => handleChange(e, i, "fare")}
                        />
                        {errors?.fareData?.[i]?.insuranceAmount && (
                          <p className="d-flex justify-content-start text-danger mt-2 error">
                            {errors?.fareData?.[i]?.insuranceAmount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            <button className="Button" onClick={handleSubmit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVechileCategory;
