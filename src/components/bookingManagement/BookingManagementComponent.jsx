import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOngoingBookingList } from '../../features/slices/bookingManagementSlice';

const BookingManagementComponent = ({data}) => {
  console.log({data});
  
 
  return (
    <>
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
              <th>Payment Mode</th>
              <th>Incorrect Load Reported?</th>
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
              <td>v-1</td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>I-Line Wallet</td>
              <td>No</td>
              <td>
                <div className="Actions">
                  <Link className="Blue" to={"detail"}>
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </Link>
                  <span className="Orange">
                    <Link to="track">Track</Link>
                  </span>
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
              <td>v-1</td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>I-Line Wallet</td>
              <td>No</td>
              <td>
                <div className="Actions">
                  <a className="Blue" data-toggle="modal" data-target="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                  <span className="Orange">
                    <a href="driver-management-ride-details-completed.html">
                      Track
                    </a>
                  </span>
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
              <td>v-1</td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>I-Line Wallet</td>
              <td>No</td>
              <td>
                <div className="Actions">
                  <a className="Blue" data-toggle="modal" data-target="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                  <span className="Orange">
                    <a href="driver-management-ride-details-completed.html">
                      Track
                    </a>
                  </span>
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
              <td>v-1</td>
              <td>Delhi</td>
              <td>Noida</td>
              <td>1000</td>
              <td>Local</td>
              <td>dd/mm/yyyy &amp; hh:mm</td>
              <td>I-Line Wallet</td>
              <td>No</td>
              <td>
                <div className="Actions">
                  <a className="Blue" data-toggle="modal" data-target="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                  <span className="Orange">
                    <a href="driver-management-ride-details-completed.html">
                      Track
                    </a>
                  </span>
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
    </>
  );
}

export default BookingManagementComponent