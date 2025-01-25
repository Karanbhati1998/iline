import React, { useEffect, useState } from "react";
import BookingManagementComponent from "../BookingManagementComponent";
import { useDispatch, useSelector } from "react-redux";
import { getOngoingBookingList } from "../../../features/slices/bookingManagementSlice";
import { Link, useLocation } from "react-router-dom";
import { toastService } from "../../../utils/toastify";
import CommonPagination from "../../CommonPagination";
import moment from "moment";
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  id: "",
};
const OnGoing = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, fromDate, toDate, timeframe, id } = iState;
  const dispatch = useDispatch();

  const { OngoingBookingList } = useSelector((state) => {
    return state.bookingManagement;
  });
  useEffect(() => {
    if (categoryId) {
      dispatch(
        getOngoingBookingList({
          categoryId,
          page
        })
      );
    }
  }, [page, categoryId]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getOngoingBookingList({
          categoryId,
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getOngoingBookingList({ categoryId, page }));
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
      fromDate,
      toDate,
      page,
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
              disabled={fromDate || toDate}
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
              name="fromDate"
              value={fromDate}
              disabled={timeframe}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>To</label>
            <input
              type="date"
              className="form-control"
              name="toDate"
              value={toDate}
              onChange={handleChange}
              disabled={timeframe}
            />
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button className="Button" onClick={handleApply}>
              Apply
            </button>
            <button className="Button Cancel" onClick={handleReset}>
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
              Download CSV
            </a>
          </div>
        </div>
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
                  <td>{i + 1 + (page - 1) * 10}</td>
                  <td>
                    <a className="Blue">{res?.trip_number}</a>
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
                    <a>-</a>
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
              activePage={page}
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
