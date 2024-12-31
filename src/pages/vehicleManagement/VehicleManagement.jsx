import React from 'react'
import { Link } from 'react-router-dom';

const VehicleManagement = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Vehicle Management</h4>
          <div className="TitleLink">
            {" "}
            <Link to="addVechile" className="TitleLink">
              Add Vehicle
            </Link>
            <Link to="vehicleCategory" className="TitleLink ml-2">
              Vehicle Category
            </Link>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Two Wheeler</h4>
          </div>
          <div className="DriverCountList">
            <ul>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Total Vehicles</span>
                  <span className="Count">123</span>
                </a>
              </li>
              <li>
                <a href="vehicle-management-i-line-vehicles.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">I-Line Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-management-p-2-p-vehicles.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">P2P Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Local Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Out station Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Express Delivery</span>
                  <span className="Count">50</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Offline Vehicles</span>
                  <span className="Count">63</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Online Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Three Wheeler</h4>
          </div>
          <div className="DriverCountList">
            <ul>
              <li>
                <a href="vehicle-cabs-all.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Total Vehicles</span>
                  <span className="Count">123</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-city-rides.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">I-Line Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-local-rental.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">P2P Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-outstation-duty.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Local Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-offline.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Out station Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Express Delivery</span>
                  <span className="Count">50</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Offline Vehicles</span>
                  <span className="Count">63</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Online Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Four Wheeler</h4>
          </div>
          <div className="DriverCountList">
            <ul>
              <li>
                <a href="vehicle-cabs-all.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Total Vehicles</span>
                  <span className="Count">123</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-city-rides.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">I-Line Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-local-rental.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">P2P Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-outstation-duty.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Local Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-offline.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Out station Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Express Delivery</span>
                  <span className="Count">50</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Offline Vehicles</span>
                  <span className="Count">63</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Online Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleManagement