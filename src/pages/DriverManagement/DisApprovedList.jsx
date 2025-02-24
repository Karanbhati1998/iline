import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  driverStatus,
  fetchRejectDriverList,
} from "../../features/slices/DriverManagement/allDriver/allDriverReducer";
import { toastService } from "../../utils/toastify";
import CommonPagination from "../../components/CommonPagination";
import { canPerformAction } from "../../utils/deniedAccess";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  deleteModal: false,
  id: "",
};
const DisApprovedList = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe, deleteModal, id } =
    iState;
  const dispatch = useDispatch();
  const iLineRef = useRef();
  const { rejectDriverList } = useSelector((state) => {
    return state?.driverManagementAllDrivers;
  });
  useEffect(() => {
    dispatch(fetchRejectDriverList({ page, timeframe }));
  }, [ timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        fetchRejectDriverList({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(fetchRejectDriverList({ page, timeframe, startDate, endDate }));
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(driverStatus(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(fetchRejectDriverList({ page }));
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
    dispatch(fetchRejectDriverList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
    };
    dispatch(fetchRejectDriverList(data));
  };
  console.log({ rejectDriverList });

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Disapprove Drivers</h4>
        </div>
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
                <button className="Button Cancel" onClick={handleReset}>
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TableList">
            <table ref={iLineRef}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Driver ID</th>
                  <th>Driver Name</th>
                  <th>Contact Number</th>
                  <th>Email ID</th>
                  <th>Registered On</th>
                  <th>Status</th>
                  <th>Vehicle Status</th>
                  <th>Reject Reason</th>
                </tr>
              </thead>
              <tbody>
                {rejectDriverList?.result?.[0]?.paginationData?.map(
                  (res, i) => {
                    console.log({ res });

                    return (
                      <tr>
                        <td>{i + 1 + (page - 1) * 10}</td>
                        <td>{res?.driver_number}</td>
                        <td>{res?.fullName}</td>
                        <td>{res?.phoneNumber}</td>
                        <td>{res?.email ? res?.email : "-"}</td>
                        <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{res?.userStatus}</td>
                        <td>
                          <a>
                            <span className="Orange">
                              {res?.approvedStatus}
                            </span>
                          </a>
                        </td>
                        <td>{res?.rejectReason}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {rejectDriverList?.result?.[0]?.paginationData?.length == 0 && (
              <p className="text-center">No records found.</p>
            )}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {rejectDriverList?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {rejectDriverList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    rejectDriverList?.result?.[0]?.totalCount?.[0]?.count || 0
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
  );
};

export default DisApprovedList;
