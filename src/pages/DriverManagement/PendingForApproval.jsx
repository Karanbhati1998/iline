import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingForApproval } from "../../features/slices/DriverManagement/pendingForApproval/pendingForApproval";
import moment from "moment";
import CommonPagination from "../../components/CommonPagination";
import { canPerformAction } from "../../utils/deniedAccess";
const initialState = {
  page: 1,
  search: "",
};
const PendingForApproval = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search } = iState;
  const dispatch = useDispatch();
  const { pendingForApprovalList } = useSelector(
    (state) => state.driverManagementPendingForApproval
  );
  console.log({ pendingForApprovalList });

  useEffect(() => {
    dispatch(fetchPendingForApproval({ page }));
  }, [page]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        fetchPendingForApproval({
          search: search.trim(),
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, dispatch]);
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(fetchPendingForApproval({ page: 1 }));
  };
  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(fetchPendingForApproval({ page }));
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs"></div>
          <BackButton />
        </div>
        <div className="Small-Wrapper">
          <div className="DriverDeleteBox">
            <span className="Icon">
              <img src={require("../../assets/images/Driver.png")} />
            </span>
            <span className="Text">Pending For Approval</span>
            <span className="Count">
              {" "}
              {pendingForApprovalList?.result?.[0]?.totalCount?.[0]?.count || 0}
            </span>
          </div>
          <div className="TitleBox">
            <h4 className="Title">Pending For Approval</h4>
          </div>
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
                <button className="Button Cancel" onClick={handleReset}>
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
          </div>
          <div className="TableList mt-4">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Driver ID</th>
                  <th>Driver Name</th>
                  <th>Contact Number</th>
                  <th>Email ID</th>
                  <th>Registered On</th>
                  <th>Status</th>
                  <th>Vehicle Status</th>
                  {canPerformAction("Driver Management") && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {pendingForApprovalList?.result?.[0]?.paginationData?.map(
                  (res, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + (page - 1) * 10}</td>
                        <td>{res?.driver_number}</td>
                        <td>{res?.fullName}</td>
                        <td>{res?.phoneNumber}</td>
                        <td>{res?.email ? res?.email : "-"}</td>
                        <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{res?.userStatus}</td>
                        <td>
                          <a>
                            <span className="Orange">
                              {res?.approvedStatus}
                            </span>
                          </a>
                        </td>
                        {canPerformAction("Driver Management") && (
                          <td>
                            <Link
                              to={"/driverManagement/pendingForApprovalDetail"}
                              state={res}
                            >
                              <span className="Green">Verify</span>
                            </Link>
                          </td>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {pendingForApprovalList?.result?.[0]?.paginationData?.length ==
              0 && <p className="text-center">No records found.</p>}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {pendingForApprovalList?.result?.[0]?.totalCount?.[0]
                    ?.count || 0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {pendingForApprovalList?.result?.[0]?.totalCount?.[0]?.count >
                0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    pendingForApprovalList?.result?.[0]?.totalCount?.[0]
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
  );
};

export default PendingForApproval;
