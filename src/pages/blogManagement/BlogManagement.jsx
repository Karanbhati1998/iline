import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogStatus, getBlogList } from "../../features/slices/blogSlice";
import { toastService } from "../../utils/toastify";
import moment from "moment";
import CommonPagination from "../../components/CommonPagination";
import { Link } from "react-router-dom";
import { canPerformAction } from "../../utils/deniedAccess";
const initialState = {
  page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
};
const BlogManagement = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { page, search, startDate, endDate, timeframe } = iState;
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => {
    return state?.blog;
  });
  useEffect(() => {
    dispatch(getBlogList({ page, timeframe }));
  }, [timeframe]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getBlogList({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);

  const handlePageChange = (page) => {
    setUpdateState({ ...iState, page });
    dispatch(getBlogList({ page, timeframe, startDate, endDate, search }));
  };
  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(blogStatus(data)).then((res) => {
      console.log("status update api", res);
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(getBlogList({ page }));
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
    dispatch(getBlogList({ page: 1 }));
  };
  const handleApply = () => {
    const data = {
      search,
      startDate,
      endDate,
      page,
    };
    dispatch(getBlogList(data));
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Blog Management</h4>
          {canPerformAction("Blog") && (
            <Link className="TitleLink" to="addblog">
              Publish New Blog
            </Link>
          )}
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
                <button
                  className="Button Cancel"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Reset Filter"
                  onClick={handleReset}
                >
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
                  <th>Registered On</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blog?.result?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (page - 1) * 10}</td>
                      <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{res?.title}</td>
                      <td>{res?.author}</td>
                      <td>
                        <img
                          src={res?.image}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        <span
                          className={res?.status == "ACTIVE" ? "Green" : "Red"}
                        >
                          {res?.status}
                        </span>{" "}
                      </td>
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
                          <Link className="Blue" to="viewBlog" state={res}>
                            <i className="fa fa-eye" aria-hidden="true" />
                          </Link>
                          <Link className="Green" to="editBlog" state={res}>
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {blog?.result?.[0]?.paginationData?.length == 0 && (
              <p className="text-center">No records found.</p>
            )}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>{blog?.result?.[0]?.totalCount?.[0]?.count || 0}</span>
              </p>
            </div>

            <div className="PaginationRight">
              {blog?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    blog?.result?.[0]?.totalCount?.[0]?.count || 0
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default BlogManagement;
