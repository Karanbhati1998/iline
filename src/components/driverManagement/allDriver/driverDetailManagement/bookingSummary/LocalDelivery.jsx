import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDriverRequestList } from '../../../../../features/slices/DriverManagement/allDriver/allDriverReducer';
import CommonPagination from '../../../../CommonPagination';
import { toastService } from '../../../../../utils/toastify';
import moment from 'moment';
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
};
const LocalDelivery = ({state}) => {
   const [iState, setUpdateState] = useState(initialState);
    const { page, search, fromDate, toDate, timeframe } = iState;
    
  const dispatch=useDispatch()
  const {driverRequestList}=useSelector(state=>{
    return state?.driverManagementAllDrivers;
  })
  useEffect(() => {
    dispatch(
      getDriverRequestList({
        driverId: state?._id,
        rideType: "LOCAL",
      })
    );
  }, [page, timeframe,state]);
  console.log({ driverRequestList });
   useEffect(() => {
      const delayDebounceFunc = setTimeout(() => {
        dispatch(
          getDriverRequestList({
            driverId: state?._id,
            rideType: "LOCAL",
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
        getDriverRequestList({ page, driverId: state?._id, rideType: "LOCAL" })
      );
    };
    // const handleChecked = (e, id) => {
    //   const { name, checked } = e?.target;
    //   const status = checked ? "ACTIVE" : "INACTIVE";
    //   const data = { id, status };
    //   dispatch(driverStatus(data)).then((res) => {
    //     if (res?.payload?.code == 200) {
    //       toastService.success("Status updated successfully");
    //       dispatch(
    //         getDriverRequestList({
    //           page,
    //           driverId: state?._id,
    //           rideType: "LOCAL",
    //         })
    //       );
    //     } else {
    //       toastService.error("status update failed");
    //     }
    //   });
    // };
    const handleChange = (e) => {
      setUpdateState({ ...iState, [e.target.name]: e.target.value });
    };
    const handleReset = () => {
      setUpdateState(initialState);
      dispatch(
        getDriverRequestList({
          page: 1,
          driverId: state?._id,
          rideType: "LOCAL",
        })
      );
    };
    const handleApply = () => {
      const data = {
        search,
        fromDate,
        toDate,
        page,
        driverId: state?._id,
        rideType: "LOCAL",
      };
      dispatch(getDriverRequestList(data));
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
                  Download Receipt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
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
            {driverRequestList?.result?.[0]?.paginationData?.map((res,i) => {
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
                        to="/driverManagement/bookingSummaryDetails"
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
      <div className="PaginationBox">
        <div className="PaginationLeft">
          <p>
            Total Records :{" "}
            <span>
              {driverRequestList?.result?.[0]?.totalCount?.[0]?.count || 0}
            </span>
          </p>
        </div>

        <div className="PaginationRight">
          {driverRequestList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
            <CommonPagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={
                driverRequestList?.result?.[0]?.totalCount?.[0]?.count || 0
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
}

export default LocalDelivery