import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionToService } from "../../../features/slices/vechileManagement/vechileManagement";
import { toastService } from "../../../utils/toastify";
const initialState = {
  id: "",
  is_local_admin: false,
  is_outstation_admin: false,
  is_express_admin: false,
  is_local: false,
  is_outstation: false,
  is_express: false,
};
const VechileData = ({ state }) => {
  const [iState,setUpdateState]=useState(initialState)
  const {id,is_local_admin,is_outstation_admin,is_express_admin,is_local,is_outstation,is_express}=iState;
  console.log({ state });
  useEffect(()=>{
    setUpdateState((prev) => ({
      ...prev,
      is_local_admin: state?.is_local_admin,
      is_outstation_admin: state?.is_outstation_admin,
      is_express_admin: state?.is_express_admin,
      is_local: state?.is_local,
      is_outstation: state?.is_outstation,
      is_express: state?.is_express,
    }));
  },[state])
  const dispatch=useDispatch()
   const handleChecked = (e, id,type) => {
        const { name, checked } = e?.target;
        const data = {
          id,
          is_local_admin: is_local,
          is_outstation_admin: is_outstation,
          is_express_admin: is_express,
          is_local: is_local,
          is_outstation: is_outstation,
          is_express: is_express,
          [type]: checked,
          [name]: checked,
        };
        dispatch(actionToService(data)).then((res) => {
          console.log("status update api", res);
          if (res?.payload?.code == 200) {
             setUpdateState((prev) => ({
               ...prev,
               is_local_admin: res?.payload?.editCategory?.is_local_admin,
               is_outstation_admin: res?.payload?.editCategory?.is_outstation_admin,
               is_express_admin: res?.payload?.editCategory?.is_express_admin,
               is_local: res?.payload?.editCategory?.is_local,
               is_outstation: res?.payload?.editCategory?.is_outstation,
               is_express: res?.payload?.editCategory?.is_express,
             }));
            toastService.success("Status updated successfully");
          } else {
            toastService.error("status update failed");
          }
        });
      };

  return (
    <div className="tab-pane active" id="VehicleDetails">
      <div className="Small-Wrapper">
        <div className="InformationBox">
          <h3>Vehicle details</h3>
          <div className="Informations">
            <div className="ProfileInfo">
              <article>
                <aside>
                  <p>
                    <strong>Vehicle Id </strong>
                    <span>{state?.vehicleNumber}</span>
                  </p>
                  <p>
                    <strong>Vehicle Category </strong>
                    <span>{state?.categoryData?.categoryName}</span>
                  </p>
                  <p>
                    <strong>Vehicle Type</strong>
                    <span>{state?.vehicleType} </span>
                  </p>
                  <p>
                    <strong>Vehicle Color/Model </strong>
                    <span>
                      {state?.vehicleColour}/{state?.vehicleModel}
                    </span>
                  </p>
                  <p>
                    <strong>Vehicle Manufacturer </strong>
                    <span>{state?.vehicleManufacturer}</span>
                  </p>
                  <p>
                    <strong>Load Capacity </strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Vehicle Plate Number</strong>
                    <span>{state?.vehicleNumberPlate}</span>
                  </p>
                  <p>
                    <strong>Uploaded on</strong>
                    <span>{moment(state?.createdAt).format("DD-MM-YYYY")}</span>
                  </p>
                </aside>
                <aside>
                  <p>
                    <strong>Approved on</strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Total Booking Received</strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Total Completed Booking </strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Total Upcoming Booking </strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Total Cancelled Booking </strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Total Ongoing Bookings </strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Approved By </strong>
                    <span>-</span>
                  </p>
                </aside>
              </article>
            </div>
          </div>
        </div>
        <div className="InformationBox">
          <h3>Vehicle Status</h3>
          <div className="Informations">
            <div className="VehicleStatus">
              <ul>
                <li>
                  <label>Local</label>
                  <label className="Switch">
                    <input
                      type="checkbox"
                      name="is_local"
                      checked={is_local}
                      onChange={(e) =>
                        handleChecked(e, state?._id, "is_local_admin")
                      }
                    />
                    <span className="slider" />
                  </label>
                </li>
                <li>
                  <label>Express</label>
                  <label className="Switch">
                    <input
                      type="checkbox"
                      name="is_express"
                      checked={is_express}
                      onChange={(e) =>
                        handleChecked(e, state?._id, "is_express_admin")
                      }
                    />
                    <span className="slider" />
                  </label>
                </li>
                <li>
                  <label>Out Station</label>
                  <label className="Switch">
                    <input
                      type="checkbox"
                      name="is_outstation"
                      checked={is_outstation}
                      onChange={(e) =>
                        handleChecked(e, state?._id, "is_outstation_admin")
                      }
                    />
                    <span className="slider" />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="InformationBox">
          <h3>Vehicle Photos </h3>
          <div className="Informations">
            <div className="VehiclePhotos">
              <ul>
                <li>
                  <img src={state?.vehicleFrontImage} />
                </li>
                <li>
                  <img src={state?.vehicleBackImage} />
                </li>
                <li>
                  <img src={state?.vehicleLeftImage} />
                </li>
                <li>
                  <img src={state?.vehicleRightImage} />
                </li>
                <li>
                  <img src={state?.vehicleOverallImage} />
                </li>
                <li>
                  <img src={state?.vehicleInsideImage} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="InformationBox">
              <h3>Owner Details</h3>
              <div className="VehicleDocument">
                <aside>
                  <p>
                    <strong>Owner Name</strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Owner Number </strong>
                    <span>-</span>
                  </p>
                </aside>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="InformationBox">
              <h3>Assigned Driver Details</h3>
              <div className="VehicleDocument">
                <aside>
                  <p>
                    <strong>Owner Name</strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Owner Number </strong>
                    <span>-</span>
                  </p>
                </aside>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="InformationBox">
              <h3>RC Details</h3>
              <div className="VehicleDocument">
                <aside>
                  <p>
                    <strong>Registration Certificate Number</strong>
                    <span>{state?.rcNumber}</span>
                  </p>
                  <p>
                    <strong>Expiry</strong>
                    <span>
                      {moment(state?.rcExpiryDate).format("DD-MM-YYYY")}
                    </span>
                  </p>
                </aside>
                <ul>
                  <li>
                    <span>Document</span>
                    <figure className="mb-2">
                      <img src={state?.rcFront} />
                    </figure>
                    <figure>
                      <img src={state?.rcBack} />
                    </figure>
                  </li>
                  <li>
                    <strong className="Red">
                      <i className="fa fa-exclamation-triangle" />{" "}
                      {moment(
                        state?.driverDocumentData?.[0]?.rcExpiryDate
                      ).isAfter(moment())
                        ? `Expiring in ${moment(
                            state?.driverDocumentData?.[0]?.rcExpiryDate
                          ).fromNow()}`
                        : `Expired ${moment(
                            state?.driverDocumentData?.[0]?.rcExpiryDate
                          ).fromNow()}`}
                    </strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="InformationBox">
              <h3>Insurance Details</h3>
              <div className="VehicleDocument">
                <aside>
                  <p>
                    <strong>Registration Certificate Number</strong>
                    <span>-</span>
                  </p>
                  <p>
                    <strong>Expiry</strong>
                    <span>
                      {moment(state?.insurenceExpiryDate).format("DD-MM-YYYY")}
                    </span>
                  </p>
                </aside>
                <ul>
                  <li>
                    <span>Document</span>
                    <figure className="mb-2">
                      <img src={state?.insurenceFront} />
                    </figure>
                    <figure>
                      <img src={state?.insurenceBack} />
                    </figure>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VechileData;