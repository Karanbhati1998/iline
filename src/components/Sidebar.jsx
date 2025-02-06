import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { getVechileCategory } from "../features/slices/vechileManagement/vechileCategory";
import { useDispatch, useSelector } from "react-redux";
import { denyAccess } from "../utils/deniedAccess";

const Sidebar = () => {
  const [catId, setCatId] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = pathname.split("/")[1];
  const handleClose = () => {
    setLogoutModal(false);
  };

  const { VechileCategories } = useSelector((state) => {
    return state?.vechileCategory;
  });
  console.log({ VechileCategories });

  useEffect(() => {
    dispatch(getVechileCategory({ limit: 99999 })).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        setCatId(res?.payload?.result?.[0]?.paginationData?.[0]?._id);
      }
    });
  }, []);
  useEffect(() => {
    if (catId) {
      // Call your API here using the updated `catId`
      console.log("API Call with catId:", catId);
    }
  }, [catId]);
  const handleNavigate = (id) => {
    navigate("/bookingManagementTwoWheller", { state: id });
    setCatId(id);
  };
  const handleNavigateToPayment = (id) => {
    navigate("/paymentAndRevenueManagemnt", { state: id });
    setCatId(id);
  };
  return (
    <>
      <div className="SidenavBar">
        <ul>
          {denyAccess("Dashboard") && (
            <li className={url == "dashboard" ? "active" : ""}>
              <Link to="/dashboard">
                <span>
                  <i className="fa fa-tachometer" />
                </span>{" "}
                Dashboard
              </Link>
            </li>
          )}
          {denyAccess("User Management") && (
            <li className={url == "userManagement" ? "active" : ""}>
              <Link to="/userManagement">
                <span>
                  <i className="fa fa-user" />
                </span>{" "}
                User Management
              </Link>
            </li>
          )}
          {
            <li>
              <a>
                <span>
                  <i className="fa fa-car" />
                </span>{" "}
                Enterprise Management
              </a>
            </li>
          }
          {denyAccess("Booking Management") && (
            <li
              className={
                url.includes("bookingManagement")
                  ? "active dropdown"
                  : "dropdown"
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
                {VechileCategories?.result?.[0]?.paginationData?.map((res) => {
                  return (
                    <li key={res?._id}>
                      <a
                        className={catId == res?._id ? "textactive" : ""}
                        onClick={() => {
                          handleNavigate(res?._id);
                        }}
                      >
                        {res?.categoryName}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </li>
          )}
          {denyAccess("Driver Management") && (
            <li className={url == "driverManagement" ? "active" : ""}>
              <Link to="/driverManagement">
                <span>
                  <i className="fa fa-taxi" />
                </span>{" "}
                Driver Management
              </Link>
            </li>
          )}
          {denyAccess("Vehicle Management") && (
            <li className={url == "vehicleManagement" ? "active" : ""}>
              <Link to="/vehicleManagement">
                <span>
                  <i className="fa fa-taxi" />
                </span>{" "}
                Vehicle Management
              </Link>
            </li>
          )}
          <li>
            <a>
              <span>
                <i className="fa fa-user" />
              </span>{" "}
              Logistics Partner Management
            </a>
          </li>

          <li
            className={
              url.includes("paymentAndRevenueManagemnt")
                ? "active dropdown"
                : "dropdown"
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
              Payment and Revenue Management
            </a>
            <ol className="dropdown-menu">
              {VechileCategories?.result?.[0]?.paginationData?.map((res) => {
                return (
                  <li key={res?._id}>
                    <a
                      className={catId == res?._id ? "textactive" : ""}
                      onClick={() => {
                        handleNavigateToPayment(res?._id);
                      }}
                    >
                      {res?.categoryName}
                    </a>
                  </li>
                );
              })}
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
          {denyAccess("Content Management") && (
            <li className={url == "contentManagement" ? "active" : ""}>
              <Link to="/contentManagement">
                <span>
                  <i className="fa fa-font" />
                </span>{" "}
                Content Management
              </Link>
            </li>
          )}
          {denyAccess("Support Ticket Management") && (
            <li className={url == "supportTicketManagement" ? "active" : ""}>
              <Link to="/supportTicketManagement">
                <span>
                  <i className="fa fa-volume-control-phone" />
                </span>{" "}
                Support Ticket Management
              </Link>
            </li>
          )}
          {denyAccess("Push Notifications") && (
            <li className={url == "pushNotification" ? "active" : ""}>
              <Link to="/pushNotification">
                <span>
                  <i className="fa fa-adn" />
                </span>
                Push Notifications
              </Link>
            </li>
          )}
          {denyAccess("Sub-Admin Management") && (
            <li className={url == "subAdmin" ? "active" : ""}>
              <Link to="/subAdmin">
                <span>
                  <i className="fa fa-eercast" />
                </span>{" "}
                Sub-Admin Management
              </Link>
            </li>
          )}
          <li className={url == "changeManagement" ? "active" : ""}>
            <Link to="/changeManagement">
              <span>
                <i className="fa fa-eercast" />
              </span>{" "}
              Change Management
            </Link>
          </li>
          {
            denyAccess("Blog") &&
          <li className={url == "blogManagement" ? "active" : ""}>
            <Link to="/blogManagement">
              <span>
                <i className="fa fa-eercast" />
              </span>{" "}
              Blog
            </Link>
          </li>
          }
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
