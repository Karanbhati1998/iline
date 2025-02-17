import React, { useState } from "react";
import DisApproveModal from "./DisApproveModal";
import BackButton from "../../BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { rejectAndAcceptOfPendngForApproval } from "../../../features/slices/DriverManagement/pendingForApproval/pendingForApproval";
import { toastService } from "../../../utils/toastify";
import ZoomEffect from "../../ZoomEffect";
const initialState = {};
const VechileStatus = () => {
  const [showDisApproveModal, setShowDisApproveModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log({ state });

  const handleCloseDisApproveModal = () => {
    setShowDisApproveModal(false);
  };
  const handleApproveOrDisApprove = (val) => {
    const data = {
      id: state?._id,
      status: val,
    };
    dispatch(rejectAndAcceptOfPendngForApproval(data)).then((res) => {
      if (res?.payload?.code === 200) {
        setShowDisApproveModal(false);
        toastService.success("Status updated successfully");
        navigate("/driverManagement/pendingForApproval");
      } else {
        toastService.error(res?.payload?.message);
      }
    });
  };
  const handleViewImage = (image) => {
    setImage(image);
    setImageModal(true);
  };
  const handleCloseImageModal = () => {
    setImageModal(false);
    setImage("");
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="commenone">
            <div className="CommonTabs">
              <div className="TitleBox">
                <h4 className="Title">Pending For Approval </h4>
              </div>
            </div>
            <BackButton />
          </div>
          <div className="Small-Wrapper">
            <div className="RequestBox">
              <div className="RiderArea">
                <div className="RiderBox">
                  <div className="RiderHead">
                    <figure>
                      <img
                        src={
                          state?.profilePic ||
                          require("../../../assets/images/Avatar-1.png")
                        }
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "10px",
                        }}
                      />
                    </figure>
                    <figcaption>
                      <div>
                        <h3>
                          {state?.fullName}{" "}
                          {/* <span>
                            <i className="fa fa-star" aria-hidden="true" /> 4.5{" "}
                          </span> */}
                        </h3>
                        <h4>Driver ID : {state?.driver_number}</h4>
                      </div>
                    </figcaption>
                  </div>
                </div>
                <br />
              </div>
              <div className="CommonForm">
                <h4>1.Profile Information</h4>
                <div className="RiderArea">
                  <div className="RiderBox">
                    <div className="RiderBody">
                      <aside>
                        <p>
                          <label>Driver Name</label>{" "}
                          <span> {state?.fullName}</span>
                        </p>
                        <p>
                          <label>Driver ID</label>{" "}
                          <span>{state?.driver_number}</span>
                        </p>
                        <p>
                          <label>Driver Phone Number </label>{" "}
                          <span> {state?.phoneNumber}</span>
                        </p>
                        <p>
                          <label>Driver Email ID </label>{" "}
                          <span> {state?.email}</span>
                        </p>
                      </aside>
                      <aside>
                        {/* <p>
                          <label>Location</label> <span>-</span>
                        </p> */}
                        <p>
                          <label>Gender</label> <span>{state?.gender}</span>
                        </p>
                        <p>
                          <label>Registered On</label>{" "}
                          <span>
                            {moment(state?.createdAt).format("DD-MM-YYYY")}
                          </span>
                        </p>
                        <p>
                          <label>DOB</label>{" "}
                          <span>{moment(state?.dob).format("DD-MM-YYYY")}</span>
                        </p>
                      </aside>
                    </div>
                  </div>
                  <br />
                </div>
                <h4>2.Documents</h4>
                <div className="Small-Wrapper mt-4">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="InformationBox">
                        <h3>Adhaar Card</h3>
                        <div className="VehicleDocument">
                          <aside>
                            <p>
                              <strong>Adhaar Card Number</strong>
                              <span>
                                {state?.driverDocumentData?.[0]?.aadharNumber ||
                                  state?.aadharNumber}
                              </span>
                            </p>
                            {/* <p>
                              <strong>Expiry</strong>
                              <span>-</span>
                            </p> */}
                          </aside>
                          <ul>
                            <li>
                              <span>Document</span>
                              <figure
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleViewImage(
                                    state?.driverDocumentData?.[0]?.aadharFront
                                  )
                                }
                              >
                                <img
                                  src={
                                    state?.driverDocumentData?.[0]?.aadharFront
                                  }
                                  alt="no img"
                                />
                              </figure>
                              <figure
                                style={{
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleViewImage(
                                    state?.driverDocumentData?.[0]?.aadharBack
                                  )
                                }
                              >
                                <img
                                  src={
                                    state?.driverDocumentData?.[0]?.aadharBack
                                  }
                                  alt="no img"
                                />
                              </figure>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="InformationBox">
                        <h3>Drivers License</h3>
                        <div className="VehicleDocument">
                          <aside>
                            <p>
                              <strong>Drivers License Number</strong>
                              <span>{state?.dlNumber}</span>
                            </p>
                            <p>
                              <strong>Expiry</strong>
                              <span>
                                {moment(
                                  state?.vechicleData?.[0]?.rcExpiryDate
                                ).format("DD-MM-YYYY")}
                              </span>
                            </p>
                          </aside>
                          <ul>
                            <li>
                              <span>Document</span>
                              <figure
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleViewImage(
                                    state?.driverDocumentData?.[0]?.dlFront
                                  )
                                }
                              >
                                <img
                                  src={
                                    state?.driverDocumentData?.[0]?.dlFront ||
                                    "https://mobulous.co.in/just-clubbing/assets/images/driving.png"
                                  }
                                />
                              </figure>
                              <figure
                                style={{
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleViewImage(
                                    state?.driverDocumentData?.[0]?.dlBack
                                  )
                                }
                              >
                                <img
                                  src={
                                    state?.driverDocumentData?.[0]?.dlBack ||
                                    "https://mobulous.co.in/just-clubbing/assets/images/driving.png"
                                  }
                                />
                              </figure>
                            </li>
                            <li>
                              <strong className="Red">
                                <i className="fa fa-exclamation-triangle" />{" "}
                                {moment(
                                  state?.vechicleData?.[0]?.rcExpiryDate
                                ).isAfter(moment())
                                  ? `Expiring in ${moment(
                                      state?.vechicleData?.[0]?.rcExpiryDate
                                    ).fromNow()}`
                                  : `Expired ${moment(
                                      state?.vechicleData?.[0]?.rcExpiryDate
                                    ).fromNow()}`}
                              </strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Buttons">
                <button
                  className="Approve"
                  onClick={() => handleApproveOrDisApprove("APPROVED")}
                >
                  Approve
                </button>
                <button
                  className="Reject"
                  onClick={() => {
                    setShowDisApproveModal(true);
                    setId();
                  }}
                >
                  Disapprove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDisApproveModal && (
        <DisApproveModal
          handleCloseDisApproveModal={handleCloseDisApproveModal}
          id={state?._id}
        />
      )}
      {imageModal && (
        <ZoomEffect image={image} handleClose={handleCloseImageModal} />
      )}
    </>
  );
};

export default VechileStatus;
