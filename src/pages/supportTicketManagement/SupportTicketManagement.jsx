import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callRequestCount,
  getSupportTicketList,
  ticketReply,
} from "../../features/slices/supportTicketManagement";
import CloseChat from "./CloseChat";
import { Link } from "react-router-dom";
import { toastService } from "../../utils/toastify";
import CommonPagination from "../../components/CommonPagination";
import moment from "moment";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  closeChat: false,
  id: "",
};
const SupportTicketManagement = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe, closeChat, id } = iState;
  const dispatch = useDispatch();
  const { supportTickets, count } = useSelector((state) => {
    return state?.supportTicket;
  });
  console.log({ supportTickets, count });

  useEffect(() => {
    dispatch(getSupportTicketList({ page, timeframe }));
    dispatch(callRequestCount());
  }, [ timeframe]);

  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getSupportTicketList({
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
    dispatch(getSupportTicketList(data));
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getSupportTicketList({ page: 1 }));
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
    dispatch(ticketReply(data)).then((res) => {
      if (res?.payload?.code === 200) {
        toastService.success("Ticket closed successfully");
        dispatch(getSupportTicketList());
        handlecloseChatClose();
      } else {
        toastService.error("Failed to close ticket");
      }
    });
  };
  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(
      getSupportTicketList({ page, timeframe, startDate, endDate, search })
    );
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Support Ticket Management</h4>
            <div className="TitleLink">
              <Link className="TitleLink" to="sosRequest">
                Sos Requests List
              </Link>
              <Link className="TitleLink ml-5" to="callRequest">
                Call Requests <span>{count?.result}</span>
              </Link>
            </div>
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
                    name="startDate"
                    value={startDate}
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
                    value={timeframe}
                    disabled={startDate || endDate}
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
                    <th>Ticket ID</th>
                    {/* <th>Booking ID</th> */}
                    <th>User Name</th>
                    <th>Number</th>
                    <th>User Type</th>
                    <th>Date</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets?.result?.[0]?.paginationData?.map(
                    (res, i) => {
                      return (
                        <tr key={res?._id}>
                          <td>{i + 1 + (page - 1) * 10}</td>
                          <td>{res?.ticket_number}</td>
                          {/* <td>-</td> */}
                          <td>{res?.userData?.fullName}</td>
                          <td>{res?.userData?.phoneNumber}</td>
                          <td>{res?.userType || "-"}</td>
                          <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                          <td>{res?.description}</td>
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
                          <td>
                            <div className="Actions">
                              {res?.status !== "SOLVED" ? (
                                <Link to="reply" className="Blue" state={res}>
                                  Reply
                                </Link>
                              ) : (
                                <a className="Disabled">Reply</a> // Add styling for "disabled" look
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              {supportTickets?.result?.[0]?.paginationData?.length == 0 && (
                <p className="text-center">No records found.</p>
              )}
            </div>
            <div className="PaginationBox">
              <div className="PaginationLeft">
                <p>
                  Total Records :{" "}
                  <span>
                    {supportTickets?.result?.[0]?.totalCount?.[0]?.count || 0}
                  </span>
                </p>
              </div>

              <div className="PaginationRight">
                {supportTickets?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                  <CommonPagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={
                      supportTickets?.result?.[0]?.totalCount?.[0]?.count || 0
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

export default SupportTicketManagement;
