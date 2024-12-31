import React from 'react'
import BackButton from '../BackButton';

const BookingManagementTrack = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <a className="TitleLink">
            <BackButton />
          </a>
        </div>
        <div className="DriverCountList">
          <div className="InformationBox mt-4">
            <div className="Informations track" style={{ width: "50%" }}>
              <div className="OrderHeader">
                <h1>Track Ongoing Booking</h1>
                <p>Tue, 23 Feb 2020 12:00PM • ID: 2130812309</p>
              </div>
              <div className="ProfileInfo">
                <article>
                  <div className="map">
                    <img
                      src={require("../../assets/images/track-map.png")}
                      alt="Map showing route"
                      className="map-image"
                    />
                  </div>
                </article>
              </div>
              <div className="status-list">
                <ul>
                  <li className="status-header">
                    <span className="time">
                      <i className="fa fa-car" aria-hidden="true" />
                      &nbsp; Booking Status
                    </span>
                  </li>
                  <li className="status-header">
                    <span className="time">
                      <i className="fa fa-car" aria-hidden="true" />
                      &nbsp;Time
                    </span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span className="status success">
                      <i className="fa fa-check" aria-hidden="true" />{" "}
                    </span>
                    Booking Request Placed
                  </li>
                  <li>12:00 PM</li>
                </ul>
                <ul>
                  <li>
                    <span className="status success">
                      <i className="fa fa-check" aria-hidden="true" />{" "}
                    </span>{" "}
                    Driver Assigned
                  </li>
                  <li>12:00 PM</li>
                </ul>
                <ul>
                  <li>
                    <span className="status failure">
                      <i className="fa fa-times" aria-hidden="true" />
                    </span>
                    Driver Cancelled
                  </li>
                  <li>-</li>
                </ul>
                <ul>
                  <li>
                    <span className="status success">
                      <i className="fa fa-check" aria-hidden="true" />
                    </span>
                    Driver Started Journey to Pick Up
                  </li>
                  <li>12:00 PM</li>
                </ul>
                <ul>
                  <li>
                    <span className="status success">
                      <i className="fa fa-check" aria-hidden="true" />
                    </span>{" "}
                    Driver Arrived
                  </li>
                  <li>12:00 PM</li>
                </ul>
                <ul>
                  <li>
                    <span className="status success">
                      <i className="fa fa-check" aria-hidden="true" />
                    </span>{" "}
                    Driver Started Journey to Drop-off
                  </li>
                  <li>12:00 PM</li>
                </ul>
                <ul>
                  <li> Incorrect Load Reported </li>
                  <li> -</li>
                </ul>
                <ul>
                  <li> Customer Accepted Revised Payment</li>
                  <li> -</li>
                </ul>
                <ul>
                  <li> Customer Canceled Booking </li>
                  <li> -</li>
                </ul>
                <ul>
                  <li>Customer Booked High Capacity Vehicle</li>
                  <li> -</li>
                </ul>
                <ul>
                  <li>Loading Started</li>
                  <li> -</li>
                </ul>
                <ul>
                  <li>Loading Completed</li>
                  <li> -</li>
                </ul>
                <ul>
                  <li>Unloading Started</li>
                  <li> -</li>
                </ul>
                <ul>
                  <li>Unloading Completed</li>
                  <li> -</li>
                </ul>
                <ul>
                  <li>Marked Off Completed</li>
                  <li> -</li>
                </ul>
              </div>
            </div>
            <button className="Button mt-4">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingManagementTrack