import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  getVehicleListForAssign,
  assignVehicleToDriver,
} from "../../../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import BackButton from "../../../../BackButton"
const AssignVichel = () => {
  const dispatch=useDispatch()
  const {vehicleListForAssign}=useSelector(state=>{
    return state?.driverManagementAllDrivers;
  })
  useEffect(()=>{
    dispatch(getVehicleListForAssign());
  },[])
  console.log({ vehicleListForAssign });
  const handleAssign = (id, driverId) => {
    dispatch(assignVehicleToDriver({ id, driverId }));
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <div className="TitleBox">
              <h4 className="Title">Assign Vehicle </h4>
            </div>
          </div>
          <BackButton />
        </div>
        <div className="InformationBox">
          <div className="Informations">
            <div className="ProfileInfo">
              <div className="ProfileDetails">
                <figure>
                  <img src="images/John-smith.png" />
                </figure>
                <figcaption>
                  <h3>
                    John Smith{" "}
                    <span className="Yellow">
                      <i className="fa fa-star" aria-hidden="true" /> 4.5
                    </span>
                  </h3>
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
                  {/* <a class="Red" data-toggle="modal" data-target="#BusinessDeleteModal">
                              <i class="fa fa-trash"></i>
                          </a>     */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Small-Wrapper mt-4">
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
              {/* <div class="form-group">
              <label>Duration</label>
              <select class="form-control">
                <option>Select</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div> */}
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
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Vehicle Category </th>
                  <th>Vehicle Color</th>
                  <th>Vehicle Registration No.</th>
                  <th>Vehicle Model</th>
                  <th>Vehicle Registration Expiry Date</th>
                  <th>Vehicle Manufacturer</th>
                  <th>Vehicle Insurance Expiry Date</th>
                  <th>Upload Vehicle Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ABC</td>
                  <td>Blue</td>
                  <td>UP-16 7021</td>
                  <td>Tata</td>
                  <td>10-10-2024</td>
                  <td>XYZ</td>
                  <td>10-10-2025</td>
                  <td>
                    <figure>
                      {" "}
                      <img src="images/Avatar-1.png" />
                    </figure>
                  </td>
                  <td>
                    <span className="Green" onClick={() => handleAssign()}>
                      <a href="">Assign</a>
                    </span>{" "}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ABC</td>
                  <td>Blue</td>
                  <td>UP-16 7021</td>
                  <td>Tata</td>
                  <td>10-10-2024</td>
                  <td>XYZ</td>
                  <td>10-10-2025</td>
                  <td>
                    <figure>
                      {" "}
                      <img src="images/Avatar-1.png" />
                    </figure>
                  </td>
                  <td>
                    <span className="Green">
                      <a href="">Assign</a>
                    </span>{" "}
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

export default AssignVichel