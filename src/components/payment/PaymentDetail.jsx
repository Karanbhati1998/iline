import React from 'react'
import { useLocation } from 'react-router-dom';
import BackButton from '../BackButton';
import moment from 'moment';

const PaymentDetail = () => {
    const { state } = useLocation();
    console.log({ state });
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
                <h1> Details</h1>
                <p>
                  {state?.requestData?.scheduledDate} {"  ,"}
                  {state?.requestData?.scheduledTime} • ID:{" "}
                  {state?.requestData?.trip_number}
                </p>
              </div>
              <ul>
                <li>
                  <h2>
                    Driver Details{" "}
                    <span> #{state?.driverData?.driver_number}</span>
                  </h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img src={require("../../assets/images/Driver.png")} />
                    </span>
                    <span className="Text">
                      {state?.driverData?.fullName}{" "}
                      <p>{state?.driverData?.phoneNumber}</p>
                    </span>
                    <span className="Count">
                      ⭐ {state?.driverData?.avgRating}
                    </span>
                  </a>
                </li>
                <li>
                  <h2>
                    Customer Details<span> #21335</span>
                  </h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img
                        src={
                          state?.userData?.profilePic ||
                          require("../../assets/images/Driver.png")
                        }
                      />
                    </span>
                    <span className="Text">
                      {state?.userData?.fullName}{" "}
                      <p>{state?.userData?.phoneNumber}</p>
                    </span>
                    <span className="Count">
                      ⭐ {state?.userData?.avgRating}
                    </span>
                  </a>
                </li>
                <li>
                  <h2>Pick Up Location</h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img src={require("../../assets/images/Driver.png")} />
                    </span>
                    <span className="Text">
                      {state?.requestData?.pickUpLocationName}
                      <p>
                        Drop off{" "}
                        {moment(state?.beginAt).format("DD-MM-YYYY, HH:mm")}
                      </p>
                    </span>
                  </a>
                </li>
                <li>
                  <h2>Drop Location</h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img
                        src={require("../../assets/images/locationIcon.png")}
                      />
                    </span>
                    <span className="Text">
                      {state?.requestData?.dropOffLocationName}
                      <p>
                        Drop off{" "}
                        {moment(state?.endAt).format("DD-MM-YYYY, HH:mm")}
                      </p>
                    </span>
                  </a>
                </li>
                <li>
                  <h2>Sender Details</h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img src={require("../../assets/images/Driver.png")} />
                    </span>
                    <span className="Text">
                      {state?.requestData?.pickUpUserName}
                      <p>{state?.requestData?.pickUpPhoneNumber}</p>

                      {state?.requestData?.pickUpLocationName}
                    </span>
                  </a>
                </li>
                <li>
                  <h2>Receiver Details</h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img src={require("../../assets/images/Driver.png")} />
                    </span>
                    <span className="Text">
                      {state?.requestData?.dropOffUserName}
                      <p>{state?.requestData?.dropOffPhoneNumber}</p>
                      <p>{state?.requestData?.dropOffLocationName}</p>
                    </span>
                  </a>
                </li>
                <li>
                  <h2>
                    Vehicle Details{" "}
                    <span> {state?.vehicleData?.vehicleNumber}</span>
                  </h2>
                  <a href="driver-management-all-driver-details.html">
                    <span className="Icon">
                      <img src={state?.vehicleData?.vehicleFrontImage} />
                    </span>
                    <span className="Text">
                      {state?.vehicleData?.vehicleNumberPlate}
                      <p>• {state?.vehicleData?.vehicleModel}</p>
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
                            <span> {state?.requestData?.weight} Kg</span>
                          </p>
                          <p>
                            <strong> Dimensions</strong>
                            <span>
                              {" "}
                              {state?.requestData?.length} m x{" "}
                              {state?.requestData?.width} m x{" "}
                              {state?.requestData?.height} m
                            </span>
                          </p>
                          <p>
                            <strong> Cargo Volume</strong>
                            <span>
                              {" "}
                              {(
                                state?.requestData?.length *
                                state?.requestData?.width *
                                state?.requestData?.height *
                                35.3147
                              ).toFixed(2)}{" "}
                              cubic feet
                            </span>
                          </p>
                          <p>
                            <strong>Delivery Instructions</strong>
                            <span>
                              {" "}
                              {state?.requestData?.deliveryInstructions ||
                                "no Instructions"}
                            </span>
                          </p>
                          <p>
                            <strong>Special Handling Instructions:</strong>
                            <span>
                              {" "}
                              {state?.requestData
                                ?.specialHandlingInstructions ||
                                "no Instructions"}
                            </span>
                          </p>
                        </aside>
                        <aside>
                          <p>
                            <strong>Image </strong>
                            <span>
                              <img
                                src={state?.requestData?.parcelImages?.[0]}
                                style={{
                                  width: "50px",

                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                              />
                            </span>
                          </p>
                          <p>
                            <strong> No. of Parcels</strong>
                            <span> {state?.requestData?.numberOfParcel}</span>
                          </p>
                          <p>
                            <strong> Loading Time</strong>
                            <span> {state?.requestData?.loadingTime}</span>
                          </p>
                          <p>
                            <strong> Unloading Time</strong>
                            <span>{state?.requestData?.unloadingTime}</span>
                          </p>
                          {/* <p>
                          <strong> -</strong> -
                        </p> */}
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
                          <span> Rs {state?.requestData?.tripCharge}</span>
                        </p>
                        <p>
                          <strong>Loading/Unloading Charges</strong>
                          <span>
                            {" "}
                            Rs {state?.requestData?.loadingUnloadingCharge}
                          </span>
                        </p>
                        {/* <p>
                        <strong>Insurance</strong>
                        <span> Rs -</span>
                      </p> */}
                      </aside>
                      <aside>
                        {" "}
                        <p>
                          <strong>GST (5%)</strong>
                          <span> Rs {state?.requestData?.gstCharge}</span>
                        </p>
                        {/* <p>
                        <strong>Coupon Discount</strong>
                        <span> -Rs -</span>
                      </p> */}
                      </aside>
                    </article>
                  </div>
                </div>
                <h3>
                  Total Amount to Pay: Rs {state?.requestData?.withoutGst}
                </h3>
              </div>
              {/* <div className="InformationBox mt-4">
              <h3>Documents</h3>
              <div className="Informations">
                <div className="ProfileInfo">
                  <article>
                    <aside>
                      <p>
                        <strong>Document 1</strong>
                        <span>
                          {" "}
                          <img
                            src={require("../../../assets/images/akshit.png")}
                          />
                        </span>
                      </p>
                    </aside>
                    <aside>
                      <p>
                        <strong>Document 2</strong>
                        <span>
                          <img
                            src={require("../../../assets/images/akshit.png")}
                          />
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
                          <img
                            src={require("../../../assets/images/akshit.png")}
                          />
                        </span>
                      </p>
                    </aside>
                    <aside>
                      <p>
                        <strong>Document 2</strong>
                        <span>
                          <img
                            src={require("../../../assets/images/akshit.png")}
                          />
                        </span>
                      </p>
                    </aside>
                  </article>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Incorrect Load Reported</label>
                  <div className="Avaialable">
                    <ul>
                      <li>
                        <label className="CheckBox">
                          Yes
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </li>
                      <li>
                        <label className="CheckBox">
                          No
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Estimated CPV (Cost Per View)</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Rs. 13.33"
                    disabled=""
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Estimated CPV (Cost Per View)</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Rs. 13.33"
                    disabled=""
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Estimated CPV (Cost Per View)</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Rs. 13.33"
                    disabled=""
                  />
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

export default PaymentDetail