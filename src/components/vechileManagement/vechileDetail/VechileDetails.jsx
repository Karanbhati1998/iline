import React, { useState } from 'react'
import VechileData from './VechileData';
import AllAssignedUser from './AllAssignedUser';
import BackButton from '../../BackButton';
import { useLocation } from 'react-router-dom';

const VechileDetails = () => {
    const [showVechileDetail,setShowVechileDetail]=useState(false)
    const {state}=useLocation()
    const handleShowVechileDetail=(data)=>{
        setShowVechileDetail(data)
    }
    console.log({state});
    
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        {/* <div class="SettingsTabs"> */}
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={
                    !showVechileDetail ? "active nav-link" : "nav-link "
                  }
                  onClick={() => handleShowVechileDetail(false)}
                >
                  Vehicle Details
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    showVechileDetail ? "active nav-link" : "nav-link "
                  }
                  onClick={() => handleShowVechileDetail(true)}
                >
                  All Assigned Drivers
                </a>
              </li>
            </ul>
          </div>
          <div className="TitleLink">
            <a className="TitleLink">
              <BackButton />
            </a>
          </div>
        </div>
        {/* <ul class="nav nav-tabs">
              <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#VehicleDetails">Vehicle Details</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#AllAssignedDrivers">All Assigned Drivers</a>
              </li>
          </ul>   */}
        <div className="tab-content">
          {!showVechileDetail ? (
            <VechileData state={state} />
          ) : (
            <AllAssignedUser state={state} />
          )}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default VechileDetails