import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData, getEarlyAccesData } from "../features/slices/Dashboard";
import { downloadCSV } from "../utils/downloadGetEarlyAccesData";
const initialState = {
  startDate: "",
  endDate: "",
  timeframe: "",
};
const Dashboard = () => {
    const [iState, setUpdateState] = useState(initialState);
    const { startDate, timeframe, endDate } = iState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEarlyAccesData());
  }, []);
  useEffect(() => {
    dispatch(getDashboardData({ timeframe })); // this api for dashboard Data
  }, [timeframe]);
  const { earlyAccesData, dashboardData } = useSelector(
    (state) => state.dashboard
  );
  console.log({  dashboardData });
  const handleDownload = () => {
    if (earlyAccesData?.result) {
      downloadCSV(earlyAccesData.result, "early_access_data.csv");
    } else {
      console.error("No data available to download.");
    }
  };
   const handleChange = (e) => {
     setUpdateState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const handleApply = () => {
     const data = {
       startDate: startDate,
       endDate: endDate,
     };
     dispatch(getDashboardData(data));
   };
   const handleReset = () => {
     setUpdateState(initialState);
     dispatch(getDashboardData());
   };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Dashboard</h4>
          <button className="Button" onClick={handleDownload}>
            Get Early Access Data
          </button>
        </div>
        {/* <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#Statistics"
              >
                Statistics
              </a>
            </li>
          </ul>
        </div> */}
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>From</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={startDate}
                  disabled={timeframe}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={endDate}
                  onChange={handleChange}
                  disabled={timeframe}
                />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button className="Button" onClick={handleApply}>
                  Apply
                </button>
                <button className="Button Cancel ml-2" onClick={handleReset}>
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
            <div className="FilterRight">
              <div className="form-group">
                <label>Timeframe</label>
                <select
                  className="form-control"
                  name="timeframe"
                  onChange={handleChange}
                  value={timeframe}
                  disabled={startDate || endDate}
                >
                  <option>Select </option>
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <div className="Dashboard Active">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Rides</h4>
                    <h2>{dashboardData?.totalRide}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Completed Rides</h4>
                    <h2>{dashboardData?.completedRide}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Upcoming Rides</h4>
                    <h2>{dashboardData?.upcomingRide}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Ads Running</h4>
                    <h2>{dashboardData?.totalAddRunning}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Revenue</h4>
                    <h2>
                      {dashboardData?.totalRevenue
                        ? dashboardData.totalRevenue.toFixed(2)
                        : "0.00"}
                    </h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Fleets</h4>
                    <h2>{dashboardData?.totalFleets}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Number of Enterprise</h4>
                    <h2>{dashboardData?.totalNumberOfEnterprise}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Number of Logistics Partner</h4>
                    <h2>{dashboardData?.totalNumberOfPartner}</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="Dashboard">
                  <figure>
                    <img src={require("../assets/images/car.png")} />
                  </figure>
                  <figcaption>
                    <h4>Total Number of Drivers</h4>
                    <h2>{dashboardData?.totalDriver}</h2>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card-body">
            <div className="row mt-4">
              <div className="">
                <figure className="graph">
                  <img src={require("../assets/images/graph-demo.jpg")} />
                </figure>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
