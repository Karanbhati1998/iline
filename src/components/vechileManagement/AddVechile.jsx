import React from 'react'

const AddVechile = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        {/* <div class="TitleBox"> 
          <h4 class="Title">Add Vehicle Category</h4> 
          <div class="backarrow">
              <a href="vehicle-management.html">
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back
              </a>                    
          </div>
      </div> */}
        <div className="TitleBox">
          <h4 className="Title">Add New Vehicle</h4>
          <div className="TitleLink">
            <a className="TitleLink" href="vehicle-management.html">
              <i className="fa fa-arrow-left" aria-hidden="true" />
              Back
            </a>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            <h4>1.Vehicle Information</h4>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Vehicle Category</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Vehicle Registration No.</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Vehicle Registration Expiry Date</label>
                  <input type="date" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Vehicle Color/Model/Manufacturer</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Vehicle Insurance Expiry Date</label>
                  <input type="date" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Upload Vehicle Image</label>
                  <div className="UploadBox">
                    <div className="Upload">
                      <i className="fa fa-upload" /> <span>Upload Image</span>
                      <input type="file" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4>2.Documents</h4>
            <div className="Small-Wrapper mt-4">
              <div className="row">
                <div className="col-sm-6">
                  <div className="InformationBox">
                    <h3 className="mb-4">
                      Adhaar Card
                      <button className="Button" style={{ float: "right" }}>
                        Upload
                      </button>
                    </h3>
                    <div className="VehicleDocument">
                      <aside>
                        <p>
                          <strong>Registration Certificate Number</strong>
                          <span>65465165165FSA54</span>
                        </p>
                        {/* <p>
                                          <strong>Expiry</strong>
                                          <span>10/09/2023</span>
                                      </p> */}
                      </aside>
                      <ul>
                        <li>
                          <span>Document</span>
                          <figure>
                            <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                          </figure>
                        </li>
                        {/* <li>
                                          <strong class="Red"><i class="fa fa-exclamation-triangle"></i> Expiring in 5 days</strong>
                                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="InformationBox">
                    <h3 className="mb-4">
                      Drivers License{" "}
                      <button className="Button" style={{ float: "right" }}>
                        Upload
                      </button>
                    </h3>
                    <div className="VehicleDocument">
                      <aside>
                        <p>
                          <strong>Registration Certificate Number</strong>
                          <span>65465165165FSA54</span>
                        </p>
                        {/* <p>
                                          <strong>Expiry</strong>
                                          <span>10/09/2023</span>
                                      </p> */}
                      </aside>
                      <ul>
                        <li>
                          <span>Document</span>
                          <figure>
                            <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                          </figure>
                        </li>
                        {/* <li>
                                          <strong class="Red"><i class="fa fa-exclamation-triangle"></i> Expiring in 5 days</strong>
                                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="Button">Add Vehicle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVechile