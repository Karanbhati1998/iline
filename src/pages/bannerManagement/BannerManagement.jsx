import React, { useState } from 'react'
import UploadBanner from '../../components/banner/UploadBanner';

const BannerManagement = () => {
    const [showUploadBAnnerModal,setShowUploadBAnnerModal]=useState(false)
    const handleClose=()=>{
        setShowUploadBAnnerModal(false);
    }
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Banner Management</h4>
            <a
              className="TitleLink"
              onClick={() => {
                setShowUploadBAnnerModal(true);
              }}
            >
              Upload New banner
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
                    <th>Banner ID</th>
                    <th>Banner Image</th>
                    <th>Uploaded On</th>
                    <th>Removed On</th>
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
                      <img src="images/car.png" />
                    </td>
                    <td>dd/mm/yyyy</td>
                    <td>dd/mm/yyyy</td>
                    <td>
                      <div className="Actions">
                        <a className="Blue" href="">
                          <i className="fa fa-spinner" aria-hidden="true" />
                        </a>
                        <a className="Red" href="">
                          <i className="fa fa-trash" aria-hidden="true" />
                        </a>
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
                        B-141
                      </a>
                    </td>
                    <td>
                      <img src="images/car.png" />
                    </td>
                    <td>dd/mm/yyyy</td>
                    <td>dd/mm/yyyy</td>
                    <td>
                      <div className="Actions">
                        <a className="Blue" href="">
                          <i className="fa fa-spinner" aria-hidden="true" />
                        </a>
                        <a className="Red" href="">
                          <i className="fa fa-trash" aria-hidden="true" />
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
                        B-141
                      </a>
                    </td>
                    <td>
                      <img src="images/car.png" />
                    </td>
                    <td>dd/mm/yyyy</td>
                    <td>dd/mm/yyyy</td>
                    <td>
                      <div className="Actions">
                        <a className="Blue" href="">
                          <i className="fa fa-spinner" aria-hidden="true" />
                        </a>
                        <a className="Red" href="">
                          <i className="fa fa-trash" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      {showUploadBAnnerModal && <UploadBanner handleClose={handleClose} />}
    </>
  );
}

export default BannerManagement