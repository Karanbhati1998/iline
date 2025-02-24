import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import PersonalDetail from "../../components/UserManagementComponent/personalDetail/PersonalDetail";
import RideDetails from "../../components/UserManagementComponent/rideDetail/RideDetails";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeDetailTabFunc } from "../../features/slices/userManagementReducer";

const UserManagementDetail = () => {
  const {state}=useLocation()
  const dispatch=useDispatch()
   const { activeDetailTab } = useSelector((state) => {
     return state?.userManagement;
   });
   const handleActiveTab=(val)=>{
    dispatch(activeDetailTabFunc(val));
   }
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={!activeDetailTab ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => handleActiveTab(false)}
                >
                  Personal Details
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={activeDetailTab ? "nav-link active" : "nav-link"}
                  onClick={() => handleActiveTab(true)}
                >
                  Ride Details
                </a>
              </li>
            </ul>
          </div>
          <BackButton />
        </div>
        {!activeDetailTab ? (
          <PersonalDetail state={state} />
        ) : (
          <RideDetails state={state} />
        )}
      </div>
    </div>
  );
};

export default UserManagementDetail;
