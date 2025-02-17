import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import moment from "moment";
import { toastService } from "../../../utils/toastify";
import { useDispatch } from "react-redux";
import {
  getPendingVehicleList,
  pendingVehicleStatus,
} from "../../../features/slices/vechileManagement/vechileManagement";
import DisApprovedModal from "./DisApprovedModal";
import ZoomEffect from "../../ZoomEffect";

const PendingForApproval = ({ handleClose, data, handleViewImageFunc }) => {
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

 useEffect(() => {
   if (approveRcCheck && approveInsuranceCheck) {
     setDisableBtn({
       isApproveButtonDisabled: false,
       isDisapproveButtonDisabled: true,
     });
   } else if (disApproveRcCheck && disApproveInsuranceCheck) {
     setDisableBtn({
       isApproveButtonDisabled: true,
       isDisapproveButtonDisabled: false,
     });
   } else {
     setDisableBtn({
       isApproveButtonDisabled: true,
       isDisapproveButtonDisabled: false,
     });
   }
 }, [
   approveRcCheck,
   approveInsuranceCheck,
   disApproveRcCheck,
   disApproveInsuranceCheck,
 ]);


  const handleApprove = () => {
    if (handleValidation()) {
      console.log("Appro rue");
      dispatch(
        pendingVehicleStatus({
          id: data?._id,
          status: "APPROVED",
        })
      ).then((res) => {
        if (res?.payload?.code == 200) {
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
    if (handleValidation()) {
      console.log("DisAppro ruen");
      setShowModal(true);
    }
  };
  const handleDisapproveModalClose = () => {
    setShowModal(false);
  };
  const handleViewImage = (image) => {
    handleViewImageFunc(image);
  };
  // const handleCloseImageModal = () => {
  //   setImageModal(false);
  //   setImage("");
  // };
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
                      <img src={data?.driverData?.profilePic} alt="" />
                    </figure>
                    <h3>
                      {data?.driverData?.fullName} <br />
                      <span>Driver ID: {data?.driverData?.driver_number}</span>
                    </h3>
                    <br />
                    <div className="RequestBox">
                      <div className="form-group">
                        <p>
                          <strong>Driver ID </strong>
                          <span>{data?.driverData?.driver_number}</span>
                        </p>
                        <p>
                          <strong>Driver Name </strong>
                          <span>{data?.driverData?.fullName}</span>
                        </p>
                        <p>
                          <strong>Created on </strong>
                          <span>
                            {moment(data?.driverData?.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </p>
                        <p>
                          <strong>Created By </strong>
                          <span>{data?.driverData?.fullName} </span>
                        </p>
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
                                        <span>{data?.rcNumber}</span>
                                      </p>
                                      <p>
                                        <strong>Expiry</strong>
                                        <span>
                                          {moment(data?.rcExpiryDate).format(
                                            "DD-MM-YYYY"
                                          )}
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
                                            handleViewImage(data?.rcFront)
                                          }
                                        >
                                          <img src={data?.rcFront} />
                                        </figure>
                                        <figure
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleViewImage(data?.rcBack)
                                          }
                                        >
                                          <img src={data?.rcBack} />
                                        </figure>
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
                                      <p>
                                        <strong>
                                          Insurance Certificate Number
                                        </strong>
                                        <span>65465165165FSA54</span>
                                      </p>
                                      <p>
                                        <strong>Expiry</strong>
                                        <span>
                                          {" "}
                                          {moment(
                                            data?.insurenceExpiryDate
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
                                              data?.insurenceFront
                                            )
                                          }
                                        >
                                          <img src={data?.insurenceFront} />
                                        </figure>
                                        <figure
                                          className="mb-3"
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleViewImage(data?.insurenceBack)
                                          }
                                        >
                                          <img src={data?.insurenceBack} />
                                        </figure>
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
                        <button
                          className="Approve"
                          onClick={handleApprove}
                          disabled={isApproveButtonDisabled}
                        >
                          Approve
                        </button>
                        <button
                          className="Reject"
                          onClick={handleDisApprove}
                          disabled={isDisapproveButtonDisabled}
                        >
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
          id={data?._id}
          handleClose={handleDisapproveModalClose}
          handleMainModalClose={handleClose}
        />
      )}
      {/* {imageModal && (
        <ZoomEffect image={image} handleClose={handleCloseImageModal} />
      )} */}
    </>
  );
};

export default PendingForApproval;
