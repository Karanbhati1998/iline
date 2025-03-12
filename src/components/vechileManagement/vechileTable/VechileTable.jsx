import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIlineOrP2pVechileList,
  getIlineOrP2pVechileList,
  handlePage,
  vehicleStatus,
} from "../../../features/slices/vechileManagement/vechileManagement";
import { toastService } from "../../../utils/toastify";
import CommonPagination from "../../CommonPagination";
import { Link } from "react-router-dom";
import moment from "moment";
import DeleteModal from "../../DeleteModal";
import { canPerformAction } from "../../../utils/deniedAccess";
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
const VechileTable = ({ categoryId, vehicleType }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, deleteModal, id } = iState;
  const dispatch = useDispatch();
  const vechileRef = useRef();
  const [allData, setAllData] = useState([]);
  const { ilineOrP2pVechileList, page } = useSelector((state) => {
    return state?.vechile;
  });
  useEffect(() => {
    const data = {
      search,
      startDate,
      endDate,
      timeframe,
      limit: 999999,
      categoryId,
      vehicleType,
    };
    if (categoryId && vehicleType) {
      dispatch(getAllIlineOrP2pVechileList(data)).then((res) => {
        if (res?.payload?.code == 200) {
          console.log({ res });
          setAllData(res?.payload);
        }
      });
    }
  }, [timeframe, endDate, search, startDate, categoryId, vehicleType]);

  useEffect(() => {
    if (categoryId && vehicleType) {
      dispatch(
        getIlineOrP2pVechileList({
          categoryId,
          vehicleType,
          page,
          timeframe,
        })
      );
    }
  }, [timeframe, categoryId, vehicleType]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getIlineOrP2pVechileList({
            categoryId,
            vehicleType,
            search: search.trim(),
            timeframe,
          })
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch, categoryId]);

  const handlePageChange = (page) => {
    dispatch(handlePage(page));
    dispatch(
      getIlineOrP2pVechileList({
        categoryId,
        vehicleType,
        page,
        timeframe,
        startDate,
        endDate,
      })
    );
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(vehicleStatus(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page }));
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
    dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
      categoryId,
      vehicleType,
    };
    dispatch(getIlineOrP2pVechileList(data));
  };
  console.log({ ilineOrP2pVechileList });
  const handleClose = () => {
    setUpdateState({ ...iState, deleteModal: false, id: "" });
  };
  const handleDelete = () => {
    dispatch(vehicleStatus({ id, status: "DELETED" })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Delete successfully");
        setUpdateState({ ...iState, deleteModal: false, id: "" });
        dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page }));
      } else {
        toastService.error("Delete failed");
      }
    });
  };
  return (
    <>
      <div className="tab-content">
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
                {/* <div className="form-group">
                  <label>Service Type</label>
                  <select className="form-control">
                    <option>Select</option>
                    <option>Two-Wheeler</option>
                    <option>Three-Wheeler</option>
                    <option>Four-Wheeler</option>
                    <option>Freight-Truck</option>
                  </select>
                </div> */}
                <ExportToExcel ref={vechileRef} fileName="vechileTable" />
              </div>
            </div>
            <div className="TableList mt-4" style={{ display: "none" }}>
              <table ref={vechileRef}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Vehicle ID</th>
                    <th>Vehicle No.</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Added On</th>
                    <th>Service Type</th>
                    <th>Current Assigned Driver</th>
                    <th>
                      {allData?.result?.[0]?.paginationData?.[0]
                        ?.vehicleType === "ILINE"
                        ? "Assigned on"
                        : "Approved on"}
                    </th>
                    <th>
                      {allData?.result?.[0]?.paginationData?.[0]
                        ?.vehicleType === "ILINE"
                        ? "Assigned By"
                        : "Approved By"}
                    </th>

                    <th>Status</th>
                    {canPerformAction("Vehicle Management") && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {allData?.result?.[0]?.paginationData?.map((res, i) => {
                    console.log({ res });

                    return (
                      <tr key={res?._id}>
                        <td>{i + 1 + (page - 1) * 10}</td>
                        <td>{res?.vehicleNumber}</td>
                        <td>{res?.vehicleNumberPlate}</td>

                        <td>{res?.vehicleType}</td>
                        <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>
                          {(() => {
                            const labels = [];
                            if (res?.is_local) labels.push("Local");
                            if (res?.is_express) labels.push("Express");
                            if (res?.is_outstation) labels.push("Outstation");
                            return labels.length > 0 ? labels.join(", ") : "-";
                          })()}
                        </td>

                        <td>{res?.driverData?.[0]?.fullName}</td>
                        <td>
                          {res?.vehicleType == "ILINE"
                            ? moment(res?.assignOn).format("DD-MM-YYYY")
                            : moment(res?.driverData?.[0]?.approvedOn).format(
                                "DD-MM-YYYY"
                              )}
                        </td>
                        <td>
                          {res?.vehicleType == "ILINE"
                            ? res?.assignBy
                            : res?.driverData?.[0]?.approvedBy}
                        </td>
                        <td>
                          <span
                            className={
                              res?.status == "ACTIVE" ? "Green" : "Red"
                            }
                          >
                            {res?.status == "ACTIVE" ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                        {canPerformAction("Vehicle Management") && (
                          <td>
                            <div className="Actions">
                              <label className="Switch">
                                <input
                                  type="checkbox"
                                  name="status"
                                  checked={res?.status == "ACTIVE"}
                                  onChange={(e) => handleChecked(e, res?._id)}
                                />
                                <span className="slider" />
                              </label>
                              <a
                                className="Red"
                                onClick={() => {
                                  setUpdateState({
                                    ...iState,
                                    deleteModal: true,
                                    id: res?._id,
                                  });
                                }}
                              >
                                <i className="fa fa-trash" />
                              </a>
                              <Link
                                to="/vehicleManagement/details"
                                state={res}
                                className="Blue"
                              >
                                <i
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
                              </Link>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="TableList mt-4">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Vehicle ID</th>
                    <th>Vehicle No.</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Added On</th>
                    <th>Service Type</th>
                    <th>Current Assigned Driver</th>
                    <th>
                      {ilineOrP2pVechileList?.result?.[0]?.paginationData?.[0]
                        ?.vehicleType === "ILINE"
                        ? "Assigned on"
                        : "Approved on"}
                    </th>
                    <th>
                      {ilineOrP2pVechileList?.result?.[0]?.paginationData?.[0]
                        ?.vehicleType === "ILINE"
                        ? "Assigned By"
                        : "Approved By"}
                    </th>

                    <th>Status</th>
                    {canPerformAction("Vehicle Management") && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {ilineOrP2pVechileList?.result?.[0]?.paginationData?.map(
                    (res, i) => {
                      console.log({ res });

                      return (
                        <tr key={res?._id}>
                          <td>{i + 1 + (page - 1) * 10}</td>
                          <td>{res?.vehicleNumber}</td>
                          <td>{res?.vehicleNumberPlate}</td>

                          <td>{res?.vehicleType}</td>
                          <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                          <td>
                            {(() => {
                              const labels = [];
                              if (res?.is_local) labels.push("Local");
                              if (res?.is_express) labels.push("Express");
                              if (res?.is_outstation) labels.push("Outstation");
                              return labels.length > 0
                                ? labels.join(", ")
                                : "-";
                            })()}
                          </td>

                          <td>{res?.driverData?.[0]?.fullName}</td>
                          <td>
                            {res?.vehicleType == "ILINE"
                              ? moment(res?.assignOn).format("DD-MM-YYYY")
                              : moment(res?.driverData?.[0]?.approvedOn).format(
                                  "DD-MM-YYYY"
                                )}
                          </td>
                          <td>
                            {res?.vehicleType == "ILINE"
                              ? res?.assignBy
                              : res?.driverData?.[0]?.approvedBy}
                          </td>
                          <td>
                            <span
                              className={
                                res?.status == "ACTIVE" ? "Green" : "Red"
                              }
                            >
                              {res?.status == "ACTIVE" ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          {canPerformAction("Vehicle Management") && (
                            <td>
                              <div className="Actions">
                                <label className="Switch">
                                  <input
                                    type="checkbox"
                                    name="status"
                                    checked={res?.status == "ACTIVE"}
                                    onChange={(e) => handleChecked(e, res?._id)}
                                  />
                                  <span className="slider" />
                                </label>
                                <a
                                  className="Red"
                                  onClick={() => {
                                    setUpdateState({
                                      ...iState,
                                      deleteModal: true,
                                      id: res?._id,
                                    });
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </a>
                                <Link
                                  to="/vehicleManagement/details"
                                  state={res}
                                  className="Blue"
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              {ilineOrP2pVechileList?.result?.[0]?.paginationData?.length ==
                0 && <p className="text-center">No records found.</p>}
            </div>
            <div className="PaginationBox">
              <div className="PaginationLeft">
                <p>
                  Total Records :{" "}
                  <span>
                    {ilineOrP2pVechileList?.result?.[0]?.totalCount?.[0]
                      ?.count || 0}
                  </span>
                </p>
              </div>
              <div className="PaginationRight">
                {ilineOrP2pVechileList?.result?.[0]?.totalCount?.[0]?.count >
                  0 && (
                  <CommonPagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={
                      ilineOrP2pVechileList?.result?.[0]?.totalCount?.[0]
                        ?.count || 0
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
      </div>
      {deleteModal && (
        <DeleteModal
          handleClose={handleClose}
          handleDelete={handleDelete}
          statement="vehicle"
        />
      )}
    </>
  );
};

export default VechileTable;
