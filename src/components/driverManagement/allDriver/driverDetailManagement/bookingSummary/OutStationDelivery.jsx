import React from 'react'

const OutStationDelivery = () => {
  return (
    <>
      {" "}
      <div className="RiderArea">
        <div className="RiderBox">
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
                <label>Select From</label>
                <select className="form-control">
                  <option value="select">--Select--</option>
                  <option value="Month">Today</option>
                  <option value="Month">This week</option>
                  <option value="Month">This month</option>
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
                  Download Receipt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="TableList">
        <table style={{ width: "120%" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Booking ID</th>
              <th>Driver ID</th>
              <th>Driver Name</th>
              <th>Vehicle ID</th>
              <th>Assigned Vehicle</th>
              <th>Total Cost</th>
              <th>Booking Status</th>
              <th>Booking Date</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Payment Mode</th>
              <th>Payment Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>OR#11</td>
              <td>DR-01</td>
              <td>John</td>
              <td>V-123</td>
              <td>UP-12-1010</td>
              <td>200</td>
              <td>
                <a href="user-management-ride-details-completed.html">
                  <span className="Green">Completed</span>
                </a>
              </td>
              <td>12-12-2024</td>
              <td>Delhi</td>
              <td>Agra</td>
              <td>Mode 1</td>
              <td>Completed</td>
              <td>
                <div className="Actions">
                  <a className="Blue" href="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>OR#11</td>
              <td>DR-01</td>
              <td>John</td>
              <td>V-123</td>
              <td>UP-12-1010</td>
              <td>200</td>
              <td>
                <a href="user-management-ride-details-ongoing.html">
                  <span className="Yellow">Ongoing</span>
                </a>
              </td>
              <td>12-12-2024</td>
              <td>Delhi</td>
              <td>Agra</td>
              <td>Mode 1</td>
              <td>Completed</td>
              <td>
                <div className="Actions">
                  <a className="Blue" href="">
                    <i className="fa fa-info-circle" aria-hidden="true" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>OR#11</td>
              <td>DR-01</td>
              <td>John</td>
              <td>V-123</td>
              <td>UP-12-1010</td>
              <td>200</td>
              <td>
                <a href="user-management-ride-details-cancelled.html">
                  <span className="Red">Cancelled</span>
                </a>
              </td>
              <td>12-12-2024</td>
              <td>Delhi</td>
              <td>Agra</td>
              <td>Mode 1</td>
              <td>Completed</td>
              <td>
                <div className="Actions">
                  <a className="Blue" href="">
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
    </>
  );
}

export default OutStationDelivery