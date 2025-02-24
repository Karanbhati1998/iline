import React, { useEffect, useState } from "react";
import BookingManagementComponent from "../BookingManagementComponent";
import { useDispatch, useSelector } from "react-redux";
import { getScheduledBookingList } from "../../../features/slices/bookingManagementSlice";
import { toastService } from "../../../utils/toastify";
import CommonPagination from "../../CommonPagination";
import moment from "moment";
import { Link } from "react-router-dom";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  id: "",
};
const Scheduled = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe, id } = iState;
  const dispatch = useDispatch();
  const { scheduledBookingList } = useSelector((state) => {
    return state.bookingManagement;
  });
  useEffect(() => {
    dispatch(getScheduledBookingList());
  }, []);
  useEffect(() => {
    if (categoryId) {
      dispatch(
        getScheduledBookingList({
          categoryId,
          page,
        })
      );
    }
  }, [page, categoryId]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getScheduledBookingList({
          categoryId,
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getScheduledBookingList({ categoryId, page }));
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getScheduledBookingList({ categoryId, page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
      categoryId,
    };
    dispatch(getScheduledBookingList(data));
  };
  console.log({ scheduledBookingList });

  return (
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
      <div className="TableList mt-4">
        <table style={{ width: "150%" }}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Booking ID</th>
              <th>Driver ID </th>
              <th>Driver Name</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Vehicle ID</th>
              <th>Pickup Location</th>
              <th>Drop off Location</th>
              <th>Total fare (in Rs)</th>
              <th>Service Type</th>
              <th>Booking Date &amp; Time</th>
              <th>Total Distance (in KM)</th>
              <th>Duration (in hrs &amp;min)</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <a
                  className="Blue"
                  data-toggle="modal"
                  data-target="#ApprovalModal"
                >
                  B-141
                </a>
              </td>
              <td>
                <a href="">D-101</a>
              </td>
              <td>Kanha </td>
              <td>
                <a href="">202</a>
              </td>
              <td>Kanha</td>
              <td>
                <a href="">v-1</a>
              </td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>25</td>
              <td>1 hr 20 min</td>
              <td>I-Line Wallet</td>
              <td>
                <div className="Actions">
                  <Link to="scheduledetail" className="Blue">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <a
                  className="Blue"
                  data-toggle="modal"
                  data-target="#ApprovalModal"
                >
                  B-142
                </a>
              </td>
              <td>
                <a href="">D-102</a>
              </td>
              <td>Kanha </td>
              <td>
                <a href="">202</a>
              </td>
              <td>Kanha</td>
              <td>
                <a href="">v-1</a>
              </td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>25</td>
              <td>1 hr 20 min</td>
              <td>I-Line Wallet</td>
              <td>
                <div className="Actions">
                  <a className="Blue" data-toggle="modal" data-target="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <a
                  className="Blue"
                  data-toggle="modal"
                  data-target="#ApprovalModal"
                >
                  B-143
                </a>
              </td>
              <td>
                <a href="">D-103</a>
              </td>
              <td>Kanha </td>
              <td>
                <a href="">202</a>
              </td>
              <td>Kanha</td>
              <td>
                <a href="">v-1</a>
              </td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>25</td>
              <td>1 hr 20 min</td>
              <td>Cash</td>
              <td>
                <div className="Actions">
                  <a className="Blue" data-toggle="modal" data-target="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <a
                  className="Blue"
                  data-toggle="modal"
                  data-target="#ApprovalModal"
                >
                  B-144
                </a>
              </td>
              <td>
                <a href="">D-104</a>
              </td>
              <td>Kanha </td>
              <td>
                <a href="">202</a>
              </td>
              <td>Kanha</td>
              <td>
                <a href="">v-1</a>
              </td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>25</td>
              <td>1 hr 20 min</td>
              <td>Cash</td>
              <td>
                <div className="Actions">
                  <a className="Blue" data-toggle="modal" data-target="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="PaginationBox">
        <div className="PaginationLeft">
          <p>
            Total Records : <span>200</span>
          </p>
        </div>
        <div className="PaginationRight">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <i className="fa fa-angle-double-left" />
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <i className="fa fa-angle-left" />
              </a>
            </li>
            <li className="active">
              <a href="javascript:void(0);">1</a>
            </li>
            <li>
              <a href="javascript:void(0);">2</a>
            </li>
            <li>
              <a href="javascript:void(0);">3</a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <i className="fa fa-angle-right" />
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <i className="fa fa-angle-double-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Scheduled;
