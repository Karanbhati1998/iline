import React from 'react'

const PushNotification = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Push Notification</h4>
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
                    <th>Notification ID</th>
                    <th>Notification Title </th>
                    <th>User Group</th>
                    <th>Date Sent</th>
                    <th>Send To All</th>
                    <th>Resend</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <a href="">N-101</a>
                    </td>
                    <td>Title 1 </td>
                    <td>Group 1 </td>
                    <td>12/12/2024</td>
                    <td>Send to allt</td>
                    <td>Resend</td>
                    <td>
                      <div className="Actions">
                        <a
                          className=""
                          href="push-notification-screen-details.html"
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </a>
                        <a
                          className="Green"
                          href="push-notification-addsubadmin.html"
                        >
                          <i className="fa fa-pencil" />
                        </a>
                        <a
                          className="Red"
                          data-toggle="modal"
                          data-target="#CityDeleteModal"
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <a href="">N-102</a>
                    </td>
                    <td>Title 1 </td>
                    <td>Group 1 </td>
                    <td>12/12/2024</td>
                    <td>Send to allt</td>
                    <td>Resend</td>
                    <td>
                      <div className="Actions">
                        <a
                          className=""
                          href="push-notification-screen-details.html"
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </a>
                        <a
                          className="Green"
                          href="push-notification-addsubadmin.html"
                        >
                          <i className="fa fa-pencil" />
                        </a>
                        <a
                          className="Red"
                          data-toggle="modal"
                          data-target="#CityDeleteModal"
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </div>
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

export default PushNotification