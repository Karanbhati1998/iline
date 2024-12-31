import React from 'react'

const SubAdmin = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Sub Admin Management</h4>
          <a
            className="TitleLink"
            data-toggle="modal"
            data-target="#SubAdminUserAdd"
          >
            Add Admin
          </a>
        </div>
        <div className="CommonLinks">
          <ul>
            <li className="active">
              <a href="sub-admin-management.html">Sub Admins</a>
            </li>
            <li>
              <a href="sub-admin-roles.html">Roles</a>
            </li>
          </ul>
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
                  <th>Sub Admin ID</th>
                  <th>Sub Admin Name</th>
                  <th>Role</th>
                  <th>Email ID</th>
                  <th>Registered on</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>12345</td>
                  <td>Mr. Rahul </td>
                  <td>Inputter</td>
                  <td>r@gmail.com</td>
                  <td>12-02-23</td>
                  <td>
                    <span className="Green">Active</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <a className="Blue" href="sub-admin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#DeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>12345</td>
                  <td>Mr. Rahul </td>
                  <td>Inputter</td>
                  <td>r@gmail.com</td>
                  <td>12-02-23</td>
                  <td>
                    <span className="Green">Active</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <a className="Blue" href="sub-admin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#DeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>12345</td>
                  <td>Mr. Rahul </td>
                  <td>Inputter</td>
                  <td>r@gmail.com</td>
                  <td>12-02-23</td>
                  <td>
                    <span className="Green">Active</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <a className="Blue" href="sub-admin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#DeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>12345</td>
                  <td>Mr. Rahul </td>
                  <td>Inputter</td>
                  <td>r@gmail.com</td>
                  <td>12-02-23</td>
                  <td>
                    <span className="Green">Active</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <a className="Blue" href="sub-admin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#DeleteModal"
                      >
                        <i className="fa fa-trash" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>12345</td>
                  <td>Mr. Rahul </td>
                  <td>Inputter</td>
                  <td>r@gmail.com</td>
                  <td>12-02-23</td>
                  <td>
                    <span className="Green">Active</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <label className="Switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <a className="Blue" href="sub-admin-details.html">
                        <i className="fa fa-eye" />
                      </a>
                      <a
                        className="Green"
                        data-toggle="modal"
                        data-target="#SubAdminUserEdit"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                      <a
                        className="Red"
                        data-toggle="modal"
                        data-target="#DeleteModal"
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
  );
}

export default SubAdmin