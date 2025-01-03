import moment from 'moment';
import React from 'react'

const ProfileSummary = ({state}) => {
  console.log({state});
  
  return (
    <div className="tab-content">
      <div className="tab-pane show active" id="profile-summary">
        <div className="personal-details">
          <div className="Small-Wrapper">
            <div className="BusinessPersonal">
              <figure>
                <img
                  src={
                    state?.profilePic ||
                    require("../../../../../assets/images/Avatar-1.png")
                  }
                />
              </figure>
              <figcaption>
                <h3>
                  {state?.fullName}
                  <span>
                    <i className="fa fa-star" aria-hidden="true" /> 4.5
                  </span>
                </h3>
                <p>Driver ID: {state?.dlNumber}</p>
              </figcaption>
              <div className="Actions">
                <a href="#">
                  <img src="images/download.png" alt="" />
                </a>
                <label className="Switch">
                  <input type="checkbox" />
                  <span className="slider" />
                </label>
                {/* <a class="Green" href="#">
                <i class="fa fa-pencil"></i>
              </a> */}
                <a
                  className="Red"
                  data-toggle="modal"
                  data-target="#BusinessDeleteModal"
                >
                  <i className="fa fa-trash" />
                </a>
                {/* <div class="Button"> */}
                <a className="Button mt-4" href="">
                  Add Money
                </a>
                {/* </div> */}
              </div>
            </div>
            <div className="InformationBox">
              <div className="TitleBox">
                <h4 className="Title">1.Profile Information</h4>
              </div>
              <div className="Informations">
                <div className="ProfileInfo">
                  <article>
                    <aside>
                      <p>
                        <strong>Driver Name</strong>
                        <span>Mr. {state?.fullName} </span>
                      </p>
                      <p>
                        <strong>Driver ID</strong>
                        <span>{state?.dlNumber}</span>
                      </p>
                      <p>
                        <strong>Driver Phone Number</strong>
                        <span>{state?.phoneNumber}</span>
                      </p>
                      <p>
                        <strong>Driver Email ID</strong>
                        <span>{state?.email}</span>
                      </p>
                      <p>
                        <strong>Location</strong>
                        <span>Agra</span>
                      </p>
                      <p>
                        <strong>Gender</strong>
                        <span>{state?.gender}</span>
                      </p>
                      <p>
                        <strong>Registered on</strong>
                        <span>
                          {moment(state?.createdAt).format("DD-MM-YYYY")}
                        </span>
                      </p>
                      <p>
                        <strong>DOB</strong>
                        <span>{moment(state?.dob).format("DD-MM-YYYY")}</span>
                      </p>
                      <p>
                        <strong>Approved on</strong>
                        <span>12-03-2023</span>
                      </p>
                      <p>
                        <strong>Approved By</strong>
                        <span>Sub-Admin Name, Sub-Admin-ID</span>
                      </p>
                    </aside>
                    <aside>
                      <p>
                        <strong>Total No. of Booking</strong>
                        <span>0</span>
                      </p>
                      <p>
                        <strong>Total No. of Local Delivery</strong>
                        <span>0</span>
                      </p>
                      <p>
                        <strong>Total No. of Out Station Delivery</strong>
                        <span>0</span>
                      </p>
                      <p>
                        <strong>Total No. of Express Delivery</strong>
                        <span>0</span>
                      </p>
                      <p>
                        <strong>Total Cancelled Delivery</strong>
                        <span>0</span>
                      </p>
                      <p>
                        <strong>Last Location</strong>
                        <span>Agra UP</span>
                      </p>
                      <p>
                        <strong>Current Location</strong>
                        <span>-</span>
                      </p>
                      <p>
                        <strong>Earnings</strong>
                        <span>-</span>
                      </p>
                      <p>
                        <strong>Last Time Online</strong>
                        <span>-</span>
                      </p>
                      <p>
                        <strong>Average Waiting Time for pickup</strong>
                        <span>-</span>
                      </p>
                    </aside>
                  </article>
                </div>
              </div>
            </div>
            <div className="TitleBox mt-4">
              <h4 className="Title">2.Documents</h4>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="InformationBox">
                  <h3>Driving License Details</h3>
                  <div className="VehicleDocument">
                    <aside>
                      <p>
                        <strong>Registration Certificate Number</strong>
                        <span>{state?.dlNumber}</span>
                      </p>
                      <p>
                        <strong className="Green">
                          Verified &nbsp; <i className="fa fa-check-circle" />
                        </strong>
                      </p>
                    </aside>
                    <aside>
                      <ul>
                        <li>
                          <span>Document</span>
                          <figure>
                            <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                          </figure>
                        </li>
                      </ul>
                      <p>
                        <strong>Expiry</strong>
                        <span>10/09/2023</span>
                      </p>
                    </aside>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="InformationBox">
                  <h3>Aadhar Details</h3>
                  <div className="VehicleDocument">
                    <aside>
                      <p>
                        <strong>Registration Certificate Number</strong>
                        <span>{state?.aadharNumber}</span>
                      </p>
                      <p>
                        <strong className="Green">
                          Verified &nbsp; <i className="fa fa-check-circle" />
                        </strong>
                      </p>
                    </aside>
                    <aside>
                      <ul>
                        <li>
                          <span>Document</span>
                          <figure>
                            <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                          </figure>
                        </li>
                      </ul>
                      <p>
                        <strong>Expiry</strong>
                        <span>10/09/2023</span>
                      </p>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
            <div className="InformationBox mt-4">
              {state?.driverType == "ILINE" && (
                <div className="TitleBox">
                  <h4 className="Title">3.Drivers License</h4>
                  <div className="TitleLink">
                    <a
                      className="TitleLink"
                      href="driver-management-assign-vehicle.html"
                    >
                      Assign
                    </a>
                    &nbsp;
                    <a
                      className="TitleLink"
                      href="driver-management-vehicle-history.html"
                    >
                      History
                    </a>
                  </div>
                </div>
              )}
              <div className="Informations">
                <div className="ProfileInfo">
                  <h3 className="mb-4">Current Assigned Vehicle Details</h3>
                  <article>
                    <aside>
                      <p>
                        <strong>Vehicle Number </strong>
                        <span>{state?.vehicleNumber}</span>
                      </p>
                      <p>
                        <strong>Vehicle Type </strong>
                        <span>4 Wheeler</span>
                      </p>
                      <p>
                        <strong>Assigned on </strong>
                        <span>12/09/2024</span>
                      </p>
                      <p>
                        <strong> Assigned by </strong>
                        <span>Admin</span>
                      </p>
                    </aside>
                  </article>
                </div>
              </div>
            </div>
            <div className="InformationBox mt-4">
              <div className="TitleBox">
                <h4 className="Title">4.EV Details</h4>
              </div>
              <div className="Informations">
                <div className="ProfileInfo">
                  <p className="mb-4">
                    Details will be fetched from API EV and Displayed in this
                    section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pane" id="booking-summary">
        <div className="banner-coupon">
          <div className="RiderArea">
            <div className="RiderBox">
              <div className="RiderHead">
                <figure>
                  <img src="images/Avatar-1.png" />
                </figure>
                <figcaption>
                  <div>
                    <h3>
                      Simmi Sharma
                      <span>
                        <i className="fa fa-star" aria-hidden="true" /> 4.5
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
                <div className="form-group">
                  <label>Search</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                  />
                </div>
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Timeframe</label>
                  <select className="form-control">
                    <option>Select</option>
                    <option value="Today">Today</option>
                    <option value="Week">This Week</option>
                    <option value="Month">This Month</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>&nbsp;</label>
                  <button className="Button">Apply</button>
                  <button className="Button Cancel">
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rider-footer">
            <ul>
              <li>
                <a className="active" href="#">
                  Local Delivery
                </a>
              </li>
              <li>
                <a href="driver-management-outstation-delivery.html">
                  Outstation Delivery{" "}
                </a>
              </li>
              <li>
                <a href="driver-management-express-delivery.html">
                  Express Delivery
                </a>
              </li>
            </ul>
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
                      <a href="driver-management-ride-details-completed.html">
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
                      <a href="driver-management-ride-details-ongoing.html">
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
                      <a href="driver-management-ride-details-cancelled.html">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSummary