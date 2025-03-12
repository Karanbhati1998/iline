import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServiceBasedVehicleList,
  getIlineOrP2pVechileList,
  getServiceBasedVehicleList,
  handleVechileServicePage,
  vehicleStatus,
} from "../../../features/slices/vechileManagement/vechileManagement";
import { Link, useLocation } from "react-router-dom";
import BackButton from "../../BackButton";
import { toastService } from "../../../utils/toastify";
import CommonPagination from "../../CommonPagination";
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
const DeliverTable = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, deleteModal, id } = iState;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const vechileService = useRef();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const data = {
      search,
      startDate,
      endDate,
      timeframe,
      serviceType: state?.type,
      categoryId: state?.ind,
      limit: 999999,
    };
    if (state) {
      dispatch(getAllServiceBasedVehicleList(data)).then((res) => {
        if (res?.payload?.code == 200) {
          console.log({ res });
          setAllData(res?.payload);
        }
      });
    }
  }, [timeframe, endDate, search, startDate]);

  const { serviceBasedVehicleList, vechileServicePage } = useSelector(
    (state) => {
      return state?.vechile;
    }
  );

  console.log({ serviceBasedVehicleList });
  console.log({ state });

  useEffect(() => {
    if (state) {
      dispatch(
        getServiceBasedVehicleList({
          serviceType: state?.type,
          categoryId: state?.ind,
          page: vechileServicePage,
          timeframe,
        })
      );
    }
  }, [state, timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getServiceBasedVehicleList({
            search: search.trim(),
            timeframe,
            serviceType: state?.type,
            categoryId: state?.ind,
          })
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    dispatch(handleVechileServicePage(page));
    dispatch(
      getServiceBasedVehicleList({
        serviceType: state?.type,
        categoryId: state?.ind,
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
        dispatch(
          getServiceBasedVehicleList({
            serviceType: state?.type,
            categoryId: state?.ind,
            page: vechileServicePage,
          })
        );
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
    dispatch(
      getServiceBasedVehicleList({
        serviceType: state?.type,
        categoryId: state?.ind,
        page: 1,
      })
    );
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      // page,
      serviceType: state?.type,
      categoryId: state?.ind,
    };
    dispatch(getServiceBasedVehicleList(data));
  };
  const handleClose = () => {
    setUpdateState({ ...iState, deleteModal: false, id: "" });
  };
  const handleDelete = () => {
    dispatch(vehicleStatus({ id, status: "DELETED" })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Delete successfully");
        setUpdateState({ ...iState, deleteModal: false, id: "" });
        dispatch(
          getServiceBasedVehicleList({
            serviceType: state?.type,
            categoryId: state?.ind,
            page: vechileServicePage,
          })
        );
      } else {
        toastService.error("Delete failed");
      }
    });
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">{state?.type} Vehicles</h4>
            <div className="TitleLink">
              <a className="TitleLink">
                <BackButton />
              </a>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane active" id="TwoWheeler">
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
                    <ExportToExcel
                      ref={vechileService}
                      fileName="vechileService"
                    />
                  </div>
                </div>
                <div className="TableList mt-4" style={{ display: "none" }}>
                  <table ref={vechileService}>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Vehicle ID</th>
                        <th>Vehicle No.</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Added On</th>
                        <th>Service Type</th>
                        <th>Current Assigned Driver</th>
                        <th>Assigned/Approved On</th>
                        <th>Assigned/Approved By</th>
                        <th>Status</th>
                        {canPerformAction("Vehicle Management") && (
                          <th>Action</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {allData?.result?.[0]?.paginationData?.map((res, i) => {
                        return (
                          <tr key={res?._id}>
                            <td>{i + 1 + (vechileServicePage - 1) * 10}</td>
                            <td>{res?.vehicleNumber}</td>
                            <td>{res?.vehicleNumberPlate}</td>

                            <td>{res?.vehicleType}</td>
                            <td>
                              {moment(res?.createdAt).format("DD-MM-YYYY")}
                            </td>
                            <td>
                              {(() => {
                                const labels = [];
                                if (res?.is_local) labels.push("Local");
                                if (res?.is_express) labels.push("Express");
                                if (res?.is_outstation)
                                  labels.push("Outstation");
                                return labels.length > 0
                                  ? labels.join(", ")
                                  : "-";
                              })()}
                            </td>

                            <td>{res?.driverData?.[0]?.fullName}</td>

                            <td>
                              {res.assignOn
                                ? moment(res.assignOn).format("DD-MM-YYYY")
                                : moment(
                                    res?.driverData?.[0]?.approvedOn
                                  ).format("DD-MM-YYYY")}
                            </td>
                            <td>
                              {res?.assignBy ||
                                res?.driverData?.[0]?.approvedBy}
                            </td>
                            <td>
                              <span
                                className={
                                  res?.status == "ACTIVE" ? "Green" : "Red"
                                }
                              >
                                {res?.status == "ACTIVE"
                                  ? "Enabled"
                                  : "Disabled"}
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
                                      onChange={(e) =>
                                        handleChecked(e, res?._id)
                                      }
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
                        <th>Assigned/Approved On</th>
                        <th>Assigned/Approved By</th>
                        <th>Status</th>
                        {canPerformAction("Vehicle Management") && (
                          <th>Action</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {serviceBasedVehicleList?.result?.[0]?.paginationData?.map(
                        (res, i) => {
                          return (
                            <tr key={res?._id}>
                              <td>{i + 1 + (vechileServicePage - 1) * 10}</td>
                              <td>{res?.vehicleNumber}</td>
                              <td>{res?.vehicleNumberPlate}</td>

                              <td>{res?.vehicleType}</td>
                              <td>
                                {moment(res?.createdAt).format("DD-MM-YYYY")}
                              </td>
                              <td>
                                {(() => {
                                  const labels = [];
                                  if (res?.is_local) labels.push("Local");
                                  if (res?.is_express) labels.push("Express");
                                  if (res?.is_outstation)
                                    labels.push("Outstation");
                                  return labels.length > 0
                                    ? labels.join(", ")
                                    : "-";
                                })()}
                              </td>

                              <td>{res?.driverData?.[0]?.fullName}</td>

                              <td>
                                {res.assignOn
                                  ? moment(res.assignOn).format("DD-MM-YYYY")
                                  : moment(
                                      res?.driverData?.[0]?.approvedOn
                                    ).format("DD-MM-YYYY")}
                              </td>
                              <td>
                                {res?.assignBy ||
                                  res?.driverData?.[0]?.approvedBy}
                              </td>
                              <td>
                                <span
                                  className={
                                    res?.status == "ACTIVE" ? "Green" : "Red"
                                  }
                                >
                                  {res?.status == "ACTIVE"
                                    ? "Enabled"
                                    : "Disabled"}
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
                                        onChange={(e) =>
                                          handleChecked(e, res?._id)
                                        }
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
                              )}
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  {serviceBasedVehicleList?.result?.[0]?.paginationData
                    ?.length == 0 && (
                    <p className="text-center">No records found.</p>
                  )}
                </div>
                <div className="PaginationBox">
                  <div className="PaginationLeft">
                    <p>
                      Total Records :{" "}
                      <span>
                        {serviceBasedVehicleList?.result?.[0]?.totalCount?.[0]
                          ?.count || 0}
                      </span>
                    </p>
                  </div>

                  <div className="PaginationRight">
                    {serviceBasedVehicleList?.result?.[0]?.totalCount?.[0]
                      ?.count > 0 && (
                      <CommonPagination
                        activePage={vechileServicePage}
                        itemsCountPerPage={10}
                        totalItemsCount={
                          serviceBasedVehicleList?.result?.[0]?.totalCount?.[0]
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
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          handleClose={handleClose}
          handleDelete={handleDelete}
          statement="vechile"
        />
      )}
    </>
  );
};

export default DeliverTable;
