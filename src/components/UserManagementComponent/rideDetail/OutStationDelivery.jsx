import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllUserRequestList,
  getUserRequestList,
} from "../../../features/slices/userManagementReducer";
import CommonPagination from "../../CommonPagination";
import ExportToExcel from "../../ExportToExcel";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
};
const OutStationDelivery = ({ state }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe } = iState;

  const dispatch = useDispatch();
  const userRef = useRef();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const data = {
      search,
      startDate,
      endDate,
      timeframe,
      limit: 999999,
      passengerId: state?._id,
      rideType: "OUTSTATION",
    };
    if (state) {
      dispatch(getAllUserRequestList(data)).then((res) => {
        if (res?.payload?.code == 200) {
          console.log({ res });
          setAllData(res?.payload);
        }
      });
    }
  }, [timeframe, page, endDate, search, startDate]);

  const { userRequestList } = useSelector((state) => {
    return state?.userManagement;
  });
  useEffect(() => {
    dispatch(
      getUserRequestList({
        passengerId: state?._id,
        rideType: "OUTSTATION",
      })
    );
  }, [page, timeframe, state]);
  console.log({ userRequestList });
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getUserRequestList({
          passengerId: state?._id,
          rideType: "OUTSTATION",
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(
      getUserRequestList({
        page,
        passengerId: state?._id,
        rideType: "OUTSTATION",
      })
    );
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(
      getUserRequestList({
        page: 1,
        passengerId: state?._id,
        rideType: "OUTSTATION",
      })
    );
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
      passengerId: state?._id,
      rideType: "OUTSTATION",
    };
    dispatch(getUserRequestList(data));
  };
  return (
    <>
      {" "}
      <div className="RiderArea">
        <div className="RiderBox">
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
                <label>Select From</label>
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
                <button className="Button Cancel" onClick={handleReset}>
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
            <div className="FilterRight">
              <ExportToExcel ref={userRef} fileName="userOutstationRide" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="TableList" style={{ display: "none" }}>
        <table style={{ width: "120%" }} ref={userRef}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Booking ID</th>
              <th>Driver ID</th>
              <th>Driver Name</th>
              <th>Vehicle ID</th>
              <th>Assigned Vehicle</th>
              <th>Total Cost</th>
              <th>Booking Status</th>
              <th>Booking Date</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Payment Mode</th>
              <th>Payment Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {allData?.result?.[0]?.paginationData?.map((res, i) => {
              return (
                <tr>
                  <td>{i + 1 + (page - 1) * 10}</td>
                  <td>{res?.requestId}</td>
                  <td>{res?.driverData?.driver_number}</td>
                  <td>{res?.driverData?.fullName}</td>
                  <td>{res?.vehicleData?.vehicleNumber}</td>
                  <td>{res?.vehicleData?.vehicleNumberPlate}</td>
                  <td>{res?.tripCharge}</td>
                  <td>
                    <Link to={"/userManagement/userBookingDetail"}>
                      <span className="Green">{res?.requestStatus}</span>
                    </Link>
                  </td>
                  <td>{res?.scheduledDate}</td>
                  <td>{res?.pickUpLocationName}</td>
                  <td>{res?.dropOffLocationName}</td>
                  <td>{res?.paymentMode}</td>
                  <td>
                    {res?.requestStatus == "ENDED"
                      ? "COMPLETED"
                      : res?.requestStatus == "PENDING"
                      ? "PENDING"
                      : "CANCELLED"}
                  </td>
                  <td>
                    <div className="Actions">
                      <Link
                        to="/userManagement/detail_ride"
                        className="Blue"
                        state={res}
                      >
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="TableList">
        <table style={{ width: "120%" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Booking ID</th>
              <th>Driver ID</th>
              <th>Driver Name</th>
              <th>Vehicle ID</th>
              <th>Assigned Vehicle</th>
              <th>Total Cost</th>
              <th>Booking Status</th>
              <th>Booking Date</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Payment Mode</th>
              <th>Payment Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {userRequestList?.payload?.result?.[0]?.paginationData?.map(
              (res, i) => {
                return (
                  <tr>
                    <td>{i + 1 + (page - 1) * 10}</td>
                    <td>{res?.requestId}</td>
                    <td>{res?.driverData?.driver_number}</td>
                    <td>{res?.driverData?.fullName}</td>
                    <td>{res?.vehicleData?.vehicleNumber}</td>
                    <td>{res?.vehicleData?.vehicleNumberPlate}</td>
                    <td>{res?.tripCharge}</td>
                    <td>
                      <Link to={"/userManagement/userBookingDetail"}>
                        <span className="Green">{res?.requestStatus}</span>
                      </Link>
                    </td>
                    <td>{res?.scheduledDate}</td>
                    <td>{res?.pickUpLocationName}</td>
                    <td>{res?.dropOffLocationName}</td>
                    <td>{res?.paymentMode}</td>
                    <td>
                      {res?.requestStatus == "ENDED"
                        ? "COMPLETED"
                        : res?.requestStatus == "PENDING"
                        ? "PENDING"
                        : "CANCELLED"}
                    </td>
                    <td>
                      <div className="Actions">
                        <Link
                          to="/userManagement/detail_ride"
                          className="Blue"
                          state={res}
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        {userRequestList?.payload?.result?.[0]?.paginationData?.length == 0 && (
          <p className="text-center">No records found.</p>
        )}
      </div>
      <div className="PaginationBox">
        <div className="PaginationLeft">
          <p>
            Total Records :{" "}
            <span>
              {userRequestList?.payload?.result?.[0]?.totalCount?.[0]?.count ||
                0}
            </span>
          </p>
        </div>

        <div className="PaginationRight">
          {userRequestList?.payload?.result?.[0]?.totalCount?.[0]?.count >
            0 && (
            <CommonPagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={
                userRequestList?.payload?.result?.[0]?.totalCount?.[0]?.count ||
                0
              }
              pageRangeDisplayed={4}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OutStationDelivery;
