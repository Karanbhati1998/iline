import React from 'react'

const AssignVichel = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <div className="TitleBox">
              <h4 className="Title">Assign Vehicle </h4>
            </div>
          </div>
          <div className="backarrow">
            <a href="driver-management-all-driver-details.html">
              <i className="fa fa-long-arrow-left" aria-hidden="true" /> Back
            </a>
          </div>
        </div>
        <div className="InformationBox">
          <div className="Informations">
            <div className="ProfileInfo">
              <div className="ProfileDetails">
                <figure>
                  <img src="images/John-smith.png" />
                </figure>
                <figcaption>
                  <h3>John Smith</h3>
                  <p>User ID : #432394</p>
                </figcaption>
                <div className="Actions">
                  <label className="Switch">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                  <a className="Green" href="business-partner-edit.html">
                    <i className="fa fa-pencil" />
                  </a>
                  <a
                    className="Red"
                    data-toggle="modal"
                    data-target="#BusinessDeleteModal"
                  >
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignVichel