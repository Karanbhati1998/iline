import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSupportTicketList } from '../../features/slices/supportTicketManagement';
import CloseChat from './CloseChat';
import { Link } from 'react-router-dom';
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe:"",
  closeChat: false,
  id: "",
};
const SupportTicketManagement = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, fromDate, toDate, timeframe, closeChat ,id} = iState;
  const dispatch = useDispatch();
   const { supportTickets } = useSelector((state) => {
     return state?.supportTicket;
   });
   console.log({ supportTickets });
   
  useEffect(() => {
    dispatch(getSupportTicketList({ page, timeframe }));
  }, [page, timeframe]);
  
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
      }, [search,timeframe, dispatch]); 
      const handleChange = (e) => {
        setUpdateState({...iState, [e.target.name]: e.target.value });
      };
        const handleApply = () => {
            const data = {
              search,
              fromDate,
              toDate,
              page,
            };
            dispatch(getSupportTicketList(data));
          };
            const handleReset = () => {
                setUpdateState(initialState);
                dispatch(getSupportTicketList({ page: 1 }));
              };
              const handleOpenChatClose=(id)=>{
                setUpdateState({...iState, closeChat: true, id });
              }
              const handlecloseChatClose=(id)=>{
                setUpdateState({...iState, closeChat: false });
              }
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Support Ticket Management</h4>
            <a className="TitleLink" href="support-request.html">
              Call Requests <span>2</span>
            </a>
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
                    <th>Ticket ID</th>
                    <th>Booking ID</th>
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
                          <td>B-123</td>
                          <td>John Smith</td>
                          <td>+91 9876543210</td>
                          <td>Customer</td>
                          <td>22-06-23</td>
                          <td>Lorem Ipsum</td>
                          <td>
                            <span
                              className="Green"
                              disabled={res?.status !== "PENDING"}
                              onClick={() => handleOpenChatClose(res?._id)}
                            >
                              Open
                            </span>
                          </td>
                          <td>
                            <div className="Actions">
                              <Link to="reply" className="Blue" state={res}>
                                Reply
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                  <tr>
                    <td>1</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span
                        className="Green"
                        data-toggle="modal"
                        data-target="#CloseChatModal"
                      >
                        Open
                      </span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span
                        className="Green"
                        data-toggle="modal"
                        data-target="#CloseChatModal"
                      >
                        Open
                      </span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span
                        className="Green"
                        data-toggle="modal"
                        data-target="#CloseChatModal"
                      >
                        Open
                      </span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span
                        className="Green"
                        data-toggle="modal"
                        data-target="#CloseChatModal"
                      >
                        Open
                      </span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span className="Red">Closed</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span className="Red">Closed</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span className="Red">Closed</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span className="Red">Closed</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span className="Red">Closed</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>C# 98787886</td>
                    <td>B-123</td>
                    <td>John Smith</td>
                    <td>+91 9876543210</td>
                    <td>Customer</td>
                    <td>22-06-23</td>
                    <td>Lorem Ipsum</td>
                    <td>
                      <span className="Red">Closed</span>
                    </td>
                    <td>
                      <div className="Actions">
                        <a className="Blue">Reply</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {closeChat && <CloseChat handlecloseChatClose={handlecloseChatClose} />}
    </>
  );
}

export default SupportTicketManagement