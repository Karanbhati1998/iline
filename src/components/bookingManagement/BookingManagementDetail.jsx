import React from "react";
import BackButton from "../BackButton";
import { useLocation } from "react-router-dom";

const BookingManagementDetail = () => {
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
              <h1>Ongoing Booking Details</h1>
              <p>
                {state?.scheduledDate} {"  ,"}
                {state?.scheduledTime} • ID: {state?.trip_number}
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
                    <img
                      src={
                        state?.driverData?.profilePic ||
                        require("../../assets/images/Driver.png")
                      }
                      alt="no img"
                    />
                  </span>
                  <span className="Text">
                    {state?.driverData?.fullName}{" "}
                    <p>{state?.driverData?.phoneNumber}</p>
                  </span>
                  <span className="Count">⭐ -</span>
                </a>
              </li>
              <li>
                <h2>
                  Customer Details<span> #{state?.userData?.user_number}</span>
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
                  <span className="Count">⭐ {state?.userData?.avgRating}</span>
                </a>
              </li>
              <li>
                <h2>Pick Up Location</h2>
                <a href="driver-management-all-driver-details.html">
                  <span className="Icon">
                    <img
                      src={require("../../assets/images/locationIcon.png")}
                    />
                  </span>
                  <span className="Text">
                    {state?.pickUpLocationName}
                    <p>Drop off 12:28PM, 23 Feb</p>
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
                    {state?.dropOffLocationName}
                    <p>Drop off -, -</p>
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
                    -<p>-</p>
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
                    -<p>-</p>
                    <p>Address details</p>
                  </span>
                </a>
              </li>
              <li>
                <h2>
                  Vehicle Details <span> #-</span>
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
                          <span> {state?.weight} Kg</span>
                        </p>
                        <p>
                          <strong> Dimensions</strong>
                          <span>
                            {" "}
                            {state?.length} m x {state?.width} m x{" "}
                            {state?.height} m
                          </span>
                        </p>
                        <p>
                          <strong> Cargo Volume</strong>
                          <span>
                            {" "}
                            {(
                              state?.length *
                              state?.width *
                              state?.height *
                              35.3147
                            ).toFixed(2)}{" "}
                            cubic feet
                          </span>
                        </p>
                        <p>
                          <strong>Delivery Instructions</strong>
                          <span> {state?.deliveryInstructions}</span>
                        </p>
                        <p>
                          <strong>Special Handling Instructions:</strong>
                          <span> {state?.specialHandlingInstructions}</span>
                        </p>
                      </aside>
                      <aside>
                        <p>
                          <strong>Image </strong>
                          <span>
                            <img
                              src={state?.parcelImages?.[0]}
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
                          <span> {state?.numberOfParcel}</span>
                        </p>
                        <p>
                          <strong> Loading Time</strong>
                          <span>{state?.loadingTime}</span>
                        </p>
                        <p>
                          <strong> Unloading Time</strong>
                          <span>{state?.unloadingTime}</span>
                        </p>
                        <p>
                          <strong>
                            Has the purchased trip insurance for a safe journey?
                          </strong>{" "}
                          -
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
                        <span> Rs {state?.tripCharge}</span>
                      </p>
                      <p>
                        <strong>Loading/Unloading Charges</strong>
                        <span> Rs -</span>
                      </p>
                      <p>
                        <strong>Insurance</strong>
                        <span> Rs -</span>
                      </p>
                    </aside>
                    <aside>
                      {" "}
                      <p>
                        <strong>GST (5%)</strong>
                        <span> Rs -</span>
                      </p>
                    
                      <p>
                        <strong>Coupon Discount</strong>
                        <span> -Rs -</span>
                      </p>
                    </aside>
                  </article>
                </div>
              </div>
              <h3>Total Amount to Pay: Rs -</h3>
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
           
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default BookingManagementDetail;
