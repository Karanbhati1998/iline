import React from 'react'

const TotalPaymentfromP2pDriverTab = () => {
  return (
    <>
      <div className="tab-pane fade active show" id="TotalPaymentToP2PDriver">
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select className="form-control">
                  <option>Select</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="form-group">
                <label>From</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>To</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button className="Button">Apply</button>
                <button className="Button Cancel">
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
                  <td>
                    <a href="">v-1</a>
                  </td>
                  <td>Delhi</td>
                  <td>Noida</td>
                  <td>1000</td>
                  <td>Local</td>
                  <td>dd/mm/yyyy &amp; hh:mm</td>
                  <td>I-Line Wallet</td>
                  <td>No</td>
                  <td>
                    <div className="Actions">
                      <a
                        className="Blue"
                        href="booking-management-cancelled-booking-details.html"
                      >
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </a>
                      <span className="Orange">
                        <a href="booking-management-canceled-track-details.html">
                          Track
                        </a>
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
                  <td>
                    <a href="">v-1</a>
                  </td>
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
                  <td>
                    <a href="">v-1</a>
                  </td>
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
                  <td>
                    <a href="">v-1</a>
                  </td>
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
        </div>
      </div>
    </>
  );
}

export default TotalPaymentfromP2pDriverTab