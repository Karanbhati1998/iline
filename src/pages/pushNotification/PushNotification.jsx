import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteNotification,
  getAllNotificationList,
  getNotificationList,
  getSosNotificationList,
  resendNotification,
} from "../../features/slices/notification";
import CommonPagination from "../../components/CommonPagination";
import moment from "moment";
import { toastService } from "../../utils/toastify";
import DeleteModal from "../../components/DeleteModal";
import ExportToExcel from "../../components/ExportToExcel";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModals: false,
  id: "",
  userGroup:"",
};
const PushNotification = () => {
  const [iState, setUpdateState] = useState(initialState);
  const {
    page,
    search,
    startDate,
    endDate,
    timeframe,
    id,
    deleteModals,
    userGroup,
  } = iState;
  const dispatch = useDispatch();
  const notificationRef = useRef();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const data = {
      search,
      startDate,
      endDate,
      timeframe,
      limit: 999999,
      userGroup,
    };
    dispatch(getAllNotificationList(data)).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        setAllData(res?.payload);
      }
    });
  }, [timeframe, page, endDate, search, startDate, userGroup]);
  const { notification } = useSelector((state) => {
    return state.notification;
  });
  console.log({ notification });

  useEffect(() => {
    dispatch(
      getNotificationList({
        page,
      })
    );
    dispatch(
      getSosNotificationList({
        page,
      })
    );
  }, []);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getNotificationList({
          search: search.trim(),
          timeframe,
          userGroup,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, userGroup]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(
      getNotificationList({ page, timeframe, startDate, endDate, search })
    );
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getNotificationList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
    };
    dispatch(getNotificationList(data));
  };
  const handleResendNotification = (id) => {
    dispatch(resendNotification({ id })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Notification resent successfully");
      } else {
        toastService.error("Failed to resend notification");
      }
    });
  };
  const handleClose = () => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModals: false,
      id: "",
    }));
  };
  const handleOpen = (id) => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModals: true,
      id,
    }));
  };
  const handleDelete = () => {
    dispatch(deleteNotification({ id })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Notification deleted successfully");
        setUpdateState((prev) => ({
          ...prev,
          deleteModals: false,
        }));
        dispatch(getNotificationList({ page }));
      } else {
        toastService.error("Failed to delete notification");
      }
    });
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Push Notification</h4>
            <div className="TitleLink">
              {" "}
              <Link to="add" className="TitleLink">
                Add Notification
              </Link>
            </div>
          </div>

          <div className="SettingsTabs mt-4">
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
                  <div className="form-group">
                    <label>Select User group</label>
                    <select
                      className="form-control"
                      name="userGroup"
                      onChange={handleChange}
                      value={userGroup}
                    >
                      <option>Select</option>
                      <option value={"DRIVER"}>Driver</option>
                      <option value={"USER"}>User</option>
                    </select>
                  </div>
                  <ExportToExcel
                    ref={notificationRef}
                    fileName="notificationExcel"
                  />
                </div>
              </div>
            </div>

            <div className="Small-Wrapper">
              <div className="TableList" style={{ display: "none" }}>
                <table ref={notificationRef}>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Notification ID</th>
                      <th>Notification Title </th>
                      <th>User Group</th>
                      <th>Date Sent</th>
                      <th>Resend</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData?.result?.[0]?.paginationData?.map((res, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1 + (page - 1) * 10}</td>
                          <td>
                            <a>{res?.noti_number}</a>
                          </td>
                          <td>{res?.title} </td>
                          <td>{res?.userType}</td>
                          <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>

                          <td>
                            <span
                              className="Red"
                              onClick={() => handleResendNotification(res?._id)}
                            >
                              Resend
                            </span>
                          </td>
                          <td>
                            <div className="Actions">
                              <Link to="detail" className="" state={res}>
                                <i
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
                              </Link>
                              <Link to="edit" className="Green" state={res}>
                                <i className="fa fa-pencil" />
                              </Link>
                              <a
                                className="Red"
                                onClick={() => handleOpen(res?._id)}
                              >
                                <i className="fa fa-trash" />
                              </a>
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
                      <th>Notification ID</th>
                      <th>Notification Title </th>
                      <th>User Group</th>
                      <th>Date Sent</th>
                      <th>Resend</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notification?.result?.[0]?.paginationData?.map(
                      (res, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1 + (page - 1) * 10}</td>
                            <td>
                              <a>{res?.noti_number}</a>
                            </td>
                            <td>{res?.title} </td>
                            <td>{res?.userType}</td>
                            <td>
                              {moment(res?.createdAt).format("DD-MM-YYYY")}
                            </td>

                            <td>
                              <span
                                className="Red"
                                onClick={() =>
                                  handleResendNotification(res?._id)
                                }
                              >
                                Resend
                              </span>
                            </td>
                            <td>
                              <div className="Actions">
                                <Link to="detail" className="" state={res}>
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  />
                                </Link>
                                <Link to="edit" className="Green" state={res}>
                                  <i className="fa fa-pencil" />
                                </Link>
                                <a
                                  className="Red"
                                  onClick={() => handleOpen(res?._id)}
                                >
                                  <i className="fa fa-trash" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
                {notification?.result?.[0]?.paginationData?.length == 0 && (
                  <p className="text-center">No records found.</p>
                )}
              </div>
              <div className="PaginationBox">
                <div className="PaginationLeft">
                  <p>
                    Total Records :{" "}
                    <span>
                      {notification?.result?.[0]?.totalCount?.[0]?.count || 0}
                    </span>
                  </p>
                </div>
                <div className="PaginationRight">
                  {notification?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                    <CommonPagination
                      activePage={page}
                      itemsCountPerPage={10}
                      totalItemsCount={
                        notification?.result?.[0]?.totalCount?.[0]?.count || 0
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
      {deleteModals && (
        <DeleteModal
          handleClose={handleClose}
          handleDelete={handleDelete}
          statement="notification"
        />
      )}
    </>
  );
};

export default PushNotification;
