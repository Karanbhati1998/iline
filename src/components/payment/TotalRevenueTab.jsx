import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalRevenueList,
  getTotalRevenueListDownload,
  handleTotalRevenuePage,
} from "../../features/slices/payment";
import { Link, useLocation } from "react-router-dom";
import CommonPagination from "../CommonPagination";
import ExportToExcel from "../ExportToExcel";
const initialState = {
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  id: "",
};
const TotalRevenueTab = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, id } = iState;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const paymentRef = useRef();
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
      dispatch(getTotalRevenueListDownload(data)).then((res) => {
        if (res?.payload?.code == 200) {
          console.log({ res });
          setAllData(res?.payload);
        }
      });
    }
  }, [timeframe, endDate, search, startDate, categoryId]);
  const { totalRevenueList, totalRevenuePage } = useSelector((state) => {
    return state?.payment;
  });

  console.log({ totalRevenueList });
  useEffect(() => {
    if (categoryId) {
      dispatch(
        getTotalRevenueList({
          categoryId,
          page: totalRevenuePage,
        })
      );
    }
  }, [categoryId]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getTotalRevenueList({
            categoryId,
            search: search.trim(),
            timeframe,
          })
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch, categoryId]);
  console.log({ totalRevenuePage });
  
  const handlePageChange = (page) => {
      dispatch(handleTotalRevenuePage(page));
    dispatch(
      getTotalRevenueList({ categoryId, page, timeframe, startDate, endDate })
    );
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getTotalRevenueList({ categoryId, page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      // page,
      categoryId,
    };
    dispatch(getTotalRevenueList(data));
  };
  return (
    <>
      <div className="tab-pane active" id="TotalRevenue">
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
              <ExportToExcel ref={paymentRef} fileName="paymentTotalRevenue" />
            </div>
          </div>
          <div className="TableList mt-4" style={{ display: "none" }}>
            <table style={{ width: "150%" }} ref={paymentRef}>
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
                    <tr>
                      <td>{i + 1 + (totalRevenuePage - 1) * 10}</td>
                      <td>
                        <a
                          className="Blue"
                          data-toggle="modal"
                          data-target="#ApprovalModal"
                        >
                          {res?.requestData?.requestId}
                        </a>
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
                      <td>{res?.requestData?.pickUpLocationName}</td>
                      <td>{res?.requestData?.dropOffLocationName}</td>
                      <td>
                        {typeof res?.requestData?.tripCharge === "number"
                          ? res.requestData.tripCharge.toFixed(2)
                          : "0.00"}
                      </td>
                      <td>{res?.requestData?.rideType}</td>
                      <td>
                        {res?.requestData?.scheduledDate} &amp;{" "}
                        {res?.requestData?.scheduledTime}
                      </td>
                      <td>{res?.paymentType}</td>
                      <td>
                        <div className="Actions">
                          <Link className="Blue" to="paymentDetail" state={res}>
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </Link>
                          <span className="Orange">
                            <a
                              href={res?.requestData?.pdfLink}
                              download="document.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download Receipt
                            </a>
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
                {totalRevenueList?.result?.[0]?.paginationData?.map(
                  (res, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + (totalRevenuePage - 1) * 10}</td>
                        <td>
                          <a
                            className="Blue"
                            data-toggle="modal"
                            data-target="#ApprovalModal"
                          >
                            {res?.requestData?.requestId}
                          </a>
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
                        <td>{res?.requestData?.pickUpLocationName}</td>
                        <td>{res?.requestData?.dropOffLocationName}</td>
                        <td>{res?.requestData?.tripCharge?.toFixed(2)}</td>
                        <td>{res?.requestData?.rideType}</td>
                        <td>
                          {res?.requestData?.scheduledDate} &amp;{" "}
                          {res?.requestData?.scheduledTime}
                        </td>
                        <td>{res?.paymentType}</td>
                        <td>
                          <div className="Actions">
                            <Link
                              className="Blue"
                              to="paymentDetail"
                              state={res}
                            >
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              />
                            </Link>
                            <span className="Orange">
                              <a
                                href={res?.requestData?.pdfLink}
                                download="document.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download Receipt
                              </a>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {totalRevenueList?.result?.[0]?.paginationData?.length == 0 && (
              <p className="text-center">No records found.</p>
            )}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {totalRevenueList?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>
            <div className="PaginationRight">
              {totalRevenueList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={totalRevenuePage}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    totalRevenueList?.result?.[0]?.totalCount?.[0]?.count || 0
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
      </div>
    </>
  );
};

export default TotalRevenueTab;
