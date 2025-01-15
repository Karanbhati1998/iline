import React, { useState } from 'react'
import DisApproveModal from './DisApproveModal';
import BackButton from '../../BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { rejectAndAcceptOfPendngForApproval } from '../../../features/slices/DriverManagement/pendingForApproval/pendingForApproval';
import { toastService } from '../../../utils/toastify';
const initialState={}
const VechileStatus = () => {
  const [showDisApproveModal,setShowDisApproveModal]=useState(false)
  const {state}=useLocation()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  console.log({state});
  
  const handleCloseDisApproveModal=()=>{
    setShowDisApproveModal(false)
  }
  const handleApproveOrDisApprove=(val)=>{
    const data={
      id:state?._id,
      status:val,
    }
    dispatch(rejectAndAcceptOfPendngForApproval(data)).then(res=>{
      if(res?.payload?.code===200){
        setShowDisApproveModal(false)
        toastService.success("Status updated successfully")
        navigate("/driverManagement/pendingForApproval");
      }else{
        toastService.error(res?.payload?.message)
      }
    })
  }
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
                          <span>
                            <i className="fa fa-star" aria-hidden="true" /> 4.5{" "}
                          </span>
                        </h3>
                        <h4>User ID : #-</h4>
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
                        <p>
                          <label>Location</label> <span>-</span>
                        </p>
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
                              <strong>Registration Certificate Number</strong>
                              <span>{state?.aadharNumber}</span>
                            </p>
                            <p>
                              <strong>Expiry</strong>
                              <span>-</span>
                            </p>
                          </aside>
                          <ul>
                            <li>
                              <span>Document</span>
                              <figure>
                                <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                              </figure>
                            </li>
                            <li>
                              <strong className="Red">
                                <i className="fa fa-exclamation-triangle" />{" "}
                                Expiring in 5 days
                              </strong>
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
                              <strong>Registration Certificate Number</strong>
                              <span>{state?.dlNumber}</span>
                            </p>
                            <p>
                              <strong>Expiry</strong>
                              <span>
                                {moment(
                                  state?.driverDocumentData?.[0]?.expiryDate
                                ).format("DD-MM-YYYY")}
                              </span>
                            </p>
                          </aside>
                          <ul>
                            <li>
                              <span>Document</span>
                              <figure>
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
                                }}
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
                                  state?.driverDocumentData?.[0]?.expiryDate
                                ).isAfter(moment())
                                  ? `Expiring in ${moment(
                                      state?.driverDocumentData?.[0]?.expiryDate
                                    ).fromNow()}`
                                  : `Expired ${moment(
                                      state?.driverDocumentData?.[0]?.expiryDate
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
          handleApproveOrDisApprove={handleApproveOrDisApprove}
        />
      )}
    </>
  );
}

export default VechileStatus