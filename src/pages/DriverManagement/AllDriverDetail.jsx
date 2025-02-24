import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import I_lineDriver from "../../components/driverManagement/allDriver/I_lineDriver";
import P2PDriver from "../../components/driverManagement/allDriver/P2PDriver";
import { useDispatch, useSelector } from "react-redux";
import { driverType } from "../../features/slices/DriverManagement/allDriver/allDriverReducer";

const AllDriverDetail = () => {
  const [p2pDriver,setP2pDriver]=useState(false)
  const dispatch=useDispatch()
  const handleDriverType=(type)=>{
    dispatch(driverType(type));
  }
  const {type}=useSelector(state=>{
    return state?.driverManagementAllDrivers;
  })
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={!type ? "nav-link active" : "nav-link"}
                  onClick={() => handleDriverType(false)}
                >
                  I-line Drivers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={type ? "nav-link active" : "nav-link"}
                  onClick={() => handleDriverType(true)}
                >
                  P2P Drivers
                </a>
              </li>
            </ul>
          </div>
          <BackButton />
        </div>

        <div className="tab-content">
          {!type ? <I_lineDriver /> : <P2PDriver />}
        </div>
      </div>
    </div>
  );
};

export default AllDriverDetail;
