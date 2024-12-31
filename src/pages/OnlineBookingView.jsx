import React from 'react'

const OnlineBookingView = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Online Booking View</h4>
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
            </div>
          </div>
        </div>
        <div className="Small-Wrapper">
          <img src={require("../assets/images/online booking view.png")} />
        </div>
      </div>
    </div>
  );
}

export default OnlineBookingView