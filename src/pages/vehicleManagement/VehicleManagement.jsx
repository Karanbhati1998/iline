import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoryWiseVehicleData } from "../../features/slices/vechileManagement/vechileManagement";
import { canPerformAction } from "../../utils/deniedAccess";

const VehicleManagement = () => {
  const dispatch = useDispatch();
  const { categoryWiseVehicleData } = useSelector((state) => {
    return state?.vechile;
  });
  useEffect(() => {
    dispatch(getCategoryWiseVehicleData());
  }, []);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Vehicle Management</h4>
          <div className="TitleLink">
            {canPerformAction("Vehicle Management") && (
              <Link to="addVechile" className="TitleLink">
                Add Vehicle
              </Link>
            )}
            <Link to="vehicleCategory" className="TitleLink ml-2">
              Vehicle Category
            </Link>
          </div>
        </div>
        {categoryWiseVehicleData?.result?.map((res, i) => {
          return (
            <div className="Small-Wrapper" key={res?._id}>
              <div className="TitleBox">
                <h4 className="Title">{res?.categoryName}</h4>
              </div>
              <div className="DriverCountList">
                <ul>
                  <li>
                    <a >
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Total Vehicles</span>
                      <span className="Count">{res?.totalVehicleCount}</span>
                    </a>
                  </li>
                  <li>
                    <Link
                      to="iline_p2p"
                      state={{
                        type: "ILINE",
                        ind: res?._id,
                        CatName: res?.categoryName,
                      }}
                    >
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">I-Line Vehicles</span>
                      <span className="Count">
                        {res?.vehicleTypeCounts?.ILINE}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="iline_p2p"
                      state={{
                        type: "P2P",
                        ind: res?._id,
                        CatName: res?.categoryName,
                      }}
                    >
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">P2P Vehicles</span>
                      <span className="Count">
                        {res?.vehicleTypeCounts?.P2P}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="vechileService" state={"Local"}>
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Local Delivery</span>
                      <span className="Count">
                        {res?.serviceTypeCounts?.local}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="vechileService" state={"Outstation"}>
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Out station Delivery</span>
                      <span className="Count">
                        {" "}
                        {res?.serviceTypeCounts?.outstation}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="vechileService" state={"Express"}>
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Express Delivery</span>
                      <span className="Count">
                        {res?.serviceTypeCounts?.express}
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                    <a>
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Offline Vehicles</span>
                      <span className="Count">-</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Online Vehicles</span>
                      <span className="Count">-</span>
                    </a>
                  </li> */}
                  <li>
                    <Link to="pendingVechilePage">
                      <span className="Icon">
                        <img src={require("../../assets/images/car.png")} />
                      </span>
                      <span className="Text">Pending for Approval</span>
                      <span className="Count">{res?.pendingCount}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
        {/* <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Two Wheeler</h4>
          </div>
          <div className="DriverCountList">
            <ul>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Total Vehicles</span>
                  <span className="Count">123</span>
                </a>
              </li>
              <li>
                <Link to="iline_p2p" state={"ILINE"}>
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">I-Line Vehicles</span>
                  <span className="Count">12</span>
                </Link>
              </li>
              <li>
                <Link to="iline_p2p" state={"P2P"}>
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">P2P Vehicles</span>
                  <span className="Count">12</span>
                </Link>
              </li>
              <li>
                <Link to="vechileService" state={"Local"}>
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Local Delivery</span>
                  <span className="Count">12</span>
                </Link>
              </li>
              <li>
                <Link to="vechileService" state={"Outstation"}>
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Out station Delivery</span>
                  <span className="Count">12</span>
                </Link>
              </li>
              <li>
                <Link to="vechileService" state={"Express"}>
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Express Delivery</span>
                  <span className="Count">50</span>
                </Link>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Offline Vehicles</span>
                  <span className="Count">63</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Online Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Three Wheeler</h4>
          </div>
          <div className="DriverCountList">
            <ul>
              <li>
                <a href="vehicle-cabs-all.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Total Vehicles</span>
                  <span className="Count">123</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-city-rides.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">I-Line Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-local-rental.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">P2P Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-outstation-duty.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Local Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-offline.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Out station Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Express Delivery</span>
                  <span className="Count">50</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Offline Vehicles</span>
                  <span className="Count">63</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Online Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Four Wheeler</h4>
          </div>
          <div className="DriverCountList">
            <ul>
              <li>
                <a href="vehicle-cabs-all.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Total Vehicles</span>
                  <span className="Count">123</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-city-rides.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">I-Line Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-local-rental.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">P2P Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-outstation-duty.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Local Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-offline.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Out station Delivery</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Express Delivery</span>
                  <span className="Count">50</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Offline Vehicles</span>
                  <span className="Count">63</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Online Vehicles</span>
                  <span className="Count">12</span>
                </a>
              </li>
              <li>
                <a href="vehicle-cabs-online.html">
                  <span className="Icon">
                    <img src={require("../../assets/images/car.png")} />
                  </span>
                  <span className="Text">Pending for Approval</span>
                  <span className="Count">12</span>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default VehicleManagement;
