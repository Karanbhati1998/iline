import React, { useState } from 'react'
import OnGoing from '../../components/bookingManagement/ongoing/OnGoing';
import Scheduled from '../../components/bookingManagement/scheduled/Scheduled';
import Completed from '../../components/bookingManagement/completed/Completed';
import Canceled from '../../components/bookingManagement/canceled/Canceled';

const TwoWheller = () => {
  const [activeTab,setActiveTab]=useState({
    ongoing:true,
    scheduled:false,
    completed:false,
    canceled:false
  })
  const {ongoing,scheduled,completed,canceled}=activeTab;
  const activeTabFunc=(tab)=>{
    setActiveTab((prev) => ({
      ongoing: false,
      scheduled: false,
      completed: false,
      canceled: false,
      [tab]: true
    }));
  }
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
                onClick={() => activeTabFunc("ongoing")}
              >
                Ongoing
              </a>
            </li>
            <li className="nav-item">
              <a
                className={scheduled ? "nav-link active" : "nav-link"}
                onClick={() => activeTabFunc("scheduled")}
              >
                Scheduled
              </a>
            </li>
            <li className="nav-item">
              <a
                className={completed ? "nav-link active" : "nav-link"}
                onClick={() => activeTabFunc("completed")}
              >
                Completed
              </a>
            </li>
            <li className="nav-item">
              <a
                className={canceled ? "nav-link active" : "nav-link"}
                onClick={() => activeTabFunc("canceled")}
              >
                Canceled
              </a>
            </li>
          </ul>
          <div className="tab-content">
            {ongoing && <OnGoing />}
            {scheduled && <Scheduled />}
            {completed && <Completed />}
            {canceled && <Canceled />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoWheller