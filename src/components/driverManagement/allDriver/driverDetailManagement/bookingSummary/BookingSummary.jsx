import React, { useState } from 'react'
import LocalDelivery from './LocalDelivery';
import OutStationDelivery from './OutStationDelivery';
import ExpressDelivery from './ExpressDelivery';

const BookingSummary = ({ state }) => {
  const [showState, setShowState] = useState({
    local: true,
    outstation: false,
    express: false,
  });
  const { local, outstation, express } = showState;
  const handleClick = (name) => {
    setShowState((prev) => ({
      local: false,
      outstation: false,
      express: false,
      [name]: true,
    }));
  };
  console.log({state});
  
  return (
    <div className="Small-Wrapper">
      <div className="tab-content">
        <div className="tab-pane " id="personal-details">
          <div className="personal-details">
            {/* <div class="TitleBox">
                          <h4 class="Title">Personal Details</h4>                                  
                      </div> */}
            <div className="RiderArea">
              <div className="RiderBox">
                <div className="RiderHead">
                  <figure>
                    <img
                      src={require("../../../../../assets/images/Avatar-1.png")}
                    />
                  </figure>
                  <figcaption>
                    <div>
                      <h3>
                        {state?.fullName}{" "}
                        <span>
                          <i className="fa fa-star" aria-hidden="true" />{" "}
                          {state?.avgRating
                            ? state.avgRating.toFixed(2)
                            : "0.00"}{" "}
                        </span>
                      </h3>
                      <h4>User ID : #{state?.driver_number}</h4>
                    </div>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                    </div>
                  </figcaption>
                </div>
                <br />
                <div className="RiderBody">
                  <aside>
                    <p>
                      <label>User Id</label> <span> #12345</span>
                    </p>
                    <p>
                      <label>City &amp; State</label> <span> Agra, UP</span>
                    </p>
                    <p>
                      <label>Gender </label> <span> Male</span>
                    </p>
                    <p>
                      <label>Registered on </label> <span> 20 Aug 2024</span>
                    </p>
                    {/* <p><label>DOB </label> <span> 25 Aug 1997</span></p> */}
                    <p>
                      <label>Email Address </label> <span> john@gmail.com</span>
                    </p>
                    <p>
                      <label>Phone Number </label> <span> +91 9876787656</span>
                    </p>
                  </aside>
                  <aside>
                    <p>
                      <label>Average Rating</label>{" "}
                      <span>
                        4.5 <i className="fa fa-star" aria-hidden="true" />
                      </span>
                    </p>
                    <p>
                      <label>Total Number of Bookings till today </label>{" "}
                      <span> 25</span>
                    </p>
                    <p>
                      <label>Total Spent Amount </label> <span> INR 4000</span>
                    </p>
                    <p>
                      <label>Total Rides </label> <span>25</span>
                    </p>
                    <p>
                      <label>Total Fleets Booked</label> <span>46</span>
                    </p>
                    <p>
                      <label>Upcoming Booking</label> <span>67</span>
                    </p>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane show active" id="ride-details">
          <div className="banner-coupon">
            {/* <div class="TitleBox">
                          <h4 class="Title">Ride Details</h4>  
                      </div> */}
            <div className="RiderArea">
              <div className="RiderBox">
                <div className="RiderHead">
                  <figure>
                    <img
                      src={state?.profilePic || require(
                        "../../../../../assets/images/Avatar-1.png"
                      )}
                    />
                  </figure>
                  <figcaption>
                    <div>
                      <h3>
                        {state?.fullName}{" "}
                        <span>
                          <i className="fa fa-star" aria-hidden="true" />{" "}
                          {state?.avgRating
                            ? state.avgRating.toFixed(2)
                            : "0.00"}{" "}
                        </span>
                      </h3>
                      <h4>User ID : #{state?.driver_number}</h4>
                    </div>
                  </figcaption>
                </div>
              </div>
            </div>
            <br />
            <div className="rider-footer">
              <ul>
                <li>
                  <a
                    className={local ? "active" : ""}
                    onClick={() => handleClick("local")}
                  >
                    Local Delivery
                  </a>
                </li>
                <li>
                  <a
                    className={outstation ? "active" : ""}
                    onClick={() => handleClick("outstation")}
                  >
                    Outstation Delivery{" "}
                  </a>
                </li>
                <li>
                  <a
                    className={express ? "active" : ""}
                    onClick={() => handleClick("express")}
                  >
                    Express Delivery
                  </a>
                </li>
              </ul>
            </div>
            {local && <LocalDelivery state={state} />}
            {outstation && <OutStationDelivery state={state} />}
            {express && <ExpressDelivery state={state} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary