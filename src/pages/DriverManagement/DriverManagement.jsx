import React from "react";
import { Link } from "react-router-dom";
import { canPerformAction } from "../../utils/deniedAccess";

const DriverManagement = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Driver Management</h4>
          {/* <a class="TitleLink" href="vehicle-category.html">Vehicle Category</a> */}
        </div>
        <div className="Small-Wrapper">
          <div className="DriverCountList">
            <ul>
              <li>
                <Link to="all_driver">
                  <span className="Icon">
                    <img src={require("../../assets/images/Driver.png")} />
                  </span>
                  <span className="Text">All Drivers</span>
                  <span className="Count">-</span>
                </Link>
              </li>
              {canPerformAction("Driver Management") && (
                <li>
                  <Link to={"addNewDriver"}>
                    <span className="Icon">
                      <img src={require("../../assets/images/Driver.png")} />
                    </span>
                    <span className="Text">Add new Driver</span>
                    {/* <span class="Count">12</span> */}
                  </Link>
                </li>
              )}
              <li>
                <Link to="pendingForApproval">
                  <span className="Icon">
                    <img src={require("../../assets/images/Driver.png")} />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">-</span>
                </Link>
              </li>
              <li>
                <Link to="disApproveList">
                  <span className="Icon">
                    <img src={require("../../assets/images/Driver.png")} />
                  </span>
                  <span className="Text">Disapproved Drivers</span>
                  {/* <span class="Count">123</span> */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
