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
const VechileCategoryDetail = () => {
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
    categoryId,
  } = iState;
  const { state } = useLocation();
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      categoryName: state?.categoryName || "",
      categoryId: state?._id,
      tagLine: state?.tagLine || "",
      weightCapicity: state?.weightCapicity || "",
      uploadIcon: state?.uploadIcon || "",
      fareData: state?.fareData[0]?.fareData || [],
      length: state?.length,
      width: state?.width,
      height: state?.height,
      volume: state?.volume,
      unloadingTime: state?.unloadingTime,
      loadingTime: state?.loadingTime,
    }));
  }, [state]);
 
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
                    disabled
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
                  {/* <label>Rate/ Min</label>
                          <input type="text" class="form-control" placeholder=""> */}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <Link
                    to="/vehicleManagement/addFeatureList"
                    className="Button"
                    style={{ float: "right" }}
                    state={categoryId}
                  >
                    Add Features
                  </Link>
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
                    disabled
                  />
                  {errors.tagLine && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.tagLine}
                    </p>
                  )}
                </div>
              </div>
              {/* <br>
                  <div class="col-sm-4">
                      <div class="form-group">
                          <label>Enter  Load Capacity (in Kg)  </label>
                          <input type="text" class="form-control" placeholder="10">
                      </div>
                  </div> */}
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter Load Capacity (in Kg)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={10}
                    name="weightCapicity"
                    value={weightCapicity}
                    disabled
                  />
                  {errors.weightCapicity && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.weightCapicity}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-sm-4">
                {/* <div class="form-group">
                          <button class="Button" style="float: right;">Add Offers</button>
                      </div> */}
                <div className="form-group">
                  <Link
                    to="/vehicleManagement/addOffer"
                    className="Button"
                    style={{ float: "right" }}
                    state={categoryId}
                  >
                    Add Offers
                  </Link>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Length (in inches)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="length"
                    value={length}
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Width (in inches)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="width"
                    value={width}
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Height (in inches)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="height"
                    value={height}
                    disabled
                  />
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
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Loading Time (in minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="loadingTime"
                    value={loadingTime}
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Unloading Time (in minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={0}
                    name="unloadingTime"
                    value={unloadingTime}
                    disabled
                  />
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
          </div>
        </div>
      </div>
    </div>
  );
};


export default VechileCategoryDetail;
