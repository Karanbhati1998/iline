import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVechileHistory } from "../../../features/slices/vechileManagement/vechileManagement";
import CommonPagination from "../../CommonPagination";
import DateList from "./DateList";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  data: [],
  dateModal: false,
};
const AllAssignedUser = ({ state }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe, data, dateModal } =
    iState;

  console.log({ state });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVechileHistory({ vehicleId: state?._id, page, timeframe }));
  }, [state, page, timeframe]);
  const { vehicleHistory } = useSelector((state) => {
    return state?.vechile;
  });
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getVechileHistory({ page }));
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getVechileHistory({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
    };
    dispatch(getVechileHistory(data));
  };
  const handleClose = () => {
    setUpdateState((prev) => ({
      ...prev,
      dateModal: false,
    }));
  };
  console.log({ vehicleHistory });
  return (
    <>
      <div className="tab-pane fade active show" id="AllAssignedDrivers">
        <div className="Small-Wrapper">
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
                  name="startDate"
                  value={startDate}
                  disabled={timeframe}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={endDate}
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
            <div className="FilterRight">
              <div className="form-group">
                <label>Select From</label>
                <select
                  className="form-control"
                  name="timeframe"
                  onChange={handleChange}
                  value={timeframe}
                  disabled={startDate || endDate}
                >
                  <option value="select">--Select--</option>
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                  <option value="Year">This Year</option>
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
                  <th>Name of Drivers</th>
                  <th>No of times Assigned </th>
                  <th>View Dates</th>
                </tr>
              </thead>
              <tbody>
                {vehicleHistory?.result?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1 + (page - 1) * 10}</td>
                      <td>{res?.driverData?.fullName}</td>
                      <td>{res?.assignCount}</td>
                      <td>
                        <div className="Actions">
                          <a
                            className=""
                            onClick={() =>
                              setUpdateState({
                                ...iState,
                                dateModal: true,
                                data: res?.assignDate,
                              })
                            }
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {vehicleHistory?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {vehicleHistory?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    vehicleHistory?.result?.[0]?.totalCount?.[0]?.count || 0
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
      {dateModal && <DateList data={data} handleClose={handleClose} />}
    </>
  );
};

export default AllAssignedUser;
