import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  driverStatus,
  fetchP2pDriverList,
} from "../../../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { toastService } from "../../../../../utils/toastify";
import { canPerformAction } from "../../../../../utils/deniedAccess";
import ZoomEffect from "../../../../ZoomEffect";

const ProfileSummary = ({ state }) => {
  const [status, setStatus] = useState();
    const [imageModal, setImageModal] = useState(false);
    const [image, setImage] = useState("");
  const dispatch = useDispatch();
  console.log({ state });
  useEffect(() => {
    setStatus(state?.userStatus);
  }, [state]);
  console.log({ state });
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(driverStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        setStatus(checked);
        dispatch(fetchP2pDriverList({ page: 1 }));
      } else {
        toastService.error("status update failed");
      }
    });
  };
  const [location, setLocation] = useState(false);
  const getAddressFromLatLng = async (lat, lng) => {
    const API_KEY = "AIzaSyAy14lzjUql2GchyraO4bHHj4oAwW_GH3Y";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        return data?.results?.[0]?.formatted_address || "Address not found";
      } else {
        return "Location not found";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching location";
    }
  };

  useEffect(() => {
    if (state.location.coordinates) {
      getAddressFromLatLng(
        state?.location?.coordinates?.[1],
        state?.location?.coordinates?.[0]
      )
        .then((location) => {
          setLocation(location);
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  }, []);
   const handleViewImage = (image) => {
     setImage(image);
     setImageModal(true);
   };
   const handleCloseImageModal = () => {
     setImageModal(false);
     setImage("");
   };
  console.log({ location });
  return (
    <>
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
                      <i className="fa fa-star" aria-hidden="true" />{" "}
                      {state?.avgRating ? state.avgRating.toFixed(2) : "0.00"}
                    </span>
                  </h3>
                  <p>Driver ID: {state?.driver_number}</p>
                </figcaption>
                {canPerformAction("Driver Management") && (
                  <div className="Actions">
                    <a href="#">
                      <img src="images/download.png" alt="" />
                    </a>
                    <label className="Switch">
                      <input
                        type="checkbox"
                        checked={status}
                        onChange={(e) => handleChecked(e, state?._id)}
                      />
                      <span className="slider" />
                    </label>
                    {/* <a class="Green" href="#">
                <i class="fa fa-pencil"></i>
              </a> */}

                    {/* <div class="Button"> */}
                    {/* <a className="Button mt-4" href="">
                    Add Money
                  </a> */}
                    {/* </div> */}
                  </div>
                )}
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
                          <span
                            style={
                              {
                                // marginLeft: "50px",
                                // paddingLeft: "150px",
                                // marginTop: "-20px",
                              }
                            }
                          >
                            {location}
                          </span>
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
                        {state?.driverType == "P2P" && (
                          <p>
                            <strong>Approved on</strong>
                            <span>
                              {moment(state?.approvedOn).format("DD-MM-YYYY")}
                            </span>
                          </p>
                        )}
                        {state?.driverType == "P2P" && (
                          <p>
                            <strong>Approved By</strong>
                            <span>{state?.approvedBy}</span>
                          </p>
                        )}
                      </aside>
                      <aside>
                        <p>
                          <strong>Total No. of Booking</strong>
                          <span>{state?.totalRides}</span>
                        </p>
                        <p>
                          <strong>Total No. of Local Delivery</strong>
                          <span>{state?.localRideCount}</span>
                        </p>
                        <p>
                          <strong>Total No. of Out Station Delivery</strong>
                          <span>{state?.outstationRideCount}</span>
                        </p>
                        <p>
                          <strong>Total No. of Express Delivery</strong>
                          <span>{state?.expressRideCount}</span>
                        </p>
                        <p>
                          <strong>Total Cancelled Delivery</strong>
                          <span>{state?.cancelCount}</span>
                        </p>
                        <p>
                          <strong>Last Location</strong>
                          <span
                            style={
                              {
                                // marginLeft: "50px",
                                // paddingLeft: "150px",
                                // marginTop: "-20px",
                              }
                            }
                          >
                            {location}
                          </span>
                        </p>
                        {/* <p>
                        <strong>Current Location</strong>
                        <span>-</span>
                      </p> */}
                        <p>
                          <strong>Earnings</strong>
                          <span>{state?.totalTripAmount}</span>
                        </p>
                        {/* <p>
                        <strong>Last Time Online</strong>
                        <span>-</span>
                      </p> */}
                        {/* <p>
                        <strong>Average Waiting Time for pickup</strong>
                        <span>-</span>
                      </p> */}
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
                          <strong>Driving License Number</strong>
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
                            <figure
                              className="mb-2"
                              style={{
                                marginTop: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleViewImage(
                                  state?.driverDocumentData?.[0]?.dlFront
                                )
                              }
                            >
                              <img
                                src={state?.driverDocumentData?.[0]?.dlFront}
                                alt="no dl img"
                              />
                            </figure>
                            <figure
                              style={{
                                marginTop: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleViewImage(
                                  state?.driverDocumentData?.[0]?.dlBack
                                )
                              }
                            >
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
                          <strong>Aadhar Card Number</strong>
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
                            <figure
                              className="mb-2"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleViewImage(
                                  state?.driverDocumentData?.[0]?.aadharFront
                                )
                              }
                            >
                              <img
                                src={
                                  state?.driverDocumentData?.[0]?.aadharFront
                                }
                              />
                            </figure>
                            <figure
                              style={{
                                marginTop: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleViewImage(
                                  state?.driverDocumentData?.[0]?.aadharBack
                                )
                              }
                            >
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
                {state?.driverType == "ILINE" &&
                  canPerformAction("Driver Management") && (
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
                          state={state}
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
                            {state?.vechicleData?.[0]?.vehicleNumberPlate ||
                              state?.vehicleData?.[0]?.vehicleNumberPlate ||
                              "N/A"}
                          </span>
                        </p>
                        <p>
                          <strong>Vehicle Type </strong>
                          <span>
                            {state?.vechicleData?.[0]?.vehicleType ||
                              state?.vehicleData?.[0]?.vehicleType ||
                              "N/A"}
                          </span>
                        </p>
                        {state?.driverType == "ILINE" && (
                          <p>
                            <strong>Assigned on </strong>
                            <span>
                              {state?.vehicleData?.[0]?.assignOn
                                ? moment(
                                    state?.vehicleData?.[0]?.assignOn
                                  ).format("DD-MM-YYYY")
                                : "-"}
                            </span>
                          </p>
                        )}
                        {state?.driverType == "ILINE" && (
                          <p>
                            <strong> Assigned by </strong>
                            <span>{state?.vehicleData?.[0]?.assignBy}</span>
                          </p>
                        )}
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
      {imageModal && (
        <ZoomEffect image={image} handleClose={handleCloseImageModal} />
      )}
    </>
  );
};

export default ProfileSummary;
