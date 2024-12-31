import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import I_lineDriver from "../../components/driverManagement/allDriver/I_lineDriver";
import P2PDriver from "../../components/driverManagement/allDriver/P2PDriver";

const AllDriverDetail = () => {
  const [p2pDriver,setP2pDriver]=useState(false)
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={!p2pDriver ? "nav-link active" : "nav-link"}
                  onClick={() => setP2pDriver(false)}
                >
                  I-line Drivers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={p2pDriver ? "nav-link active" : "nav-link"}
                  onClick={() => setP2pDriver(true)}
                >
                  P2P Drivers
                </a>
              </li>
            </ul>
          </div>
          <BackButton />
        </div>
        
    <div className="tab-content">

        {!p2pDriver ? <I_lineDriver /> : <P2PDriver />}
    </div>
      </div>
    </div>
  );
};

export default AllDriverDetail;
