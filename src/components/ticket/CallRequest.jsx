import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callRequestList,
  statusChangedCallRequest,
  ticketReply,
} from "../../features/slices/supportTicketManagement";
import { toastService } from "../../utils/toastify";
import moment from "moment";
import CloseChat from "../../pages/supportTicketManagement/CloseChat";
import CommonPagination from "../CommonPagination";
import BackButton from "../BackButton";
import { canPerformAction } from "../../utils/deniedAccess";
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
  closeChat: false,
};
const CallRequest = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, fromDate, toDate, timeframe, closeChat, id } = iState;
  const dispatch = useDispatch();
  const { callRequestData } = useSelector((state) => {
    return state?.supportTicket;
  });
  console.log({ callRequestData });

  useEffect(() => {
    dispatch(callRequestList({ page, timeframe }));
  }, [page, timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        callRequestList({
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
      fromDate,
      toDate,
      page,
    };
    dispatch(callRequestList(data));
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(callRequestList({ page: 1 }));
  };
  const handleOpenChatClose = (id, type) => {
    if (type == "PENDING") setUpdateState({ ...iState, closeChat: true, id });
  };
  const handlecloseChatClose = (id) => {
    setUpdateState({ ...iState, closeChat: false });
  };
  const handlecloseChat = () => {
    const data = {
      id,
      status: "Solved",
    };
    dispatch(statusChangedCallRequest(data)).then((res) => {
      if (res?.payload?.code === 200) {
        toastService.success("Ticket closed successfully");
        dispatch(callRequestList());
        handlecloseChatClose();
      } else {
        toastService.error("Failed to close ticket");
      }
    });
  };
  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(callRequestList({ page }));
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <a className="TitleLink">
              <BackButton />
            </a>
          </div>
          <div className="TitleBox">
            <h4 className="Title">List of Call Requests</h4>
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
                  <label>From</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    value={fromDate}
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
                  <label>Duration</label>
                  <select
                    className="form-control"
                    name="timeframe"
                    onChange={handleChange}
                    disabled={fromDate || toDate}
                  >
                    <option>Select </option>
                    <option value="Today">Today</option>
                    <option value="Week">This Week</option>
                    <option value="Month">This Month</option>
                    <option value="Month">This Year</option>
                  </select>
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
                    <th>Request ID</th>
                    <th>User ID</th>
                    <th>User Type</th>
                    <th>User Name</th>
                    <th>Number</th>
                    <th>Date</th>
                    <th>Reason for request</th>
                    {canPerformAction("Support Ticket Management") && (
                      <th>Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {callRequestData?.result?.[0]?.paginationData?.map(
                    (res, i) => {
                      return (
                        <tr key={res?._id}>
                          <td>{i + 1 + (page - 1) * 10}</td>
                          <td>{res?.request_number}</td>
                          <td>{res?.userId}</td>
                          <td>-</td>
                          <td>{res?.userData?.fullName}</td>
                          <td>{res?.phoneNumber}</td>
                          <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                          <td>App Not Working</td>
                          {canPerformAction("Support Ticket Management") && (
                            <td>
                              <span
                                className={
                                  res?.status == "PENDING" ? "Red" : "Green"
                                }
                                disabled={res?.status == "SOLVED"}
                                onClick={() =>
                                  handleOpenChatClose(res?._id, res?.status)
                                }
                              >
                                {res?.status !== "PENDING" ? "Closed" : "Open"}
                              </span>
                            </td>
                          )}
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
                    {callRequestData?.result?.[0]?.totalCount?.[0]?.count || 0}
                  </span>
                </p>
              </div>

              <div className="PaginationRight">
                {callRequestData?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                  <CommonPagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={
                      callRequestData?.result?.[0]?.totalCount?.[0]?.count || 0
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
      {closeChat && (
        <CloseChat
          handlecloseChatClose={handlecloseChatClose}
          handlecloseChat={handlecloseChat}
        />
      )}
    </>
  );
};

export default CallRequest;
