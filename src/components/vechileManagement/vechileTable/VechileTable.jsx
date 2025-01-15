import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getIlineOrP2pVechileList, vehicleStatus } from '../../../features/slices/vechileManagement/vechileManagement';
import { toastService } from '../../../utils/toastify';
import CommonPagination from '../../CommonPagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteModal from '../../DeleteModal';
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  id: "",
};
const VechileTable = ({ categoryId, vehicleType }) => {
    const [iState, setUpdateState] = useState(initialState);
    const { page, search, fromDate, toDate, timeframe, deleteModal ,id} = iState;
    const dispatch = useDispatch();
   const {ilineOrP2pVechileList}=useSelector(state=>{
       return state?.vechile;
     })
    useEffect(() => {
      if (categoryId && vehicleType) {
        dispatch(
          getIlineOrP2pVechileList({
            categoryId,
            vehicleType,
            page,
            timeframe,
          })
        );
      }
    }, [page, timeframe, categoryId, vehicleType]);
    useEffect(() => {
      const delayDebounceFunc = setTimeout(() => {
        dispatch(
          getIlineOrP2pVechileList({
            categoryId,
            vehicleType,
            search: search.trim(),
            timeframe,
          })
        );
      }, 1000);

      return () => clearTimeout(delayDebounceFunc);
    }, [search, timeframe, dispatch]);

    const handlePageChange = (page) => {
      setUpdateState({ ...iState, page });
      dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page }));
    };
    const handleChecked = (e, id) => {
      const { name, checked } = e?.target;
      const status = checked ? "ACTIVE" : "INACTIVE";
      const data = { id, status };
      dispatch(vehicleStatus(data)).then((res) => {
        console.log("status update api", res);
        if (res?.payload?.code == 200) {
          toastService.success("Status updated successfully");
          dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page }));
        } else {
          toastService.error("status update failed");
        }
      });
    };
    const handleChange = (e) => {
      setUpdateState({ ...iState, [e.target.name]: e.target.value });
    };
    const handleReset = () => {
      setUpdateState(initialState);
      dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page: 1 }));
    };
    const handleApply = () => {
      const data = {
        search,
        fromDate,
        toDate,
        page,
        categoryId,
        vehicleType,
      };
      dispatch(getIlineOrP2pVechileList(data));
    };
    console.log({ ilineOrP2pVechileList });
      const handleClose=()=>{
        setUpdateState({...iState, deleteModal:false, id:"" });
      }
      const handleDelete=()=>{
        dispatch(vehicleStatus({ id, status: "DELETED" })).then(
          (res) => {
            if (res?.payload?.code == 200) {
              toastService.success("Delete successfully");
              setUpdateState({...iState, deleteModal: false, id:"" });
              dispatch(getIlineOrP2pVechileList({ categoryId, vehicleType, page }));
            } else {
              toastService.error("Delete failed");
            }
          }
        );
      }
  return (
    <>
    <div className="tab-content">
      <div className="tab-pane active">
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
                <label>Duration</label>
                <select
                  className="form-control"
                  name="timeframe"
                  onChange={handleChange}
                  disabled={fromDate || toDate}
                >
                  <option value="select">--Select--</option>
                  <option value="Today">Today</option>
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                  <option value="Year">This Year</option>
                </select>
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
            <div className="FilterRight">
              <div className="form-group">
                <label>Service Type</label>
                <select className="form-control">
                  <option>Select</option>
                  <option>Two-Wheeler</option>
                  <option>Three-Wheeler</option>
                  <option>Four-Wheeler</option>
                  <option>Freight-Truck</option>
                </select>
              </div>
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
          <div className="TableList mt-4">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Vehicle ID</th>
                  <th>Vehicle No.</th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Added On</th>
                  <th>Service Type</th>
                  <th>Current Assigned Driver</th>
                  <th>Assigned On</th>
                  <th>Assigned By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ilineOrP2pVechileList?.result?.[0]?.paginationData?.map((res,i)=>{
                  return (
                    <tr key={res?._id}>
                      <td>{i + 1 + (page - 1) * 10}</td>
                      <td>{res?.vehicleNumber}</td>
                      <td>{res?.vehicleNumberPlate}</td>

                      <td>{res?.vehicleType}</td>
                      <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                      <td>
                        {(() => {
                          const labels = [];
                          if (res?.is_local) labels.push("Local");
                          if (res?.is_express) labels.push("Express");
                          if (res?.is_outstation) labels.push("Outstation");
                          return labels.length > 0 ? labels.join(", ") : "-";
                        })()}
                      </td>

                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        <span className={res?.status == "ACTIVE"?"Green":"Red"}>
                          {res?.status == "ACTIVE" ? "Enabled" : "Disabled"}
                        </span>
                      </td>
                      <td>
                        <div className="Actions">
                          <label className="Switch">
                            <input
                              type="checkbox"
                              name="status"
                              checked={res?.status == "ACTIVE"}
                              onChange={(e) => handleChecked(e, res?._id)}
                            />
                            <span className="slider" />
                          </label>
                          <a
                            className="Red"
                            onClick={()=>{
                              setUpdateState({...iState, deleteModal:true, id:res?._id });
                            }}
                          >
                            <i className="fa fa-trash" />
                          </a>
                          <Link
                            to="/vehicleManagement/details"
                            state={res}
                            className="Blue"
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </Link>
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
                  {ilineOrP2pVechileList?.result?.[0]?.totalCount?.[0]?.count ||
                    0}
                </span>
              </p>
            </div>
            <div className="PaginationRight">
              {ilineOrP2pVechileList?.result?.[0]?.totalCount?.[0]?.count >
                0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    ilineOrP2pVechileList?.result?.[0]?.totalCount?.[0]
                      ?.count || 0
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
{
  deleteModal && <DeleteModal handleClose={handleClose} handleDelete={handleDelete} statement="vechile"/>
}
    </>
  );
};

export default VechileTable