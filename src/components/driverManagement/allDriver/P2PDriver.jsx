import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  driverStatus,
  fetchP2pDriverList,
} from "../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { toastService } from "../../../utils/toastify";
import moment from "moment";
import CommonPagination from "../../CommonPagination";
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
};
const P2PDriver = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, fromDate, toDate, timeframe } = iState;
  const dispatch = useDispatch();
  const iLineRef = useRef();
  const { p2pDriverList } = useSelector((state) => {
    return state?.driverManagementAllDrivers;
  });
  console.log({ p2pDriverList });

  useEffect(() => {
    dispatch(fetchP2pDriverList({ page, timeframe }));
  }, [page, timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        fetchP2pDriverList({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(fetchP2pDriverList({ page }));
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(driverStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(fetchP2pDriverList({ page }));
      } else {
        toastService.error("status update failed");
      }
    });
  };
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(fetchP2pDriverList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      fromDate,
      toDate,
      page,
    };
    dispatch(fetchP2pDriverList(data));
  };
   const handleDelete=(id)=>{
         const data = { id, status:"DELETED" };
         dispatch(driverStatus(data)).then((res) => {
           console.log("status update api", res);
           if (res?.payload?.code == 200) {
             toastService.success("Delete successfully");
             dispatch(fetchP2pDriverList({ page }));
           } else {
             toastService.error(" Delete failed");
           }
         });
      }
  return (
    <div className="tab-pane active">
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
      <div className="Small-Wrapper">
        <div className="TableList">
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Contact No.</th>
                <th>Vehicle ID</th>
                <th>Vehicle No</th>
                <th>Total Bookings</th>
                <th>Status</th>
                <th>Registered On</th>
                <th>Local Delivery</th>
                <th>Out Station</th>
                <th>Express Delivery</th>
                <th>Driver Status</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {p2pDriverList?.result?.[0]?.paginationData?.map((res, i) => {
                return (
                  <tr>
                    <td>{i + 1 + (page - 1) * 10}</td>
                    <td>{res?.driver_number}</td>
                    <td>{res?.fullName}</td>
                    <td>{res?.phoneNumber}</td>
                    <td>-</td>
                    <td>{res?.vehicleNumber}</td>
                    <td>0</td>
                    <td>
                      <span className={res?.is_online ? "Green" : "Red"}>
                        {res?.is_online ? "Online" : "Offline"}
                      </span>{" "}
                    </td>
                    <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>
                      <span
                        className={
                          res?.userStatus == "ACTIVE" ? "Green" : "Red"
                        }
                      >
                        {res?.userStatus}
                      </span>{" "}
                    </td>
                    <td>
                      {" "}
                      <div className="Actions">
                        <label className="Switch">
                          <input
                            type="checkbox"
                            name="status"
                            checked={res?.userStatus == "ACTIVE"}
                            onChange={(e) => handleChecked(e, res?._id)}
                          />
                          <span className="slider" />
                        </label>
                        <a
                          className="Red"
                          onClick={() => handleDelete(res?._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="Actions">
                        <Link
                          to="/driverManagement/detailDriverManagement"
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
                {p2pDriverList?.result?.[0]?.totalCount?.[0]?.count || 0}
              </span>
            </p>
          </div>

          <div className="PaginationRight">
            {p2pDriverList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
              <CommonPagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={
                  p2pDriverList?.result?.[0]?.totalCount?.[0]?.count || 0
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
  );
};

export default P2PDriver;
