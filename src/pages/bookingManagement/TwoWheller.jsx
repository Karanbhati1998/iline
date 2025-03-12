import React, { useState } from "react";
import OnGoing from "../../components/bookingManagement/ongoing/OnGoing";
import Scheduled from "../../components/bookingManagement/scheduled/Scheduled";
import Completed from "../../components/bookingManagement/completed/Completed";
import Canceled from "../../components/bookingManagement/canceled/Canceled";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeTabFunc } from "../../features/slices/bookingManagementSlice";
const TwoWheller = () => {
  // const [activeTab,setActiveTab]=useState({
  //   ongoing:true,
  //   scheduled:false,
  //   completed:false,
  //   canceled:false
  // })

  const { state } = useLocation();
  const dispatch = useDispatch();
  const { activeBookingTab } = useSelector((state) => {
    return state.bookingManagement;
  });
  const { ongoing, scheduled, completed, canceled } = activeBookingTab;
  const handleActiveTab = (tab) => {
    dispatch(
      activeTabFunc({
        ongoing: false,
        scheduled: false,
        completed: false,
        canceled: false,
        [tab]: true,
      })
    );
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Booking Management</h4>
        </div>
        <div className="SettingsTabs mt-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={ongoing ? "nav-link active" : "nav-link"}
                onClick={() => handleActiveTab("ongoing")}
              >
                Ongoing
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                className={scheduled ? "nav-link active" : "nav-link"}
                onClick={() => handleActiveTab ("scheduled")}
              >
                Scheduled
              </a>
            </li> */}
            <li className="nav-item">
              <a
                className={completed ? "nav-link active" : "nav-link"}
                onClick={() => handleActiveTab("completed")}
              >
                Completed
              </a>
            </li>
            <li className="nav-item">
              <a
                className={canceled ? "nav-link active" : "nav-link"}
                onClick={() => handleActiveTab("canceled")}
              >
                Cancelled
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="Ongoing">
              {ongoing && <OnGoing categoryId={state} />}
              {scheduled && <Scheduled categoryId={state} />}
              {completed && <Completed categoryId={state} />}
              {canceled && <Canceled categoryId={state} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoWheller;
