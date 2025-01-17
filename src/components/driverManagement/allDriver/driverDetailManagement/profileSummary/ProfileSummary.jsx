import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

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
                <p>Driver ID: {state?.driver_number}</p>
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
                        <span>{state?.driver_number}</span>
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
                        <span>-</span>
                      </p>
                      <p>
                        <strong>Approved By</strong>
                        <span>-</span>
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
                        <span>-</span>
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
                          <figure className="mb-2">
                            <img
                              src={state?.driverDocumentData?.[0]?.dlFront}
                              alt="no dl img"
                            />
                          </figure>
                          <figure>
                            <img
                              src={state?.driverDocumentData?.[0]?.dlBack}
                              alt="no dl img"
                            />
                          </figure>
                        </li>
                      </ul>
                      <p>
                        <strong>Expiry</strong>
                        <span>
                          {moment(
                            state?.driverDocumentData?.[0]?.expiryDate
                          ).format("DD-MM-YYYY")}
                        </span>
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
                        <span>
                          {state?.driverDocumentData?.[0]?.aadharNumber}
                        </span>
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
                          <figure className="mb-2">
                            <img
                              src={state?.driverDocumentData?.[0]?.aadharFront}
                            />
                          </figure>
                          <figure>
                            <img
                              src={state?.driverDocumentData?.[0]?.aadharBack}
                            />
                          </figure>
                        </li>
                      </ul>
                      {/* <p>
                        <strong>Expiry</strong>
                        <span>10/09/2023</span>
                      </p> */}
                    </aside>
                  </div>
                </div>
              </div>
            </div>
            <div className="InformationBox mt-4">
              {state?.driverType == "ILINE" && (
                <div className="TitleBox">
                  <h4 className="Title">3.Assign Vehicle</h4>
                  <div className="TitleLink">
                    <Link
                      to="/driverManagement/assignVechile"
                      className="TitleLink"
                      state={state}
                    >
                      Assign
                    </Link>
                    &nbsp;
                    <Link
                      to="/driverManagement/assignVechileHistory"
                      className="TitleLink"
                    >
                      History
                    </Link>
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
                        <span>
                          {state?.vehicleData?.[0]?.vehicleNumberPlate}
                        </span>
                      </p>
                      <p>
                        <strong>Vehicle Type </strong>
                        <span>{state?.vehicleData?.[0]?.vehicleType}</span>
                      </p>
                      <p>
                        <strong>Assigned on </strong>
                        <span>-</span>
                      </p>
                      <p>
                        <strong> Assigned by </strong>
                        <span>-</span>
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
    </div>
  );
}

export default ProfileSummary