import React, { useEffect, useRef, useState } from "react";
import BookingManagementComponent from "../BookingManagementComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompletedBookingList,
  getCompletedBookingList,
  handleCompletedPage,
} from "../../../features/slices/bookingManagementSlice";
import { Link, useLocation } from "react-router-dom";
import CommonPagination from "../../CommonPagination";
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
const Completed = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, id } = iState;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { completedBookingList, completedPage } = useSelector((state) => {
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
      categoryId: state,
    };
    dispatch(getAllCompletedBookingList(data)).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        setAllData(res?.payload);
      }
    });
  }, [timeframe, endDate, search, startDate, categoryId]);
  console.log({ completedPage });

  useEffect(() => {
    if (categoryId) {
      dispatch(
        getCompletedBookingList({
          categoryId,
          page: completedPage,
        })
      );
    }
  }, [categoryId]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getCompletedBookingList({
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
    dispatch(handleCompletedPage(page));
    dispatch(
      getCompletedBookingList({
        categoryId,
        page,
        timeframe,
        startDate,
        endDate,
      })
    );
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getCompletedBookingList({ categoryId, page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      // page,
      categoryId,
    };
    dispatch(getCompletedBookingList(data));
  };
  console.log({ completedBookingList });

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
          <ExportToExcel ref={userRef} fileName="completeBooking" />
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData?.result?.[0]?.paginationData?.map((res, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + (completedPage - 1) * 10}</td>
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

                  <td>
                    <div className="Actions">
                      <Link
                        to="completedetail"
                        className="Blue"
                        state={{ ...res, type: "Completed" }}
                      >
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </Link>
                      <span className="Orange">
                        <Link to="track">View Track Status</Link>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedBookingList?.result?.[0]?.paginationData?.map(
              (res, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + (completedPage - 1) * 10}</td>
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

                    <td>
                      <div className="Actions">
                        <Link
                          to="completedetail"
                          className="Blue"
                          state={{ ...res, type: "Completed" }}
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </Link>
                        <span className="Orange">
                          <Link to="track">View Track Status</Link>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        {completedBookingList?.result?.[0]?.paginationData?.length == 0 && (
          <p className="text-center">No records found.</p>
        )}
      </div>
      <div className="PaginationBox">
        <div className="PaginationLeft">
          <p>
            Total Records :{" "}
            <span>
              {completedBookingList?.result?.[0]?.totalCount?.[0]?.count || 0}
            </span>
          </p>
        </div>
        <div className="PaginationRight">
          {completedBookingList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
            <CommonPagination
              activePage={completedPage}
              itemsCountPerPage={10}
              totalItemsCount={
                completedBookingList?.result?.[0]?.totalCount?.[0]?.count || 0
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

export default Completed;
