import React from 'react'

const ChangeManagement = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Change Management</h4>
        </div>
        <div className="SettingsTabs mt-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#Ongoing">
                New
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#Scheduled">
                Approved
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#Completed">
                Rejected
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="Ongoing">
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
                      <button
                        className="Button Cancel"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Reset Filter"
                      >
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
                        <th>Change Req. ID</th>
                        <th>Change In</th>
                        <th>Changed By (Name &amp; Role)</th>
                        <th>Date &amp; Time of Change</th>
                        <th>View Changed Content</th>
                        <th>Approve/Reject Deals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <span className="Green">
                              <a href="booking-management-outgoing-track-details.html">
                                Approve
                              </a>
                            </span>{" "}
                            &nbsp;
                            <span className="Red">
                              <a href="booking-management-outgoing-track-details.html">
                                Reject
                              </a>
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="">
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <span className="Green">
                              <a href="">Approve</a>
                            </span>{" "}
                            &nbsp;
                            <span className="Red">
                              <a href="">Reject</a>
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="">
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <span className="Green">
                              <a href="">Approve</a>
                            </span>{" "}
                            &nbsp;
                            <span className="Red">
                              <a href="">Reject</a>
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a className="Blue" href="">
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <span className="Green">
                              <a href="">Approve</a>
                            </span>{" "}
                            &nbsp;
                            <span className="Red">
                              <a href="">Reject</a>
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="Scheduled">
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
                </div>
              </div>
              <div className="Small-Wrapper">
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Change Req. ID</th>
                        <th>Change In</th>
                        <th>Changed By (Name &amp; Role)</th>
                        <th>Date &amp; Time of Change</th>
                        <th>View Changed Content</th>
                        <th>Approve/Reject Deals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="Completed">
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
                </div>
              </div>
              <div className="Small-Wrapper">
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Change Req. ID</th>
                        <th>Change In</th>
                        <th>Changed By (Name &amp; Role)</th>
                        <th>Date &amp; Time of Change</th>
                        <th>View Changed Content</th>
                        <th>Approve/Reject Deals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>D-141</td>
                        <td>Driver Management </td>
                        <td>Ram (sub-Admin)</td>
                        <td>dd/mm/yyyy hh:mm</td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="Actions">
                            <a
                              className="Blue"
                              href="booking-management-outgoing-booking-details.html"
                            >
                              <i className="fa fa-spinner" aria-hidden="true" />
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
      </div>
    </div>
  );
}

export default ChangeManagement