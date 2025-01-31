import React, { useState } from 'react'
import BookingSummary from './bookingSummary/BookingSummary';
import ProfileSummary from "./profileSummary/ProfileSummary";
import RideDetails from '../../../UserManagementComponent/rideDetail/RideDetails';
import { useLocation } from 'react-router-dom';
import BackButton from "../../../BackButton"
const DetailDriverManagement = () => {
  const [showBookingSummary,setShowBookingSummary]=useState(false)
  const {state}=useLocation()
  console.log({state});
  
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={
                    showBookingSummary ? "nav-link" : "nav-link active"
                  }
                  onClick={() => {
                    setShowBookingSummary(false);
                  }}
                >
                  Profile Summary
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    !showBookingSummary ? "nav-link" : "nav-link active"
                  }
                  onClick={() => {
                    setShowBookingSummary(true);
                  }}
                >
                  Booking Summary
                </a>
              </li>
            </ul>
          </div>
          <BackButton />
        </div>
        {showBookingSummary ? (
          <BookingSummary state={state} />
        ) : (
          <ProfileSummary state={state} />
        )}
      </div>
    </div>
  );
}

export default DetailDriverManagement