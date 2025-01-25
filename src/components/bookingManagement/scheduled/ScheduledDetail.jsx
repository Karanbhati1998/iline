import React from 'react'
import BackButton from '../../BackButton';

const ScheduledDetail = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <a className="TitleLink">
            <BackButton />
          </a>
        </div>
        {/* <div class="booking"> */}
        <div className="Small-Wrapper">
          <div className="DriverCountList">
            <div className="OrderHeader">
              <h1>Scheduled Booking Details</h1>
              <p>Tue, 23 Feb 2020 12:00PM • ID: 2130812309</p>
            </div>
            <ul>
              <li>
                <h2>
                  Driver Details <span> #21335</span>
                </h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/Driver.png" />
                  </span>
                  <span className="Text">
                    Akshit Kumar <p>+918382482473</p>
                  </span>
                  <span className="Count">⭐ 4.5</span>
                </a>
              </li>
              <li>
                <h2>
                  Customer Details<span> #21335</span>
                </h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/Driver.png" />
                  </span>
                  <span className="Text">
                    Gregory <p>+918382482473</p>
                  </span>
                  <span className="Count">⭐ 4.5</span>
                </a>
              </li>
              <li>
                <h2>Pick Up Location</h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/Driver.png" />
                  </span>
                  <span className="Text">
                    East Coast Hill<p>Drop off 12:28PM, 23 Feb</p>
                  </span>
                </a>
              </li>
              <li>
                <h2>Drop Location</h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/Driver.png" />
                  </span>
                  <span className="Text">
                    East Coast Hill<p>Drop off 12:28PM, 23 Feb</p>
                  </span>
                </a>
              </li>
              <li>
                <h2>Sender Details</h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/Driver.png" />
                  </span>
                  <span className="Text">
                    Poonam Vashisht<p>+918382482473</p>
                    <p>Address details</p>
                  </span>
                </a>
              </li>
              <li>
                <h2>Receiver Details</h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/Driver.png" />
                  </span>
                  <span className="Text">
                    Poonam Vashisht<p>+918382482473</p>
                    <p>Address details</p>
                  </span>
                </a>
              </li>
              <li>
                <h2>
                  Vehicle Details <span> #21335</span>
                </h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img src="images/car.png" />
                  </span>
                  <span className="Text">
                    UP16-BV-0000 <p>• Sedan</p>
                  </span>
                </a>
              </li>
              <div className="InformationBox mt-4" style={{ width: "100%" }}>
                <h3>Load Details</h3>
                <div className="Informations">
                  <div className="ProfileInfo">
                    <article>
                      <aside>
                        <p>
                          <strong>Package Type </strong>{" "}
                          <span>Standard Package</span>
                        </p>
                        <p>
                          <strong> Weight</strong>
                          <span> 13.6 Kg</span>
                        </p>
                        <p>
                          <strong> Dimensions</strong>
                          <span> 100 m x 500 m x 25 m</span>
                        </p>
                        <p>
                          <strong> Cargo Volume</strong>
                          <span> 33.2 cubic feet</span>
                        </p>
                        <p>
                          <strong>Delivery Instructions</strong>
                          <span> loremipusm</span>
                        </p>
                        <p>
                          <strong>Special Handling Instructions:</strong>
                          <span> loremipusm</span>
                        </p>
                      </aside>
                      <aside>
                        <p>
                          <strong>Image </strong>
                          <span>
                            <img src="images/akshit.png" />
                          </span>
                        </p>
                        <p>
                          <strong> No. of Parcels</strong>
                          <span> 2</span>
                        </p>
                        <p>
                          <strong> Loading Time</strong>
                          <span> 1 hr 30 min</span>
                        </p>
                        <p>
                          <strong> Unloading Time</strong>
                          <span> 1 hr 30 min</span>
                        </p>
                        <p>
                          <strong>
                            {" "}
                            Has the purchased trip insurance for a safe journey?
                          </strong>{" "}
                          Yes
                        </p>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
            </ul>
            <div className="InformationBox mt-4 ">
              <h3>Bill Summary</h3>
              <div className="Informations">
                <div className="ProfileInfo">
                  <article>
                    <aside>
                      <p>
                        <strong>Trip Charges</strong>
                        <span> Rs 210</span>
                      </p>
                      <p>
                        <strong>Loading/Unloading Charges</strong>
                        <span> Rs 100</span>
                      </p>
                      <p>
                        <strong>Insurance</strong>
                        <span> Rs 100</span>
                      </p>
                    </aside>
                    <aside>
                      {" "}
                      <p>
                        <strong>SGST (5%)</strong>
                        <span> Rs 10.5</span>
                      </p>
                      <p>
                        <strong>CGST (5%)</strong>
                        <span> Rs 10.5</span>
                      </p>
                      <p>
                        <strong>Coupon Discount</strong>
                        <span> -Rs 10.5</span>
                      </p>
                    </aside>
                  </article>
                </div>
              </div>
              <h3>Total Amount to Pay: Rs 231</h3>
            </div>
            <div className="Small-Wrapper">
              <div className="TitleBox">
                <h4 className="Title">Documents</h4>
              </div>
              <div className="InformationBox mt-4">
                <h3>Customer</h3>
                <div className="Informations">
                  <div className="ProfileInfo">
                    <article>
                      <aside>
                        <p>
                          <strong>Document 1</strong>
                          <span>
                            {" "}
                            <img src="images/akshit.png" />
                          </span>
                        </p>
                      </aside>
                      <aside>
                        <p>
                          <strong>Document 2</strong>
                          <span>
                            <img src="images/akshit.png" />
                          </span>
                        </p>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
              <div className="InformationBox mt-4">
                <h3>Drivers</h3>
                <div className="Informations">
                  <div className="ProfileInfo">
                    <article>
                      <aside>
                        <p>
                          <strong>Document 1</strong>
                          <span>
                            {" "}
                            <img src="images/akshit.png" />
                          </span>
                        </p>
                      </aside>
                      <aside>
                        <p>
                          <strong>Document 2</strong>
                          <span>
                            <img src="images/akshit.png" />
                          </span>
                        </p>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="row mt-4">
                        
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Incorrect Load Reported</label>
                          <div class="Avaialable">
                              <ul>
                                  <li>
                                      <label class="CheckBox">Yes
                                          <input type="checkbox">
                                          <span class="checkmark"></span>
                                      </label>
                                  </li>
                                  <li>
                                      <label class="CheckBox">No
                                          <input type="checkbox">
                                          <span class="checkmark"></span>
                                      </label>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Revised Load Capacity</label>
                          <input type="text" class="form-control" value="450 Kg" disabled>
                      </div> 
                  </div>  
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Penalty</label>
                          <input type="text" class="form-control" value="Rs 1000" disabled>
                      </div> 
                  </div>  
                  <div class="col-sm-6">
                      <div class="form-group">
                          <label>Revised Amount to Pay</label>
                          <input type="text" class="form-control" value="Rs 3000" disabled>
                      </div> 
                  </div>  
              </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ScheduledDetail