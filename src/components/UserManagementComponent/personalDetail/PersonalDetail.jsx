import React from 'react'

const PersonalDetail = () => {
  return (
    <div className="Small-Wrapper">
      <div className="tab-content">
        <div className="tab-pane show active" id="personal-details">
          <div className="personal-details">
            {/* <div class="TitleBox">
                          <h4 class="Title">Personal Details</h4>                                  
                      </div> */}
            <div className="RiderArea">
              <div className="RiderBox">
                <div className="RiderHead">
                  <figure>
                    <img src={require("../../../assets/images/Avatar-1.png")} />
                  </figure>
                  <figcaption>
                    <div>
                      <h3>
                        Simmi Sharma{" "}
                        <span>
                          <i className="fa fa-star" aria-hidden="true" /> 4.5{" "}
                        </span>
                      </h3>
                      <h4>User ID : #432394</h4>
                    </div>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      {/* <a className="Green" href="#">
                        <i className="fa fa-pencil" />
                      </a> */}
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
        <div className="tab-pane" id="ride-details">
          <div className="banner-coupon">
            {/* <div class="TitleBox">
                          <h4 class="Title">Ride Details</h4>  
                      </div> */}
            <div className="RiderArea">
              <div className="RiderBox">
                <div className="RiderHead">
                  <figure>
                    <img src="images/Avatar-1.png" />
                  </figure>
                  <figcaption>
                    <div>
                      <h3>
                        Simmi Sharma{" "}
                        <span>
                          <i className="fa fa-star" aria-hidden="true" /> 4.5{" "}
                        </span>
                      </h3>
                      <h4>User ID : #432394</h4>
                    </div>
                  </figcaption>
                </div>
              </div>
            </div>
            <br />
            <div className="RiderArea">
              <div className="RiderBox">
                <div className="FilterArea">
                  <div className="FilterLeft">
                    <div className="form-group">
                      <label>Search</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                    <div className="form-group">
                      <label>Select From</label>
                      <select className="form-control">
                        <option value="select">--Select--</option>
                        <option value="Month">Today</option>
                        <option value="Month">This week</option>
                        <option value="Month">This month</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>From</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>To</label>
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
                      <label>&nbsp;</label>
                      <a href="#" className="Button" download="">
                        <span className="download">
                          <img src="images/download.png" alt="" />
                        </span>
                        Download Receipt
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rider-footer">
              <ul>
                <li>
                  <a
                    className="active"
                    href="user-management-ride-details-local-delivery.html"
                  >
                    Local Delivery
                  </a>
                </li>
                <li>
                  <a href="user-management-ride-details-outstation-delivery.html">
                    Outstation Delivery{" "}
                  </a>
                </li>
                <li>
                  <a href="user-management-ride-details-express-delivery.html">
                    Express Delivery
                  </a>
                </li>
              </ul>
            </div>
            <div className="TableList">
              <table style={{ width: "120%" }}>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Booking ID</th>
                    <th>Driver ID</th>
                    <th>Driver Name</th>
                    <th>Vehicle ID</th>
                    <th>Assigned Vehicle</th>
                    <th>Total Cost</th>
                    <th>Booking Status</th>
                    <th>Booking Date</th>
                    <th>Pickup Location</th>
                    <th>Drop Location</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>OR#11</td>
                    <td>DR-01</td>
                    <td>John</td>
                    <td>V-123</td>
                    <td>UP-12-1010</td>
                    <td>200</td>
                    <td>
                      <a href="user-management-ride-details-completed.html">
                        <span className="Green">Completed</span>
                      </a>
                    </td>
                    <td>12-12-2024</td>
                    <td>Delhi</td>
                    <td>Agra</td>
                    <td>Mode 1</td>
                    <td>Completed</td>
                    <td>
                      <div className="Actions">
                        <a className="Blue" href="">
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>OR#11</td>
                    <td>DR-01</td>
                    <td>John</td>
                    <td>V-123</td>
                    <td>UP-12-1010</td>
                    <td>200</td>
                    <td>
                      <a href="user-management-ride-details-ongoing.html">
                        <span className="Yellow">Ongoing</span>
                      </a>
                    </td>
                    <td>12-12-2024</td>
                    <td>Delhi</td>
                    <td>Agra</td>
                    <td>Mode 1</td>
                    <td>Completed</td>
                    <td>
                      <div className="Actions">
                        <a className="Blue" href="">
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>OR#11</td>
                    <td>DR-01</td>
                    <td>John</td>
                    <td>V-123</td>
                    <td>UP-12-1010</td>
                    <td>200</td>
                    <td>
                      <a href="user-management-ride-details-cancelled.html">
                        <span className="Red">Cancelled</span>
                      </a>
                    </td>
                    <td>12-12-2024</td>
                    <td>Delhi</td>
                    <td>Agra</td>
                    <td>Mode 1</td>
                    <td>Completed</td>
                    <td>
                      <div className="Actions">
                        <a className="Blue" href="">
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="PaginationBox">
              <div className="PaginationLeft">
                <p>
                  Total Records : <span>200</span>
                </p>
              </div>
              <div className="PaginationRight">
                <ul>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fa fa-angle-double-left" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fa fa-angle-left" />
                    </a>
                  </li>
                  <li className="active">
                    <a href="javascript:void(0);">1</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">2</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">3</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fa fa-angle-right" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fa fa-angle-double-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetail