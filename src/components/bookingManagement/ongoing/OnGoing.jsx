import React, { useEffect, useRef, useState } from "react";
import BookingManagementComponent from "../BookingManagementComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOngoingBookingList,
  getOngoingBookingList,
  handleOnGoingPage,
} from "../../../features/slices/bookingManagementSlice";
import { Link, useLocation } from "react-router-dom";
import { toastService } from "../../../utils/toastify";
import CommonPagination from "../../CommonPagination";
import moment from "moment";
import ExportToExcel from "../../ExportToExcel";
const initialState = {
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  id: "",
};
const OnGoing = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, id } = iState;
  const dispatch = useDispatch();

  const { OngoingBookingList, ongoingPage } = useSelector((state) => {
    return state.bookingManagement;
  });
  const userRef = useRef();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const data = {
      search,
      startDate,
      endDate,
      timeframe,
      limit: 999999,
      categoryId,
    };
    if (categoryId) {
      dispatch(getAllOngoingBookingList(data)).then((res) => {
        if (res?.payload?.code == 200) {
          console.log({ res });
          setAllData(res?.payload);
        }
      });
    }
  }, [timeframe, endDate, search, startDate, categoryId]);
  console.log({ allData });

  useEffect(() => {
    if (categoryId) {
      dispatch(
        getOngoingBookingList({
          categoryId,
          page: ongoingPage,
        })
      );
    }
  }, [categoryId]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getOngoingBookingList({
            categoryId,
            search: search.trim(),
            timeframe,
          })
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch, categoryId]);

  const handlePageChange = (page) => {
    dispatch(handleOnGoingPage(page));
    dispatch(
      getOngoingBookingList({ categoryId, page, timeframe, startDate, endDate })
    );
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getOngoingBookingList({ categoryId, page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      categoryId,
    };
    dispatch(getOngoingBookingList(data));
  };
  console.log({ OngoingBookingList });

  return (
    <div className="Small-Wrapper">
      <div className="FilterArea">
        <div className="FilterLeft">
          <div className="form-group">
            <label>Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              name="search"
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <select
              className="form-control"
              name="timeframe"
              onChange={handleChange}
              value={timeframe}
              disabled={startDate || endDate}
            >
              <option value="select">--Select--</option>
              <option value="Today">Today</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
              <option value="Year">This Year</option>
            </select>
          </div>
          <div className="form-group">
            <label>From</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={startDate}
              disabled={timeframe}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>To</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={endDate}
              onChange={handleChange}
              disabled={timeframe}
            />
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button className="Button" onClick={handleApply}>
              Apply
            </button>
            <button
              className="Button Cancel"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Reset Filter"
              onClick={handleReset}
            >
              <i className="fa fa-refresh" />
            </button>
          </div>
        </div>
        <div className="FilterRight">
          <ExportToExcel ref={userRef} fileName="onGoingBooking" />
        </div>
      </div>
      <div className="TableList mt-4" style={{ display: "none" }}>
        <table style={{ width: "150%" }} ref={userRef}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Booking ID</th>
              <th>Driver ID </th>
              <th>Driver Name</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Vehicle ID</th>
              <th>Pickup Location</th>
              <th>Drop off Location</th>
              <th>Total fare (in Rs)</th>
              <th>Service Type</th>
              <th>Booking Date &amp; Time</th>
              <th>Payment Mode</th>
              <th>Incorrect Load Reported?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData?.result?.[0]?.paginationData?.map((res, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + (ongoingPage - 1) * 10}</td>
                  <td>
                    <a className="Blue">{res?.requestId}</a>
                  </td>
                  <td>
                    <a>{res?.driverData?.driver_number}</a>
                  </td>
                  <td>{res?.driverData?.fullName} </td>
                  <td>
                    <a>{res?.userData?.user_number}</a>
                  </td>
                  <td>{res?.userData?.fullName}</td>
                  <td>
                    <a>{res?.vehicleData?.vehicleNumber}</a>
                  </td>
                  <td>{res?.pickUpLocationName}</td>
                  <td>{res?.dropOffLocationName}</td>
                  <td>{res?.tripCharge}</td>
                  <td>{res?.rideType}</td>
                  <td>
                    {res?.scheduledDate} &amp; {res?.scheduledTime}{" "}
                  </td>
                  <td>{res?.paymentMode}</td>
                  <td>{res?.is_report ? "yes" : "No"}</td>
                  <td>
                    <div className="Actions">
                      <Link to="detail" className="Blue" state={res}>
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </Link>
                      <span className="Orange">
                        <Link to="track">Track</Link>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="TableList mt-4">
        <table style={{ width: "150%" }}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Booking ID</th>
              <th>Driver ID </th>
              <th>Driver Name</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Vehicle ID</th>
              <th>Pickup Location</th>
              <th>Drop off Location</th>
              <th>Total fare (in Rs)</th>
              <th>Service Type</th>
              <th>Booking Date &amp; Time</th>
              <th>Payment Mode</th>
              <th>Incorrect Load Reported?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {OngoingBookingList?.result?.[0]?.paginationData?.map((res, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + (ongoingPage - 1) * 10}</td>
                  <td>
                    <a className="Blue">{res?.requestId}</a>
                  </td>
                  <td>
                    <a>{res?.driverData?.driver_number}</a>
                  </td>
                  <td>{res?.driverData?.fullName} </td>
                  <td>
                    <a>{res?.userData?.user_number}</a>
                  </td>
                  <td>{res?.userData?.fullName}</td>
                  <td>
                    <a>{res?.vehicleData?.vehicleNumber}</a>
                  </td>
                  <td>{res?.pickUpLocationName}</td>
                  <td>{res?.dropOffLocationName}</td>
                  <td>{res?.tripCharge?.toFixed(2)}</td>
                  <td>{res?.rideType}</td>
                  <td>
                    {res?.scheduledDate} &amp; {res?.scheduledTime}{" "}
                  </td>
                  <td>{res?.paymentMode}</td>
                  <td>{res?.is_report ? "yes" : "No"}</td>
                  <td>
                    <div className="Actions">
                      <Link
                        to="completedetail"
                        className="Blue"
                        state={{ ...res, type: "OnGoing" }}
                      >
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </Link>
                      <span className="Orange">
                        <Link to="track">Track</Link>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {OngoingBookingList?.result?.[0]?.paginationData?.length == 0 && (
          <p className="text-center">No records found.</p>
        )}
      </div>
      <div className="PaginationBox">
        <div className="PaginationLeft">
          <p>
            Total Records :{" "}
            <span>
              {OngoingBookingList?.result?.[0]?.totalCount?.[0]?.count || 0}
            </span>
          </p>
        </div>
        <div className="PaginationRight">
          {OngoingBookingList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
            <CommonPagination
              activePage={ongoingPage}
              itemsCountPerPage={10}
              totalItemsCount={
                OngoingBookingList?.result?.[0]?.totalCount?.[0]?.count || 0
              }
              pageRangeDisplayed={4}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnGoing;
