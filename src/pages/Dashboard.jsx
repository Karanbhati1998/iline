import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getEarlyAccesData } from "../features/slices/Dashboard";
import { downloadCSV } from "../utils/downloadGetEarlyAccesData"; 

const Dashboard = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getEarlyAccesData());
  },[])
  const { earlyAccesData } = useSelector((state) => state.dashboard);
  console.log({ earlyAccesData });
  const handleDownload = () => {
    if (earlyAccesData?.result) {
      downloadCSV(earlyAccesData.result, "early_access_data.csv");
    } else {
      console.error("No data available to download.");
    }
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
                <label>From Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button className="Button">Apply</button>
                <button className="Button Cancel">
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
            <div className="FilterRight">
              <div className="form-group">
                <label>Duration</label>
                <select className="form-control">
                  <option>Select</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
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
                    <h2>40</h2>
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
                    <h2>40</h2>
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
                    <h2>40</h2>
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
                    <h2>40</h2>
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
                    <h2>2000</h2>
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
                    <h2>40</h2>
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
                    <h2 />
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
                    <h2>40</h2>
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
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mt-4">
              <div className="">
                <figure className="graph">
                  <img src={require("../assets/images/graph-demo.jpg")} />
                </figure>
              </div>
              {/* <div class="col-4"><figure class="graph"><img src="images/graph-2.png"></figure></div> */}
            </div>
            {/* <div class="row mt-4">
          <div class="col-4"><figure class="graph"><img src="images/graph-3.png"></figure></div>
          <div class="col-4"><figure class="graph"><img src="images/graph-4.png"></figure></div>
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
