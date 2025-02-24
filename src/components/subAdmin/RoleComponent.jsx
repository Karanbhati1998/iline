import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoleList, roleStatus } from "../../features/slices/subAdmin";
import { toastService } from "../../utils/toastify";
import CommonPagination from "../CommonPagination";
import DeleteModal from "../DeleteModal";
import moment from "moment";
import { Link } from "react-router-dom";
import { canPerformAction } from "../../utils/deniedAccess";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
};
const RoleComponent = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe, deleteModal, id } =
    iState;
  const dispatch = useDispatch();
  const { role } = useSelector((state) => {
    return state?.subAdmin;
  });
  console.log({ role });

  useEffect(() => {
    dispatch(getRoleList({ page, timeframe }));
  }, [page, timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getRoleList({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getRoleList({ page }));
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { roleId: id, status };
    dispatch(roleStatus(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(getRoleList({ page }));
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
    dispatch(getRoleList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
    };
    dispatch(getRoleList(data));
  };
  const handleDelete = () => {
    dispatch(roleStatus({ id, status: "DELETED" })).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Delete successfully");
        setUpdateState({ ...iState, deleteModal: false });
        dispatch(getRoleList({ page }));
      } else {
        toastService.error("Delete failed");
      }
    });
  };
  const handleClose = () => {
    setUpdateState({ ...iState, deleteModal: false });
  };
  return (
    <>
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
              <label>Duration</label>
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
                <th>Role ID</th>
                <th>Role Name</th>
                <th>Created on</th>
                <th>Status</th>
                {canPerformAction("Sub-Admin Management") && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {role?.result?.[0]?.paginationData?.map((res, i) => {
                return (
                  <tr>
                    <td>{i + 1 + (page - 1) * 10}</td>
                    <td>{res?.role_number}</td>
                    <td>{res?.title}</td>
                    <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <span
                        className={res?.status == "ACTIVE" ? "Green" : "Red"}
                      >
                        {res?.status}
                      </span>{" "}
                    </td>
                    {canPerformAction("Sub-Admin Management") && (
                      <td>
                        {" "}
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
                          <Link className="Green" to="editRole" state={res}>
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </Link>
                          <a
                            className="Red"
                            onClick={() => {
                              setUpdateState({
                                ...iState,
                                deleteModal: true,
                                id: res?._id,
                              });
                            }}
                          >
                            <i className="fa fa-trash" />
                          </a>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {role?.result?.[0]?.paginationData?.length == 0 && (
            <p className="text-center">No records found.</p>
          )}
        </div>
        <div className="PaginationBox">
          <div className="PaginationLeft">
            <p>
              Total Records :{" "}
              <span>{role?.result?.[0]?.totalCount?.[0]?.count || 0}</span>
            </p>
          </div>

          <div className="PaginationRight">
            {role?.result?.[0]?.totalCount?.[0]?.count > 0 && (
              <CommonPagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={role?.result?.[0]?.totalCount?.[0]?.count || 0}
                pageRangeDisplayed={4}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            )}
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          handleClose={handleClose}
          handleDelete={handleDelete}
          statement="role"
        />
      )}
    </>
  );
};

export default RoleComponent;
