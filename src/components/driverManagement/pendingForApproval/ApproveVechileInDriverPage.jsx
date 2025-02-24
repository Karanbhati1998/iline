import React, { useEffect, useState } from "react";
import moment from "moment";
import { toastService } from "../../../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  actionToService,
  getPendingVehicleList,
  pendingVehicleStatus,
} from "../../../features/slices/vechileManagement/vechileManagement";
import DisApprovedModal from "../../vechileManagement/vechileTable/DisApprovedModal";
import ZoomEffect from "../../ZoomEffect";
import { getVechailData } from "../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import LgZoomEffect from "../../LgZoomEffect";
const initialState = {
  id: "",
  is_local_admin: false,
  is_outstation_admin: false,
  is_express_admin: false,
  is_local: false,
  is_outstation: false,
  is_express: false,
};
const ApproveVechileInDriverPage = ({
  handleClose,
  data,
  handleViewImageFunc,
  setapproveVechileStatus,
}) => {
  const [iState, setUpdateState] = useState(initialState);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");
  const [approvalState, setApprovalState] = useState({
    approveRcCheck: false,
    disApproveRcCheck: false,
    approveInsuranceCheck: false,
    disApproveInsuranceCheck: false,
  });
  const [disableBtn, setDisableBtn] = useState({
    isApproveButtonDisabled: false,
    isDisapproveButtonDisabled: false,
  });
  const {
    id,
    is_local_admin,
    is_outstation_admin,
    is_express_admin,
    is_local,
    is_outstation,
    is_express,
  } = iState;
  const { isApproveButtonDisabled, isDisapproveButtonDisabled } = disableBtn;
  const {
    approveInsuranceCheck,
    approveRcCheck,
    disApproveInsuranceCheck,
    disApproveRcCheck,
  } = approvalState;
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({
    rcError: "",
    insurenceError: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVechailData({ driverId: data }));
  }, []);
  const { vechileDetailsData } = useSelector((state) => {
    return state?.driverManagementAllDrivers;
  });
  console.log({ vechileDetailsData });

  const handleValidation = () => {
    let errorObj = {};
    let isValid = true;

    if (!approvalState.approveRcCheck && !approvalState.disApproveRcCheck) {
      isValid = false;
      errorObj.rcError = "Please select one of the RC check options.";
    }

    if (
      !approvalState.approveInsuranceCheck &&
      !approvalState.disApproveInsuranceCheck
    ) {
      isValid = false;
      errorObj.insurenceError =
        "Please select one of the Insurance check options.";
    }

    setError(errorObj);
    return isValid;
  };

  const handleCheckboxChange = (e, oppositeType) => {
    const { name, checked } = e.target;
    setApprovalState((prevState) => ({
      ...prevState,
      [name]: checked,
      [oppositeType]: false,
    }));
  };
  const isBothApproved = () => {
    return approveRcCheck && approveInsuranceCheck;
  };

  //   useEffect(() => {
  //     console.log({ sol: isBothApproved() });

  //     // if (approveRcCheck && approveInsuranceCheck) {
  //     //   setDisableBtn({
  //     //     isApproveButtonDisabled: false,
  //     //     isDisapproveButtonDisabled: true,
  //     //   });
  //     // } else if (disApproveRcCheck && disApproveInsuranceCheck) {
  //     //   setDisableBtn({
  //     //     isApproveButtonDisabled: true,
  //     //     isDisapproveButtonDisabled: false,
  //     //   });
  //     // } else {
  //     //   setDisableBtn({
  //     //     isApproveButtonDisabled: true,
  //     //     isDisapproveButtonDisabled: false,
  //     //   });
  //     // }
  //   }, [
  //     approveRcCheck,
  //     approveInsuranceCheck,
  //     disApproveRcCheck,
  //     disApproveInsuranceCheck,
  //   ]);

  const handleApprove = () => {
    console.log({ aprove: "Aprrove" });

    if (handleValidation() && isBothApproved()) {
      console.log("inside Appro rue");
      dispatch(
        pendingVehicleStatus({
          id: vechileDetailsData?.result?.[0]?._id,
          status: "APPROVED",
        })
      ).then((res) => {
        if (res?.payload?.code == 200) {
          // console.log({ res });
          dispatch(getVechailData({ driverId: data })).then(res=>{
            console.log({res});
              if(res?.payload?.code==200){
                setapproveVechileStatus(res?.payload?.result?.[0]?.approvedStatus);
              }
          })
          toastService.success("Vehicle Approved successfully");
          handleClose();
          dispatch(getPendingVehicleList({ page: 1 }));
        }
      });
    } else {
      console.log("validation failed");
    }
  };
  const handleDisApprove = () => {
    if (handleValidation() && !isBothApproved()) {
      console.log("DisAppro ruen");
      setShowModal(true);
    }
  };
  const handleDisapproveModalClose = () => {
    setShowModal(false);
  };
  const handleViewImage = (image) => {
    setImage(image);
    setImageModal(true);
  };
  const handleCloseImageModal = () => {
    setImageModal(false);
    setImage("");
  };
  console.log({ error });
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      is_local_admin: vechileDetailsData?.result?.[0]?.is_local_admin,
      is_outstation_admin: vechileDetailsData?.result?.[0]?.is_outstation_admin,
      is_express_admin: vechileDetailsData?.result?.[0]?.is_express_admin,
      is_local: vechileDetailsData?.result?.[0]?.is_local,
      is_outstation: vechileDetailsData?.result?.[0]?.is_outstation,
      is_express: vechileDetailsData?.result?.[0]?.is_express,
    }));
  }, [vechileDetailsData]);
  const handleChecked = (e, id, type) => {
    const { name, checked } = e?.target;
    const data = {
      id: vechileDetailsData?.result?.[0]?._id,
      is_local_admin: is_local,
      is_outstation_admin: is_outstation,
      is_express_admin: is_express,
      is_local: is_local,
      is_outstation: is_outstation,
      is_express: is_express,
      [type]: checked,
      [name]: checked,
    };
    dispatch(actionToService(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        setUpdateState((prev) => ({
          ...prev,
          is_local_admin: res?.payload?.editCategory?.is_local_admin,
          is_outstation_admin: res?.payload?.editCategory?.is_outstation_admin,
          is_express_admin: res?.payload?.editCategory?.is_express_admin,
          is_local: res?.payload?.editCategory?.is_local,
          is_outstation: res?.payload?.editCategory?.is_outstation,
          is_express: res?.payload?.editCategory?.is_express,
        }));
        toastService.success("Status updated successfully");
      } else {
        toastService.error("status update failed");
      }
    });
  };
  return (
    <>
      <div className="modal-open">
        <div className="ModalBox">
          <div
            id="PendingModal"
            className="modal fade BigModal show"
            style={{ display: "block" }}
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <a className="CloseModal" onClick={handleClose}>
                      ×
                    </a>
                    <h3>Pending For Approval</h3>
                    <figure>
                      <img
                        src={
                          vechileDetailsData?.result?.[0]?.driverData?.[0]
                            ?.profilePic
                        }
                        alt=""
                      />
                    </figure>
                    <h3>
                      {
                        vechileDetailsData?.result?.[0]?.driverData?.[0]
                          ?.fullName
                      }{" "}
                      <br />
                      <span>
                        Driver ID:{" "}
                        {
                          vechileDetailsData?.result?.[0]?.driverData?.[0]
                            ?.driver_number
                        }
                      </span>
                    </h3>
                    <br />
                    <div className="RequestBox">
                      <div className="form-group">
                        <article
                          style={{
                            width: "100%",
                          }}
                        >
                          <aside
                            style={{
                              width: "100%",
                            }}
                          >
                            <p>
                              <strong>Driver ID </strong>
                              <span>
                                {
                                  vechileDetailsData?.result?.[0]
                                    ?.driverData?.[0]?.driver_number
                                }
                              </span>
                            </p>
                            <p>
                              <strong>Driver Name </strong>
                              <span>
                                {
                                  vechileDetailsData?.result?.[0]
                                    ?.driverData?.[0]?.fullName
                                }
                              </span>
                            </p>
                            <p>
                              <strong>Created on </strong>
                              <span>
                                {moment(
                                  vechileDetailsData?.result?.[0]
                                    ?.driverData?.[0]?.createdAt
                                ).format("DD-MM-YYYY")}
                              </span>
                            </p>
                            <p>
                              <strong>Created By </strong>
                              <span>
                                {
                                  vechileDetailsData?.result?.[0]
                                    ?.driverData?.[0]?.fullName
                                }{" "}
                              </span>
                            </p>
                          </aside>
                          <aside
                            style={{
                              width: "100%",
                            }}
                          >
                            <p>
                              <strong>Vechile Id </strong>
                              <span>
                                {vechileDetailsData?.result?.[0]?.vehicleNumber}{" "}
                              </span>
                            </p>
                            <p>
                              <strong>Vechile Number </strong>
                              <span>
                                {
                                  vechileDetailsData?.result?.[0]
                                    ?.vehicleNumberPlate
                                }{" "}
                              </span>
                            </p>
                            <p>
                              <strong>Vechile Model </strong>
                              <span>
                                {vechileDetailsData?.result?.[0]?.vehicleModel}{" "}
                              </span>
                            </p>
                          </aside>
                        </article>
                      </div>
                      <div className="InformationBox">
                        <h3>Vehicle Status</h3>
                        <div className="Informations">
                          <div className="VehicleStatus">
                            <ul>
                              <li>
                                <label>Local</label>
                                <label className="Switch">
                                  <input
                                    type="checkbox"
                                    name="is_local"
                                    checked={is_local}
                                    onChange={(e) =>
                                      handleChecked(
                                        e,
                                        vechileDetailsData?.result?.[0]?._id,
                                        "is_local_admin"
                                      )
                                    }
                                  />
                                  <span className="slider" />
                                </label>
                              </li>
                              <li>
                                <label>Express</label>
                                <label className="Switch">
                                  <input
                                    type="checkbox"
                                    name="is_express"
                                    checked={is_express}
                                    onChange={(e) =>
                                      handleChecked(
                                        e,
                                        vechileDetailsData?.result?.[0]?._id,
                                        "is_express_admin"
                                      )
                                    }
                                  />
                                  <span className="slider" />
                                </label>
                              </li>
                              <li>
                                <label>Out Station</label>
                                <label className="Switch">
                                  <input
                                    type="checkbox"
                                    name="is_outstation"
                                    checked={is_outstation}
                                    onChange={(e) =>
                                      handleChecked(
                                        e,
                                        vechileDetailsData?.result?.[0]?._id,
                                        "is_outstation_admin"
                                      )
                                    }
                                  />
                                  <span className="slider" />
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="ModalTable">
                          <table>
                            <thead>
                              <tr>
                                <th />
                                <th>Approve</th>
                                <th>Disapprove</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="VehicleDocument">
                                    <h4>RC Details</h4>
                                    <aside>
                                      <p>
                                        <strong>
                                          Registration Certificate Number
                                        </strong>
                                        <span>
                                          {
                                            vechileDetailsData?.result?.[0]
                                              ?.rcNumber
                                          }
                                        </span>
                                      </p>
                                      <p>
                                        <strong>Registration</strong>
                                        <span>
                                          {moment(
                                            vechileDetailsData?.result?.[0]
                                              ?.rcExpiryDate
                                          ).format("DD-MM-YYYY")}
                                        </span>
                                      </p>
                                    </aside>
                                    <ul>
                                      <li>
                                        <span>Document</span>
                                        <figure
                                          className="mb-3"
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleViewImage(
                                              vechileDetailsData?.result?.[0]
                                                ?.rcFront
                                            )
                                          }
                                        >
                                          <img
                                            src={
                                              vechileDetailsData?.result?.[0]
                                                ?.rcFront
                                            }
                                          />
                                        </figure>
                                        {/* <figure
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleViewImage(data?.rcBack)
                                          }
                                        >
                                          <img src={data?.rcBack} />
                                        </figure> */}
                                      </li>
                                    </ul>
                                  </div>
                                  {error?.rcError && (
                                    <p className="d-flex justify-content-start text-danger mt-2 error">
                                      {error?.rcError}
                                    </p>
                                  )}
                                </td>
                                <td>
                                  <label className="CheckBox">
                                    <input
                                      type="checkbox"
                                      name="approveRcCheck"
                                      checked={approvalState.approveRcCheck}
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,
                                          "disApproveRcCheck"
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </td>
                                <td>
                                  <label className="CheckBox">
                                    <input
                                      type="checkbox"
                                      name="disApproveRcCheck"
                                      checked={approvalState.disApproveRcCheck}
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,
                                          "approveRcCheck"
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </td>
                              </tr>

                              <tr>
                                <td>
                                  <div className="VehicleDocument">
                                    <h4>Insurance Details</h4>
                                    <aside>
                                      {/* <p>
                                        <strong>
                                          Insurance Certificate Number
                                        </strong>
                                        <span>65465165165FSA54</span>
                                      </p> */}
                                      <p>
                                        <strong>Expiry</strong>
                                        <span>
                                          {" "}
                                          {moment(
                                            vechileDetailsData?.result?.[0]
                                              ?.insurenceExpiryDate
                                          ).format("DD-MM-YYYY")}
                                        </span>
                                      </p>
                                    </aside>
                                    <ul>
                                      <li>
                                        <span>Document</span>
                                        <figure
                                          className="mb-3"
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleViewImage(
                                              vechileDetailsData?.result?.[0]
                                                ?.insurenceFront
                                            )
                                          }
                                        >
                                          <img
                                            src={
                                              vechileDetailsData?.result?.[0]
                                                ?.insurenceFront
                                            }
                                          />
                                        </figure>
                                        {/* <figure
                                          className="mb-3"
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleViewImage(data?.insurenceBack)
                                          }
                                        >
                                          <img src={data?.insurenceBack} />
                                        </figure> */}
                                      </li>
                                    </ul>
                                  </div>
                                  {error?.insurenceError && (
                                    <p className="d-flex justify-content-start text-danger mt-2 error">
                                      {error?.insurenceError}
                                    </p>
                                  )}
                                </td>
                                <td>
                                  <label className="CheckBox">
                                    <input
                                      type="checkbox"
                                      name="approveInsuranceCheck"
                                      checked={
                                        approvalState.approveInsuranceCheck
                                      }
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,
                                          "disApproveInsuranceCheck"
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </td>
                                <td>
                                  <label className="CheckBox">
                                    <input
                                      type="checkbox"
                                      name="disApproveInsuranceCheck"
                                      checked={
                                        approvalState.disApproveInsuranceCheck
                                      }
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,
                                          "approveInsuranceCheck"
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                  </label>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="Buttons">
                        <button className="Approve" onClick={handleApprove}>
                          Approve
                        </button>
                        <button className="Reject" onClick={handleDisApprove}>
                          Disapprove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <DisApprovedModal
          id={vechileDetailsData?.result?.[0]?._id}
          handleClose={handleDisapproveModalClose}
          handleMainModalClose={handleClose}
          setapproveVechileStatus={setapproveVechileStatus}
        />
      )}
      {imageModal && (
        <ZoomEffect image={image} handleClose={handleCloseImageModal} />
        // <LgZoomEffect
        //   image={image}
        //   handleClose={handleCloseImageModal}
        // />
      )}
    </>
  );
};

export default ApproveVechileInDriverPage;
