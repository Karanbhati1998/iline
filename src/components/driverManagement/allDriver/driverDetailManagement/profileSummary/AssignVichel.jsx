import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehicleListForAssign,
  assignVehicleToDriver,
  driverStatus,
} from "../../../../../features/slices/DriverManagement/allDriver/allDriverReducer";
import BackButton from "../../../../BackButton";
import { toastService } from "../../../../../utils/toastify";
import CommonPagination from "../../../../CommonPagination";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
  id: "",
};
const AssignVichel = () => {
  const [iState, setUpdateState] = useState(initialState);
  const [status, setStatus] = useState(false);
  const { page, search, fromDate, toDate, timeframe } = iState;
  const dispatch = useDispatch();
  const {state}=useLocation()
  console.log({state});
  
  const { vehicleListForAssign } = useSelector((state) => {
    return state?.driverManagementAllDrivers;
  });
  useEffect(() => {
    dispatch(getVehicleListForAssign({ page, timeframe }));
  }, [page, timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getVehicleListForAssign({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  useEffect(()=>{
    if (state?.userStatus === "ACTIVE") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  },[])

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getVehicleListForAssign({ page }));
  };

  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getVehicleListForAssign({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      fromDate,
      toDate,
      page,
    };
    dispatch(getVehicleListForAssign(data));
  };
  const handleAssign = (id) => {
    console.log({ id, driverId: state?._id });

    dispatch(assignVehicleToDriver({ id, driverId:state?._id })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("vechile assigned vehicle to driver");
         dispatch(getVehicleListForAssign({ page }));
      } else {
        toastService.error("Failed to assign vehicle to driver");
      }
    });
  };
  console.log({ vehicleListForAssign });
   const handleChecked = (e, id) => {
        const { name, checked } = e?.target;
        const status = checked ? "ACTIVE" : "INACTIVE";
        const data = { id, status };
        dispatch(driverStatus(data)).then((res) => {
          console.log('status update api',res)
          if (res?.payload?.code == 200) {
            toastService.success("Status updated successfully");
         setStatus(checked)
          } else {
            toastService.error("status update failed");
          }
        });
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
                  <img src={state?.profilePic} alt="no img" />
                </figure>
                <figcaption>
                  <h3>
                    {state?.fullName}{" "}
                    <span className="Yellow">
                      <i className="fa fa-star" aria-hidden="true" /> 0
                    </span>
                  </h3>
                  <p>User ID : {state?.driver_number}</p>
                </figcaption>
                <div className="Actions">
                  <label className="Switch">
                    <input
                      type="checkbox"
                      checked={status}
                      onChange={(e) => handleChecked(e, state?._id)}
                    />
                    <span className="slider" />
                  </label>
                 
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
                  name="search"
                  value={search}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>From</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  value={fromDate}
                  disabled={timeframe}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  value={toDate}
                  onChange={handleChange}
                  disabled={timeframe}
                />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button className="Button" onClick={handleApply}>
                  Apply
                </button>
                <button className="Button Cancel" onClick={handleReset}>
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
                {vehicleListForAssign?.result?.[0]?.paginationData?.map(
                  (res, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + (page - 1) * 10}</td>
                        <td>
                          {
                            vehicleListForAssign?.result?.[0]
                              ?.paginationData?.[0]?.categoryData?.categoryName
                          }
                        </td>
                        <td>{res?.vehicleColour}</td>
                        <td>{res?.rcNumber}</td>
                        <td>{res?.vehicleModel}</td>
                        <td>
                          {moment(res?.rcExpiryDate).format("DD-MM-YYYY")}
                        </td>
                        <td>{res?.vehicleManufacturer}</td>
                        <td>
                          {moment(res?.insurenceExpiryDate).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td>
                          <figure>
                            {" "}
                            <img src={res?.vehicleFrontImage} alt="no img" />
                          </figure>
                        </td>
                        <td>
                          <span
                            className="Green"
                            onClick={() => handleAssign(res?._id)}
                          >
                            <a>Assign</a>
                          </span>{" "}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {vehicleListForAssign?.result?.[0]?.totalCount?.[0]?.count ||
                    0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {vehicleListForAssign?.result?.[0]?.totalCount?.[0]?.count >
                0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    vehicleListForAssign?.result?.[0]?.totalCount?.[0]?.count ||
                    0
                  }
                  pageRangeDisplayed={4}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignVichel;
