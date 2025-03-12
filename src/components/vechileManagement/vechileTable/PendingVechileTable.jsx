import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPendingVehicleList,
  getIlineOrP2pVechileList,
  getPendingVehicleList,
  handleVechileServicePage,
  pendingVehicleStatus,
  vehicleStatus,
} from "../../../features/slices/vechileManagement/vechileManagement";
import { toastService } from "../../../utils/toastify";
import CommonPagination from "../../CommonPagination";
import moment from "moment";
import DeleteModal from "../../DeleteModal";
import DisApprovedModal from "./DisApprovedModal";
import PendingForApproval from "./PendingForApproval";
import { Link } from "react-router-dom";
import { canPerformAction } from "../../../utils/deniedAccess";
import ZoomEffect from "../../ZoomEffect";
import ExportToExcel from "../../ExportToExcel";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  PENDING: false,
  DISAPPROVED: false,
  data: {},
};
const PendingVechileTable = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");
  const {
    search,
    startDate,
    endDate,
    timeframe,
    id,
    deleteModal,
    PENDING,
    DISAPPROVED,
    data,
  } = iState;
  const dispatch = useDispatch();
  const pendingRef = useRef();
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
    dispatch(getAllPendingVehicleList(data)).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        setAllData(res?.payload);
      }
    });
  }, [timeframe, endDate, search, startDate]);

  const { PendingVechileList, vechileServicePage } = useSelector((state) => {
    return state?.vechile;
  });
  useEffect(() => {
    dispatch(
      getPendingVehicleList({
        categoryId,
        page: vechileServicePage,
        timeframe,
      })
    );
  }, [timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getPendingVehicleList({
            categoryId,
            search: search.trim(),
            timeframe,
          })
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    dispatch(handleVechileServicePage(page));
    dispatch(
      getPendingVehicleList({ page, categoryId, timeframe, startDate, endDate })
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
          getPendingVehicleList({ page: vechileServicePage, categoryId })
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
    dispatch(getPendingVehicleList({ page: 1, categoryId }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      categoryId,
      // page,
    };
    dispatch(getPendingVehicleList(data));
  };
  console.log({ PendingVechileList });
  const handleClose = () => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: false,
      PENDING: false,
      DISAPPROVED: false,
    }));
  };

  const handleShowModal = (val, res) => {
    setUpdateState((prev) => ({
      ...prev,
      [val]: true,
      data: res,
      id: res?._id,
    }));
  };

  const handleDelete = () => {
    dispatch(pendingVehicleStatus({ id, status: "DELETED" })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Delete successfully");
        setUpdateState({ ...iState, deleteModal: false, id: "" });
        dispatch(
          getPendingVehicleList({ page: vechileServicePage, categoryId })
        );
      } else {
        toastService.error("Delete failed");
      }
    });
  };
  const handleViewImage = (image) => {
    setImage(image);
    setImageModal(true);
    handleClose();
  };
  const handleCloseImageModal = () => {
    setImageModal(false);
    setImage("");
    setUpdateState((prev) => ({
      ...prev,
      PENDING: true,
    }));
  };
  return (
    <>
      <div className="tab-pane fade active show">
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
                <button className="Button Cancel" onClick={handleReset}>
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
              <ExportToExcel ref={pendingRef} fileName="pendingVechile" />
            </div>
          </div>
          <div className="TableList mt-4" style={{ display: "none" }}>
            <table ref={pendingRef}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Vehicle ID</th>
                  <th>Vehicle No. </th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Added On</th>
                  <th>Service Type</th>
                  <th>Driver Name</th>
                  <th>Driver Approval Status</th>
                  <th>View Vehicle Details</th>
                  {canPerformAction("Vehicle Management") && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {allData?.result?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (vechileServicePage - 1) * 10}</td>
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
                      <td>{res?.driverData?.fullName}</td>
                      <td>
                        <span
                          className={
                            res?.approvedStatus == "PENDING"
                              ? "Red"
                              : res?.approvedStatus !== "Disapproved"
                              ? "Green"
                              : "Blue"
                          }
                          // onClick={() =>
                          //   handleShowModal(res?.approvedStatus, res)
                          // }
                          // disabled={res?.approvedStatus == "APPROVED"}
                        >
                          {res?.approvedStatus}
                        </span>{" "}
                      </td>
                      <td>
                        <div className="Actions">
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
                      {canPerformAction("Vehicle Management") && (
                        <td>
                          <div className="Actions">
                            <a
                              className="Red"
                              onClick={() =>
                                setUpdateState((prev) => ({
                                  ...prev,
                                  id: res?._id,
                                  deleteModal: true,
                                }))
                              }
                            >
                              <i
                                className="fa fa-times-circle"
                                aria-hidden="true"
                              />
                            </a>
                            <a
                              className="Green"
                              onClick={() =>
                                handleShowModal(res?.approvedStatus, res)
                              }
                            >
                              <i
                                className="fa fa-check-circle"
                                aria-hidden="true"
                              />
                            </a>
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
                  <th>Vehicle No. </th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Added On</th>
                  <th>Service Type</th>
                  <th>Driver Name</th>
                  <th>Driver Approval Status</th>
                  <th>View Vehicle Details</th>
                  {canPerformAction("Vehicle Management") && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {PendingVechileList?.result?.[0]?.paginationData?.map(
                  (res, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + (vechileServicePage - 1) * 10}</td>
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
                        <td>{res?.driverData?.fullName}</td>
                        <td>
                          <span
                            className={
                              res?.approvedStatus == "PENDING"
                                ? "Red"
                                : res?.approvedStatus !== "Disapproved"
                                ? "Green"
                                : "Blue"
                            }
                            // onClick={() =>
                            //   handleShowModal(res?.approvedStatus, res)
                            // }
                            // disabled={res?.approvedStatus == "APPROVED"}
                          >
                            {res?.approvedStatus}
                          </span>{" "}
                        </td>
                        <td>
                          <div className="Actions">
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
                        {canPerformAction("Vehicle Management") && (
                          <td>
                            <div className="Actions">
                              <a
                                className="Red"
                                onClick={() =>
                                  setUpdateState((prev) => ({
                                    ...prev,
                                    id: res?._id,
                                    deleteModal: true,
                                  }))
                                }
                              >
                                <i
                                  className="fa fa-times-circle"
                                  aria-hidden="true"
                                />
                              </a>
                              <a
                                className="Green"
                                onClick={() =>
                                  handleShowModal(res?.approvedStatus, res)
                                }
                              >
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                              </a>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {PendingVechileList?.result?.[0]?.paginationData?.length == 0 && (
              <p className="text-center">No records found.</p>
            )}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {PendingVechileList?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>
            <div className="PaginationRight">
              {PendingVechileList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={vechileServicePage}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    PendingVechileList?.result?.[0]?.totalCount?.[0]?.count || 0
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
          handleClose={handleClose}
          handleDelete={handleDelete}
          statement="vehicle"
        />
      )}
      {DISAPPROVED && <DisApprovedModal handleClose={handleClose} id={id} />}
      {PENDING && (
        <PendingForApproval
          handleClose={handleClose}
          data={data}
          handleViewImageFunc={handleViewImage}
        />
      )}
      {imageModal && (
        <ZoomEffect image={image} handleClose={handleCloseImageModal} />
      )}
    </>
  );
};

export default PendingVechileTable;
