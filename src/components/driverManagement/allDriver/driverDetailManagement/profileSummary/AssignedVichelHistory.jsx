import React from 'react'

const AssignedVichelHistory = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <div className="TitleBox">
              <h4 className="Title">Assigned Vehicle History</h4>
            </div>
          </div>
          <div className="backarrow">
            <a href="driver-management-all-driver-details.html">
              <i className="fa fa-long-arrow-left" aria-hidden="true" /> Back
            </a>
          </div>
        </div>
        <div className="SettingsTabs">
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
          </div>
          <div className="Small-Wrapper">
            <div className="TableList">
              <table style={{ width: "120%" }}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Vehicle ID</th>
                    <th>Vehicle No</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Added On</th>
                    <th>Total Bookings</th>
                    <th>Assigned On</th>
                    <th>Local Delivery</th>
                    <th>Out Station</th>
                    <th>Express Delivery</th>
                    <th>Action</th>
                    <th>Assigned By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>V-11</td>
                    <td>UP-12-1010</td>
                    <td>Type 1</td>
                    <td>V-123</td>
                    <td>200</td>
                    <td>12-12-2024</td>
                    <td>12</td>
                    <td>34</td>
                    <td>100</td>
                    <td>
                      {" "}
                      <div className="Actions">
                        <a className="Red" href="">
                          <i className="fa fa-trash" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                   
                    <td>
                      <span className="Green">
                        <a href="">Admin</a>
                      </span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>V-12</td>
                    <td>UP-12-1010</td>
                    <td>Type 1</td>
                    <td>V-123</td>
                    <td>200</td>
                    <td>12-12-2024</td>
                    <td>12</td>
                    <td>34</td>
                    <td>100</td>
                    <td>
                      {" "}
                      <div className="Actions">
                        <a className="Red" href="">
                          <i className="fa fa-trash" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                   
                    <td>
                      <span className="Orange">
                        <a href="">Sub-Admin</a>
                      </span>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignedVichelHistory