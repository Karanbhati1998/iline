import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import PersonalDetail from "../../components/UserManagementComponent/personalDetail/PersonalDetail";
import RideDetails from "../../components/UserManagementComponent/rideDetail/RideDetails";
import { useLocation } from "react-router-dom";

const UserManagementDetail = () => {
  const [showRideDetail,setShowRideDetail]=useState(false)
  const {state}=useLocation()
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={!showRideDetail ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => setShowRideDetail(false)}
                >
                  Personal Details
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={showRideDetail ? "nav-link active" : "nav-link"}
                  onClick={() => setShowRideDetail(true)}
                >
                  Ride Details
                </a>
              </li>
            </ul>
          </div>
          <BackButton />
        </div>
        {!showRideDetail ? (
          <PersonalDetail state={state} />
        ) : (
          <RideDetails state={state} />
        )}
      </div>
    </div>
  );
};

export default UserManagementDetail;
