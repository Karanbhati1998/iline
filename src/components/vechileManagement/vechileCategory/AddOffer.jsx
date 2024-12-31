import React from 'react'

const AddOffer = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Add Vehicle Category</h4>
          <div className="TitleLink">
            <a className="TitleLink" href="vehicle-category-listing.html">
              <i className="fa fa-arrow-left" aria-hidden="true" />
              Back
            </a>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Add offer</h4>
          </div>
          <div className="CommonForm">
            {/* <h4>Category Profile</h4> */}
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter the Discount Label </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Label"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter Discount Rate (in %) </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the discount rate"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Upload icon </label>
                  <div className="UploadBox">
                    <div className="Upload">
                      <i className="fa fa-upload" /> <span>Upload Icon</span>
                      <input type="file" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>End Date</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-sm-4 mt-4">
                <button className="Button">ADD</button>
              </div>
            </div>
          </div>
          <div className="FilterArea mb-4">
            <div className="FilterLeft"></div>
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
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Discount Label</th>
                  <th>Discount Rate (in %)</th>
                  <th>Banner</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Upto 10% off</td>
                  <td>10</td>
                  <td>
                    <figure>
                      <img src="images/user.png" />
                    </figure>
                  </td>
                  <td>dd/mm/yyyy</td>
                  <td>-</td>
                  <td>
                    <span className="Green">Active</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href="">
                        <i className="fa fa-pencil" aria-hidden="true" />
                      </a>
                      <a className="Red" href="">
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Upto 10% off</td>
                  <td>10</td>
                  <td>
                    <figure>
                      <img src="images/user.png" />
                    </figure>
                  </td>
                  <td>dd/mm/yyyy</td>
                  <td>-</td>
                  <td>
                    <span className="Red">Inactive</span>
                  </td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href="">
                        <i className="fa fa-pencil" aria-hidden="true" />
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
      </div>
    </div>
  );
}

export default AddOffer