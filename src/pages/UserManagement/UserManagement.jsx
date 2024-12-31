import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  userList,
  userStatus,
} from "../../features/slices/userManagementReducer";
import moment from "moment";
import CommonPagination from "../../components/CommonPagination";
import { toastService } from "../../utils/toastify";
import ExportToExcel from "../../components/ExportToExcel";
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
};
const UserManagement = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, fromDate, toDate, timeframe } = iState;
  const dispatch = useDispatch();
  const userRef = useRef();
  const { users } = useSelector((state) => {
    return state?.userManagement;
  });
  useEffect(() => {
    dispatch(userList({ page, timeframe }));
  }, [timeframe, page]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        userList({
          search: search.trim(), 
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]); 

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(userList({ page }));
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(userStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(userList({ page }));
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
    dispatch(userList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      fromDate,
      toDate,
      page,
    };
    dispatch(userList(data));
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        {/* <div class="CommonLinks">
        <a href="Partner-management.html">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back
        </a>                    
    </div> */}
        <div className="commenone">
          <div className="TitleBox">
            <h4 className="Title">User Management</h4>
          </div>
          {/* <div class="backarrow">
            <a href="user.html">
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back
            </a>                    
        </div> */}
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
              <ExportToExcel ref={userRef} fileName="UserManagement" />
            </div>
          </div>
          <div className="TableList mt-4">
            <table style={{ width: "120%" }} ref={userRef}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Name </th>
                  <th>Mobile Number </th>
                  <th>Frequent Address </th>
                  <th>Created On </th>
                  <th>Current Status </th>
                  <th>Language Preference</th>
                  <th>GST Number </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.payload?.result?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (page - 1) * 10}</td>
                      <td>
                        <Link to={"userManagementDetail"}>{res?.fullName}</Link>
                      </td>
                      <td>{res?.phoneNumber} </td>
                      <td>{res?.address}</td>
                      <td>{moment(res?.createdAt).format("DD-MM-YYYY")} </td>
                      <td>
                        <span
                          className={
                            res?.userStatus == "ACTIVE" ? "Green" : "Red"
                          }
                        >
                          {res?.userStatus}
                        </span>{" "}
                      </td>
                      <td>{res?.language}</td>
                      <td>{res?.gstNumber}</td>
                      <td>
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
                  {users?.payload?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {users?.payload?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    users?.payload?.result?.[0]?.totalCount?.[0]?.count || 0
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

export default UserManagement;
