import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  driverStatus,
  fetchAllILineDriverList,
  fetchILineDriverList,
  handleIlinePage,
} from "../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { toastService } from "../../../utils/toastify";
import moment from "moment";
import CommonPagination from "../../CommonPagination";
import { canPerformAction } from "../../../utils/deniedAccess";
import DeleteModal from "../../DeleteModal";
import ExportToExcel from "../../ExportToExcel";
const initialState = {
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  deleteModal: false,
  id: "",
};
const I_lineDriver = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, deleteModal, id } = iState;
  const dispatch = useDispatch();
  const iLineRef = useRef();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const data = {
      search,
      startDate,
      endDate,
      timeframe,
      limit: 999999,
    };
    dispatch(fetchAllILineDriverList(data)).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        setAllData(res?.payload);
      }
    });
  }, [timeframe, endDate, search, startDate]);
  const { iLineDriverList, ilinePage } = useSelector((state) => {
    return state?.driverManagementAllDrivers;
  });
  useEffect(() => {
    dispatch(fetchILineDriverList({ page: ilinePage, timeframe }));
  }, []);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          fetchILineDriverList({
            search: search.trim(),
            timeframe,
          })
        );
        dispatch(handleIlinePage(1));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    dispatch(handleIlinePage(page));
    dispatch(fetchILineDriverList({ page, timeframe, startDate, endDate }));
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(driverStatus(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(fetchILineDriverList({ page: ilinePage }));
      } else {
        toastService.error("status update failed");
      }
    });
  };
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    dispatch(handleIlinePage(1));
    setUpdateState(initialState);
    dispatch(fetchILineDriverList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      // page: ilinePage,
    };
    dispatch(fetchILineDriverList(data));
    dispatch(handleIlinePage(1));
  };
  const handleDelete = () => {
    const data = { id, status: "DELETED" };
    dispatch(driverStatus(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Delete successfully");
        dispatch(fetchILineDriverList({ page: ilinePage }));
        hideDeleteModal();
      } else {
        toastService.error(" Delete failed");
      }
    });
  };
  const showDeleteModal = (id) => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: true,
      id: id,
    }));
  };
  const hideDeleteModal = () => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: false,
      id: "",
    }));
  };
  return (
    <>
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
              <ExportToExcel ref={iLineRef} fileName="ilineDriver" />
            </div>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TableList" style={{ display: "none" }}>
            <table ref={iLineRef}>
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
                  {canPerformAction("Driver Management") && <th>Action</th>}
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {allData?.result?.[0]?.paginationData?.map((res, i) => {
                  console.log({ res });

                  return (
                    <tr>
                      <td>{i + 1 + (ilinePage - 1) * 10}</td>
                      <td>{res?.driver_number}</td>
                      <td>
                        <Link
                          to="/driverManagement/detailDriverManagement"
                          className="Blue"
                          state={res}
                        >
                          {res?.fullName}
                        </Link>
                      </td>
                      <td>{res?.phoneNumber}</td>
                      <td>{res?.vehicleData?.[0]?.vehicleNumber}</td>
                      <td>{res?.vehicleData?.[0]?.vehicleNumberPlate}</td>
                      <td>{res?.totalRides}</td>
                      <td>
                        <span className={res?.is_online ? "Green" : "Red"}>
                          {res?.is_online ? "Online" : "Offline"}
                        </span>{" "}
                      </td>
                      <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{res?.localRideCount}</td>
                      <td>{res?.outstationRideCount}</td>
                      <td>{res?.expressRideCount}</td>
                      <td>
                        <span
                          className={
                            res?.userStatus == "ACTIVE" ? "Green" : "Red"
                          }
                        >
                          {res?.userStatus}
                        </span>{" "}
                      </td>
                      {canPerformAction("Driver Management") && (
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
                              onClick={() => showDeleteModal(res?._id)}
                            >
                              <i className="fa fa-trash" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      )}
                      <td>
                        <div className="Actions">
                          <Link
                            to="/driverManagement/detailDriverManagement"
                            className="Blue"
                            state={res}
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
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
                  {canPerformAction("Driver Management") && <th>Action</th>}
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {iLineDriverList?.result?.[0]?.paginationData?.map((res, i) => {
                  console.log({ res });

                  return (
                    <tr>
                      <td>{i + 1 + (ilinePage - 1) * 10}</td>
                      <td>{res?.driver_number}</td>
                      <td>
                        <Link
                          to="/driverManagement/detailDriverManagement"
                          className="Blue"
                          state={res}
                        >
                          {res?.fullName}
                        </Link>
                      </td>
                      <td>{res?.phoneNumber}</td>
                      <td>{res?.vehicleData?.[0]?.vehicleNumber}</td>
                      <td>{res?.vehicleData?.[0]?.vehicleNumberPlate}</td>
                      <td>{res?.totalRides}</td>
                      <td>
                        <span className={res?.is_online ? "Green" : "Red"}>
                          {res?.is_online ? "Online" : "Offline"}
                        </span>{" "}
                      </td>
                      <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{res?.localRideCount}</td>
                      <td>{res?.outstationRideCount}</td>
                      <td>{res?.expressRideCount}</td>
                      <td>
                        <span
                          className={
                            res?.userStatus == "ACTIVE" ? "Green" : "Red"
                          }
                        >
                          {res?.userStatus}
                        </span>{" "}
                      </td>
                      {canPerformAction("Driver Management") && (
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
                              onClick={() => showDeleteModal(res?._id)}
                            >
                              <i className="fa fa-trash" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      )}
                      <td>
                        <div className="Actions">
                          <Link
                            to="/driverManagement/detailDriverManagement"
                            className="Blue"
                            state={res}
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {iLineDriverList?.result?.[0]?.paginationData?.length == 0 && (
              <p className="text-center">No records found.</p>
            )}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {iLineDriverList?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {iLineDriverList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={ilinePage}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    iLineDriverList?.result?.[0]?.totalCount?.[0]?.count || 0
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
      {deleteModal && (
        <DeleteModal
          handleClose={hideDeleteModal}
          handleDelete={handleDelete}
          statement="Driver"
        />
      )}
    </>
  );
};

export default I_lineDriver;
