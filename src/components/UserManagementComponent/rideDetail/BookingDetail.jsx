import React from 'react'
import BackButton from '../../BackButton';
import { useLocation } from 'react-router-dom';

const BookingDetail = () => {
   const { state } = useLocation();
   console.log({ state });
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        {/* <div class="backarrow">
    <a href="customer-management-details.html">
      <i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back
    </a>
  </div> */}
        <div className="commenone">
          <div className="CommonTabs">
            <BackButton/>
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <a href="#" className="Button" download="">
              <span className="download">
                <img src="images/download.png" alt="" />
              </span>
              Download CSV
            </a>
          </div>
        </div>
        <div className="ride-details">
          <div className="Small-Wrapper">
            <div className="OrderHeader">
              <h1>Booking Details</h1>
              <p>Tue, 23 Feb 2020 12:00PM • ID: 2130812309</p>
            </div>
            <div className="status Green">Completed</div>
            <div className="row">
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Driver Details</h3>
                  <div className="BookingUser">
                    <figure>
                      <img
                        src={require("../../../assets/images/Avatar-1.png")}
                      />
                    </figure>
                    <figcaption>
                      <h5>
                        vikash kumar <span> DRIV-91 </span>
                        <br />
                        <span>
                          4.5 <i className="fa fa-star" aria-hidden="true" />
                        </span>
                      </h5>
                      <p>Phone Number : 9955119955</p>
                    </figcaption>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Customer Details</h3>
                  <div className="BookingUser">
                    <figure>
                      <img
                        src={require("../../../assets/images/Avatar-1.png")}
                      />
                    </figure>
                    <figcaption>
                      <h5>
                        Sachin Kumar <span> USER-57 </span>
                        <br />
                        <span>
                          4.5 <i className="fa fa-star" aria-hidden="true" />
                        </span>
                      </h5>
                      <p>Phone Number : 1133113311</p>
                    </figcaption>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Vehicle Details</h3>
                  <div className="BookingUser">
                    <figure>
                      <img src={require("../../../assets/images/car.png")} />
                    </figure>
                    <figcaption>
                      <h5>
                        DL-08-GH-8765 <span> SUV </span>
                      </h5>
                      <p>
                        Vehicle ID : <span>VEHI-176</span>
                      </p>
                      <p>Loading and Unloading Time</p>
                    </figcaption>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Pickup Customer Details</h3>
                  <div className="BookingUser">
                    <figure>
                      <img
                        src={require("../../../assets/images/Avatar-1.png")}
                      />
                    </figure>
                    <figcaption>
                      <h5>
                        Akshit <span> DRIV-91 </span>
                        <br />
                        <span>
                          4.5 <i className="fa fa-star" aria-hidden="true" />
                        </span>
                      </h5>
                      <p>Phone Number : 9955119955</p>
                    </figcaption>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Order Details</h3>
                  <div className="PriceBox">
                    <aside>
                      <p>
                        Package Size{" "}
                        <span>
                          <i className="fa fa-inr" /> 15{" "}
                        </span>
                      </p>
                      <p>
                        Weight{" "}
                        <span>
                          <i className="fa fa-inr" /> 10Kg
                        </span>
                      </p>
                      <p>
                        Cargo Volume{" "}
                        <span>
                          <i className="fa fa-inr" /> 210
                        </span>
                      </p>
                      <p>
                        Special Handling Instructions
                        <span>
                          <i className="fa fa-inr" /> None{" "}
                        </span>
                      </p>
                    </aside>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Price Breakup</h3>
                  <div className="PriceBox">
                    <aside>
                      <p>
                        Trip Charges{" "}
                        <span>
                          <i className="fa fa-inr" /> 200{" "}
                        </span>
                      </p>
                      <p>
                        Coupon Applied (RIDE50)
                        <span>
                          <i className="fa fa-inr" /> 25
                        </span>
                      </p>
                      <p>
                        Driver Share{" "}
                        <span>
                          <i className="fa fa-inr" /> 175
                        </span>
                      </p>
                      <p>
                        Total Commission
                        <span>
                          <i className="fa fa-inr" /> 25{" "}
                        </span>
                      </p>
                    </aside>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="BookingBox">
                  <h3>Pickup &amp; Drop Location</h3>
                  <div className="PickupBox">
                    <ul>
                      <li>
                        <span className="Circle" />
                        <label>
                          H146, Block H, Sector 63, Noida, Uttar Pradesh 201301,
                          India
                        </label>
                        <strong>Pick up Oct 7, 2024 &amp; 6:20 PM</strong>
                      </li>
                      <li>
                        <p>
                          <span>Oct 7, 2024 </span>
                          <span>2 Min , (1.00 km) </span>
                        </p>
                      </li>
                      <li>
                        <span className="Circle" />
                        <label>
                          H146, Block H, Sector 63, Noida, Uttar Pradesh 201301,
                          India
                        </label>
                        <strong>Drop off Oct 7, 2024 &amp; 6:22 PM </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="BookingBox">
                      <h3>Drop Off Customer Details</h3>
                      <div className="BookingUser">
                        <figure>
                          <img
                            src={require("../../../assets/images/Avatar-1.png")}
                          />
                        </figure>
                        <figcaption>
                          <h5>
                            Akshit <span> DRIV-91 </span>
                            <br />
                            <span>
                              4.5{" "}
                              <i className="fa fa-star" aria-hidden="true" />
                            </span>
                          </h5>
                          <p>Phone Number : 9955119955</p>
                        </figcaption>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="BookingBox">
                      <h3>
                        Customer Rating
                        <span>
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                        </span>
                      </h3>
                      <div className="BookingUser">
                        {/* <figure><img src="images/Avatar-1.png"></figure> */}
                        <figcaption>
                          {/* <h5>Akshit <span> DRIV-91 </span></h5> */}
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                        </figcaption>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="BookingBox">
                      <h3>Penalty Details</h3>
                      <div className="PriceBox">
                        <aside>
                          <p>
                            Extra Weight
                            <span>
                              <i className="fa fa-inr" /> 50Kg{" "}
                            </span>
                          </p>
                          <p>
                            Upload Time
                            <span>
                              <i className="fa fa-inr" /> 1 Hour
                            </span>
                          </p>
                          <p>
                            Unload Time
                            <span>
                              <i className="fa fa-inr" /> 1 Hour
                            </span>
                          </p>
                        </aside>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="BookingBox">
                      <h3 />
                      <div className="PriceBox">
                        <aside>
                          <p>
                            Payment Method
                            <span>
                              <i className="fa fa-inr" /> Cash/Online/Wallet
                            </span>
                          </p>
                          <p>
                            Payment Status
                            <span>
                              <i className="fa fa-inr" /> Completed
                            </span>
                          </p>
                          <p>
                            Transaction ID
                            <span>
                              <i className="fa fa-inr" /> 3259685137246973
                            </span>
                          </p>
                        </aside>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="BookingBox">
                  <h3>Direction</h3>
                  <div className="PriceBox">
                    {/* <aside> */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.2130185487927!2d85.79974957506127!3d20.332816781148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909a1d8fa6a1f%3A0x857999191c07fc50!2sSatyakant%20Enclave%20GA%20621!5e0!3m2!1sen!2sin!4v1731402130742!5m2!1sen!2sin"
                      width="100%"
                      height={450}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* </aside>  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail