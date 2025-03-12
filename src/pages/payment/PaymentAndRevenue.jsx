import React, { useState } from "react";
import TotalRevenueTab from "../../components/payment/TotalRevenueTab";
import TotalRevenuefromILineDriverTab from "./TotalRevenuefromILineDriverTab";
import TotalRevenuefromP2pDriverTab from "./TotalRevenuefromP2pDriverTab";
import TotalPaymentfromP2pDriverTab from "./TotalPaymentfromP2pDriverTab";
import CommisionModal from "../../components/payment/CommisionModal";
import { useLocation } from "react-router-dom";
import { canPerformAction } from "../../utils/deniedAccess";
import { useDispatch, useSelector } from "react-redux";
import { activeTabFunc } from "../../features/slices/bookingManagementSlice";
import {
  activePaymentTabFunc,
  handleTotalRevenuePage,
} from "../../features/slices/payment";
import DriverPayout from "./DriverPayout";

const PaymentAndRevenue = () => {
  const [showState, setShowState] = useState({
    setCommision: false,
  });
  const { setCommision } = showState;
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { activePaymentTab } = useSelector((state) => {
    return state?.payment;
  });
  const {
    totalRevenue,
    totalRevenuefromILineDriver,
    totalRevenuefromP2pDriver,
    totalPaymentfromP2pDriver,
    driverPayoutTab,
  } = activePaymentTab;
  console.log({ activePaymentTab });

  const handleClick = (name) => {
   
    dispatch(
      activePaymentTabFunc({
        totalRevenue: false,
        totalRevenuefromILineDriver: false,
        totalRevenuefromP2pDriver: false,
        totalPaymentfromP2pDriver: false,
        driverPayoutTab: false,
        [name]: true,
      })
    );
  };
  const handleClose = () => {
    setShowState((prev) => ({
      ...prev,
      setCommision: false,
    }));
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Payment Management</h4>
            {canPerformAction("Payment & Revenue Management") && (
              <a
                className="TitleLink"
                onClick={() => {
                  setShowState((prev) => ({
                    ...prev,
                    setCommision: true,
                  }));
                }}
              >
                Set Commission{" "}
              </a>
            )}
          </div>
          <div className="SettingsTabs mt-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={totalRevenue ? "active nav-link" : "nav-link"}
                  onClick={() => handleClick("totalRevenue")}
                >
                  Total Revenue
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    totalRevenuefromILineDriver ? "active nav-link" : "nav-link"
                  }
                  onClick={() => handleClick("totalRevenuefromILineDriver")}
                >
                  Total Revenue from i-Line Driver
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    totalRevenuefromP2pDriver ? "active nav-link" : "nav-link"
                  }
                  onClick={() => handleClick("totalRevenuefromP2pDriver")}
                >
                  Total Revenue from P2P Driver
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={driverPayoutTab ? "active nav-link" : "nav-link"}
                  onClick={() => handleClick("driverPayoutTab")}
                >
                  Driver Payout
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className={
                    totalPaymentfromP2pDriver ? "active nav-link" : "nav-link"
                  }
                  onClick={() => handleClick("totalPaymentfromP2pDriver")}
                >
                  Total Payment To P2P Driver{" "}
                </a>
              </li> */}
              {/* <li className="nav-item">
                <a className={totalRevenue ? " nav-link" : "nav-link"}>
                  Total Commission Earned from P2P Drivers{" "}
                </a>
              </li> */}
            </ul>
            <div className="tab-content">
              {totalRevenue && <TotalRevenueTab categoryId={state} />}
              {totalRevenuefromILineDriver && (
                <TotalRevenuefromILineDriverTab categoryId={state} />
              )}
              {totalRevenuefromP2pDriver && (
                <TotalRevenuefromP2pDriverTab categoryId={state} />
              )}
              {totalPaymentfromP2pDriver && (
                <TotalPaymentfromP2pDriverTab categoryId={state} />
              )}
              {driverPayoutTab && <DriverPayout categoryId={state} />}
            </div>
          </div>
        </div>
      </div>
      {setCommision && <CommisionModal handleClose={handleClose} />}
    </>
  );
};

export default PaymentAndRevenue;
