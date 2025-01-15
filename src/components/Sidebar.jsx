import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { pathname } = useLocation();
  const url = pathname.split("/")[1];
  const handleClose = () => {
    setLogoutModal(false);
  };
  return (
    <>
      <div className="SidenavBar">
        <ul>
          <li className={url == "dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <span>
                <i className="fa fa-tachometer" />
              </span>{" "}
              Dashboard
            </Link>
          </li>
          <li className={url == "userManagement" ? "active" : ""}>
            <Link to="/userManagement">
              <span>
                <i className="fa fa-user" />
              </span>{" "}
              User Management
            </Link>
          </li>
          <li>
            <a>
              <span>
                <i className="fa fa-car" />
              </span>{" "}
              Enterprise Management
            </a>
          </li>
          <li
            className={
              url.includes("bookingManagement") ? "active dropdown" : "dropdown"
            }
          >
            <a
              href="javascript:void(0)"
              id="navbardrop"
              className="dropdown-toggle"
              data-toggle="dropdown"
              // aria-expanded="false"
            >
              <span>
                <i className="fa fa-text-width" />
              </span>{" "}
              Booking Management
            </a>
            <ol className="dropdown-menu">
              <li>
                <Link
                  to="/bookingManagementTwoWheller"
                  className={
                    url == "bookingManagementTwoWheller"
                      ? "textactive"
                      : "textactive"
                  }
                >
                  Two-Wheeler
                </Link>
              </li>
              <li>
                <a>Three-Wheeler</a>
              </li>
              <li>
                <a>Four-Wheeler</a>
              </li>
              <li>
                <a>Freight Truck</a>
              </li>
            </ol>
          </li>

          <li className={url == "driverManagement" ? "active" : ""}>
            <Link to="/driverManagement">
              <span>
                <i className="fa fa-taxi" />
              </span>{" "}
              Driver Management
            </Link>
          </li>
          <li className={url == "vehicleManagement" ? "active" : ""}>
            <Link to="/vehicleManagement">
              <span>
                <i className="fa fa-taxi" />
              </span>{" "}
              Vehicle Management
            </Link>
          </li>
          <li>
            <a>
              <span>
                <i className="fa fa-user" />
              </span>{" "}
              Logistics Partner Management
            </a>
          </li>
          <li className="dropdown">
            <a
              href="javascript:void(0)"
              id="navbardrop"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <span>
                <i className="fa fa-text-width" />
              </span>{" "}
              Payment and Revenue Management
            </a>
            <ol className="dropdown-menu">
              <li>
                <a>Two-Wheeler</a>
              </li>
              <li>
                <a>Three-Wheeler</a>
              </li>
              <li>
                <a>Four-Wheeler</a>
              </li>
              <li>
                <a>Freight Truck</a>
              </li>
            </ol>
          </li>
          <li className={url == "chargingStation" ? "active" : ""}>
            <Link to="/chargingStation">
              <span>
                <i className="fa fa-money" />
              </span>{" "}
              Charging Station
            </Link>
          </li>
          <li className={url == "onlineBookingView" ? "active" : ""}>
            <Link to="/onlineBookingView">
              <span>
                <i className="fa fa-money" />
              </span>{" "}
              Online Booking View
            </Link>
          </li>
          <li className={url == "bannerManagement" ? "active" : ""}>
            <Link to="/bannerManagement">
              <span>
                <i className="fa fa-globe" />
              </span>{" "}
              Banner Management
            </Link>
          </li>
          <li>
            <a>
              <span>
                <i className="fa fa-bicycle" />
              </span>{" "}
              Reports
            </a>
          </li>
          <li className={url == "contentManagement" ? "active" : ""}>
            <Link to="/contentManagement">
              <span>
                <i className="fa fa-font" />
              </span>{" "}
              Content Management
            </Link>
          </li>
          <li className={url == "supportTicketManagement" ? "active" : ""}>
            <Link to="/supportTicketManagement">
              <span>
                <i className="fa fa-volume-control-phone" />
              </span>{" "}
              Support Ticket Management
            </Link>
          </li>
          <li className={url == "pushNotification" ? "active" : ""}>
            <Link to="/pushNotification">
              <span>
                <i className="fa fa-adn" />
              </span>
              Push Notifications
            </Link>
          </li>
          <li className={url == "subAdmin" ? "active" : ""}>
            <Link to="/subAdmin">
              <span>
                <i className="fa fa-eercast" />
              </span>{" "}
              Sub-Admin Management
            </Link>
          </li>
          <li className={url == "changeManagement" ? "active" : ""}>
            <Link to="/changeManagement">
              <span>
                <i className="fa fa-eercast" />
              </span>{" "}
              Change Management
            </Link>
          </li>
          <li className={url == "blogManagement" ? "active" : ""}>
            <Link to="/blogManagement">
              <span>
                <i className="fa fa-eercast" />
              </span>{" "}
              Blog
            </Link>
          </li>
          <li>
            <a
              onClick={() => {
                setLogoutModal(true);
              }}
            >
              <span>
                <i className="fa fa-sign-out" />
              </span>{" "}
              logout
            </a>
          </li>
        </ul>
      </div>
      {logoutModal && <LogoutModal handleClose={handleClose} />}
    </>
  );
};

export default Sidebar;
