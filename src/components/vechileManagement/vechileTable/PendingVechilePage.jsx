import React from "react";
import PendingVechileTable from "./PendingVechileTable";
import BackButton from "../../BackButton";
import { useLocation } from "react-router-dom";

const PendingVechilePage = () => {
  const { state } = useLocation();
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="SettingsTabs">
          <div className="TitleBox">
            <h4 className="Title">Pending For Approval</h4>
            <div className="TitleLink">
              <a className="TitleLink">
                <BackButton />
              </a>
            </div>
          </div>
          <div className="tab-content">
            <PendingVechileTable categoryId={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingVechilePage;
