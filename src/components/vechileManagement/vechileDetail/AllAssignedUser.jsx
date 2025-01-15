import React from 'react'

const AllAssignedUser = () => {
  return (
    <div className="tab-pane fade active show" id="AllAssignedDrivers">
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
              <label>From Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>To Date</label>
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
              <label>Duration</label>
              <select className="form-control">
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
                <th>Name of Drivers</th>
                <th>No of times Assigned </th>
                <th>View Dates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Kanha</td>
                <td>10</td>
                <td>
                  <div className="Actions">
                    <a
                      className=""
                      data-toggle="modal"
                      data-target="#ViewDateModal"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Kanha</td>
                <td>10</td>
                <td>
                  <div className="Actions">
                    <a
                      className=""
                      data-toggle="modal"
                      data-target="#ViewDateModal"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Kanha</td>
                <td>10</td>
                <td>
                  <div className="Actions">
                    <a
                      className=""
                      data-toggle="modal"
                      data-target="#ViewDateModal"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Kanha</td>
                <td>10</td>
                <td>
                  <div className="Actions">
                    <a
                      className=""
                      data-toggle="modal"
                      data-target="#ViewDateModal"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllAssignedUser