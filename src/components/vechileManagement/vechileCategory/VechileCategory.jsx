import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVechileCategory,
  vehicleCategoryStatus,
} from "../../../features/slices/vechileManagement/vechileCategory";
import BackButton from "../../BackButton";
import moment from "moment";
import { toastService } from "../../../utils/toastify";
import ExportToExcel from "../../ExportToExcel";
import DeleteVechileCategory from "./DeleteVechileCategory";
import CommonPagination from "../../CommonPagination";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  deleteModal: false,
  id: "",
};
const VechileCategory = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe, deleteModal, id } =
    iState;
  const dispatch = useDispatch();
  const vechileCategoryRef = useRef();
  const { VechileCategories } = useSelector((state) => {
    return state?.vechileCategory;
  });
  console.log({ VechileCategories });

  useEffect(() => {
    dispatch(getVechileCategory({ page, timeframe }));
  }, [page, timeframe]);

  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getVechileCategory({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
    };
    dispatch(getVechileCategory(data));
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getVechileCategory({ page: 1 }));
  };

  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(vehicleCategoryStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(getVechileCategory({ page }));
      } else {
        toastService.error("status update failed");
      }
    });
  };
  const handleDeleteModalOpen = (id) => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: true,
      id: id,
    }));
  };
  const handleDeleteModalClose = () => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: false,
    }));
  };
  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getVechileCategory({ page }));
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Vehicle Management</h4>
            <div className="TitleLink">
              <Link
                to="/vehicleManagement/addVehicleCategory"
                className="TitleLink"
              >
                Add Vehicle Category
              </Link>
              <a className="TitleLink ml-2">
                <BackButton />
              </a>
            </div>
          </div>
          <div className="SettingsTabs">
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
                  <ExportToExcel
                    ref={vechileCategoryRef}
                    fileName="vechileCategory"
                  />
                </div>
              </div>
              <div className="TableList mt-4">
                <table ref={vechileCategoryRef}>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Vehicle Category ID</th>
                      <th>Vehicle Category Type Name</th>
                      <th>Category Type Icon</th>
                      <th>Load Capacity </th>
                      <th>Added On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VechileCategories?.result?.[0]?.paginationData?.map(
                      (res, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1 + (page - 1) * 10}</td>
                            <td>{res?.category_number}</td>
                            <td>
                              <span
                                style={{
                                  color: "green",
                                  fontWeight: "bold",
                                  display: "inline",
                                  padding: "0px",
                                }}
                              >
                                {res?.categoryName?.slice(0, 2)}
                              </span>
                              {res?.categoryName?.slice(2)}
                            </td>

                            <td>
                              <img
                                src={res?.uploadIcon}
                                alt=""
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>{res?.weightCapicity}</td>
                            <td>
                              {moment(res?.createdAt).format("DD-MM-YYYY")}
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
                                  onClick={() =>
                                    handleDeleteModalOpen(res?._id)
                                  }
                                >
                                  <i className="fa fa-trash" />
                                </a>
                                <Link
                                  to="/vehicleManagement/vehicleCategoryDetail"
                                  className="Blue"
                                  state={res}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  />
                                </Link>
                                <Link
                                  to="/vehicleManagement/editVehicleCategory"
                                  className="Green"
                                  state={res}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <div className="PaginationBox">
                <div className="PaginationLeft">
                  <p>
                    Total Records :{" "}
                    <span>
                      {VechileCategories?.result?.[0]?.totalCount?.[0]?.count ||
                        0}
                    </span>
                  </p>
                </div>

                <div className="PaginationRight">
                  {VechileCategories?.result?.[0]?.totalCount?.[0]?.count >
                    0 && (
                    <CommonPagination
                      activePage={page}
                      itemsCountPerPage={10}
                      totalItemsCount={
                        VechileCategories?.result?.[0]?.totalCount?.[0]
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
      {deleteModal && (
        <DeleteVechileCategory
          handleDeleteModalClose={handleDeleteModalClose}
          id={id}
        />
      )}
    </>
  );
};

export default VechileCategory;
