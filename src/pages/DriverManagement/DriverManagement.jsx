import React from "react";
import { Link } from "react-router-dom";

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
                  <span className="Count">1000</span>
                </Link>
              </li>
              <li>
                <Link to={"addNewDriver"}>
                  <span className="Icon">
                    <img src={require("../../assets/images/Driver.png")} />
                  </span>
                  <span className="Text">Add new Driver</span>
                  {/* <span class="Count">12</span> */}
                </Link>
              </li>
              <li>
                <Link to="pendingForApproval">
                  <span className="Icon">
                    <img src={require("../../assets/images/Driver.png")} />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </Link>
              </li>
              <li>
                <a>
                  <span className="Icon">
                    <img src={require("../../assets/images/Driver.png")} />
                  </span>
                  <span className="Text">Insurance Management</span>
                  {/* <span class="Count">123</span> */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
