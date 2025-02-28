import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDriverVehicleHistory } from "../../../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { useLocation } from "react-router-dom";
import BackButton from "../../../../BackButton";
import moment from "moment";
import CommonPagination from "../../../../CommonPagination";
import { deleteVehicleHistory } from "../../../../../features/slices/vechileManagement/vechileManagement";
import { toastService } from "../../../../../utils/toastify";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
};
const AssignedVichelHistory = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe } = iState;

  const dispatch = useDispatch();
  const { state } = useLocation();
  const { driverVehicleHistory } = useSelector((state) => {
    return state.driverManagementAllDrivers;
  });
  console.log({ driverVehicleHistory });

  useEffect(() => {
    dispatch(fetchDriverVehicleHistory({ driverId: state?._id }));
  }, [state]);
  useEffect(() => {
    dispatch(
      fetchDriverVehicleHistory({
        driverId: state?._id,
      })
    );
  }, [page, timeframe, state]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        fetchDriverVehicleHistory({
          driverId: state?._id,

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
      fetchDriverVehicleHistory({
        page,
        driverId: state?._id,
        rideType: "LOCAL",
      })
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
  //         fetchDriverVehicleHistory({
  //           page,
  //           driverId: state?._id,
  //
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
      fetchDriverVehicleHistory({
        page: 1,
        driverId: state?._id,
      })
    );
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
      driverId: state?._id,
    };
    dispatch(fetchDriverVehicleHistory(data));
  };
  const deleteVechileHistory = (id) => {
    dispatch(deleteVehicleHistory(id)).then((res) => {
      if (res?.payload?.code === 200) {
        toastService.success("Vehicle History deleted successfully");
        dispatch(
          fetchDriverVehicleHistory({
            page,
            driverId: state?._id,
          })
        );
      } else {
        toastService.error("Failed to delete Vehicle History");
      }
    });
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <div className="TitleBox">
              <h4 className="Title">Assigned Vehicle History</h4>
            </div>
          </div>
          <div className="backarrow">
            <BackButton />
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
                  <label>Select From</label>
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
                <div className="form-group">
                  <label>&nbsp;</label>
                  <a href="#" className="Button" download="">
                    <span className="download">
                      <img src="images/download.png" alt="" />
                    </span>
                    Download CSV
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="Small-Wrapper">
            <div className="TableList">
              <table style={{ width: "120%" }}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Vehicle ID</th>
                    <th>Vehicle No</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Added On</th>
                    <th>Total Bookings</th>
                    <th>Assigned On</th>
                    <th>Local Delivery</th>
                    {/* <th>Out Station</th>
                    <th>Express Delivery</th>
                    <th>Action</th> */}
                    <th>Assigned By</th>
                  </tr>
                </thead>
                <tbody>
                  {driverVehicleHistory?.result?.[0]?.paginationData?.map(
                    (res, i) => {
                      console.log({ res });
                      return (
                        <tr>
                          <td>{i + 1 + (page - 1) * 10}</td>
                          <td>{res?.vehicleData?.vehicleNumber}</td>
                          <td>{res?.vehicleData?.vehicleNumberPlate}</td>
                          <td>{res?.vehicleData?.vehicleType}</td>
                          <td>V-123</td>
                          <td>{res?.vehicleData?.totalBooking}</td>
                          <td>
                            {moment(res?.vehicleData?.assignOn).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          {/* <td>-</td>
                          <td>-</td>
                          <td>-</td> */}
                          <td>
                            {" "}
                            <div className="Actions">
                              <a
                                className="Red"
                                onClick={() => deleteVechileHistory(res?._id)}
                              >
                                <i className="fa fa-trash" aria-hidden="true" />
                              </a>
                            </div>
                          </td>

                          <td>
                            <span
                              className={
                                res.vehicleData.assignBy == "admin"
                                  ? "Green"
                                  : "Orange"
                              }
                            >
                              <a href="">{res?.vehicleData?.assignBy}</a>
                            </span>{" "}
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
                    {driverVehicleHistory?.result?.[0]?.totalCount?.[0]
                      ?.count || 0}
                  </span>
                </p>
              </div>

              <div className="PaginationRight">
                {driverVehicleHistory?.result?.[0]?.totalCount?.[0]?.count >
                  0 && (
                  <CommonPagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={
                      driverVehicleHistory?.result?.[0]?.totalCount?.[0]
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
  );
};

export default AssignedVichelHistory;
