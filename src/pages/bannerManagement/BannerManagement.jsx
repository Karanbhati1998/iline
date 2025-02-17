import React, { useEffect, useRef, useState } from "react";
import UploadBanner from "../../components/banner/UploadBanner";
import DeleteBannerModal from "../../components/banner/DeleteBannerModal";
import { useDispatch, useSelector } from "react-redux";
import { bannerStatus, getBannerList } from "../../features/slices/bannerSlice";
import ExportToExcel from "../../components/ExportToExcel";
import { toastService } from "../../utils/toastify";
import moment from "moment";
import { canPerformAction } from "../../utils/deniedAccess";
import CommonPagination from "../../components/CommonPagination";
const initialState = {
  page: 1,
  search: "",
  fromDate: "",
  toDate: "",
  timeframe: "",
  deleteModal: false,
  id: "",
  showUploadBannerModal: false,
};
const BannerManagement = () => {
  const [iState, setUpdateState] = useState(initialState);
  const {
    page,
    search,
    fromDate,
    toDate,
    timeframe,
    deleteModal,
    id,
    showUploadBannerModal,
  } = iState;
  const dispatch = useDispatch();
  const bannerRef = useRef();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const data = {
      search,
      fromDate,
      toDate,
      timeframe,
      limit: 999999,
    };

    dispatch(getBannerList(data)).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        setAllData(res?.payload);
      }
    });
  }, [timeframe, page, toDate, search, fromDate]);
  const { bannerList } = useSelector((state) => {
    return state?.banner;
  });
  console.log({ bannerList });

  useEffect(() => {
    dispatch(getBannerList({ page, timeframe }));
  }, [page, timeframe]);

  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      dispatch(
        getBannerList({
          search: search.trim(),
          timeframe,
        })
      );
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch]);
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleApply = () => {
    const data = {
      search,
      fromDate,
      toDate,
      page,
    };
    dispatch(getBannerList(data));
  };
  const handleReset = () => {
    setUpdateState(initialState);
    dispatch(getBannerList({ page: 1 }));
  };

  const handleChecked = (e, id) => {
    const { name, checked } = e?.target;
    const status = checked ? "ACTIVE" : "INACTIVE";
    const data = { id, status };
    dispatch(bannerStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Status updated successfully");
        dispatch(getBannerList({ page }));
      } else {
        toastService.error("status update failed");
      }
    });
  };
  const handleClose = () => {
    setUpdateState((prev) => ({
      ...prev,
      showUploadBannerModal: false,
    }));
  };
  const handleCloseDeleteModal = () => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: false,
    }));
  };
  const handleOpenDeleteModal = (id) => {
    setUpdateState((prev) => ({
      ...prev,
      deleteModal: true,
      id: id,
    }));
  };
   const handlePageChange = (page) => {
      setUpdateState({ ...iState, page });
      dispatch(getBannerList({  page }));
    };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Banner Management</h4>
            {canPerformAction("Banner Management") && (
              <a
                className="TitleLink"
                onClick={() => {
                  setUpdateState((prev) => ({
                    ...prev,
                    showUploadBannerModal: true,
                  }));
                }}
              >
                Upload New banner
              </a>
            )}
          </div>
          <div className="Small-Wrapper">
            <div className="FilterArea">
              <div className="FilterLeft">
                <div className="form-group">
                  {/* <label>Search</label> */}
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                  /> */}
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
                <ExportToExcel ref={bannerRef} fileName="bannerManagement" />
              </div>
            </div>
          </div>
          <div className="Small-Wrapper">
            <div className="TableList" style={{ display: "none" }}>
              <table ref={bannerRef}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Banner Name</th>
                    <th>Banner ID</th>
                    <th>Banner Image</th>
                    <th>Uploaded On</th>
                    <th>Status</th>
                    {canPerformAction("Banner Management") && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {allData?.result?.[0]?.paginationData?.map((res, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + (page - 1) * 10}</td>
                        <td>{res?.name}</td>
                        <td>
                          <a
                            className="Blue"
                            data-toggle="modal"
                            data-target="#ApprovalModal"
                          >
                            {res?.banner_number}
                          </a>
                        </td>
                        <td>
                          <img
                            src={res?.imageUrl}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            alt="no img"
                          />
                        </td>
                        <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>
                          <span
                            className={
                              res?.status == "ACTIVE" ? "Green" : "Red"
                            }
                          >
                            {res?.status == "ACTIVE" ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                        {canPerformAction("Banner Management") && (
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
                                onClick={() => handleOpenDeleteModal(res?._id)}
                              >
                                <i className="fa fa-trash" aria-hidden="true" />
                              </a>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="Small-Wrapper">
            <div className="TableList">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Banner Name</th>
                    <th>Banner ID</th>
                    <th>Banner Image</th>
                    <th>Uploaded On</th>
                    <th>Status</th>
                    {canPerformAction("Banner Management") && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {bannerList?.result?.[0]?.paginationData?.map((res, i) => {
                    return (
                      <tr>
                        <td>{i + 1 + (page - 1) * 10}</td>
                        <td>{res?.name}</td>
                        <td>
                          <a
                            className="Blue"
                            data-toggle="modal"
                            data-target="#ApprovalModal"
                          >
                            {res?.banner_number}
                          </a>
                        </td>
                        <td>
                          <img
                            src={res?.imageUrl}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            alt="no img"
                          />
                        </td>
                        <td>{moment(res?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>
                          <span
                            className={
                              res?.status == "ACTIVE" ? "Green" : "Red"
                            }
                          >
                            {res?.status == "ACTIVE" ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                        {canPerformAction("Banner Management") && (
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
                                onClick={() => handleOpenDeleteModal(res?._id)}
                              >
                                <i className="fa fa-trash" aria-hidden="true" />
                              </a>
                            </div>
                          </td>
                        )}
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
                    {bannerList?.result?.[0]?.totalCount?.[0]?.count || 0}
                  </span>
                </p>
              </div>
              <div className="PaginationRight">
                {bannerList?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                  <CommonPagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={
                      bannerList?.result?.[0]?.totalCount?.[0]?.count || 0
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
      {showUploadBannerModal && <UploadBanner handleClose={handleClose} />}
      {deleteModal && (
        <DeleteBannerModal
          handleCloseDeleteModal={handleCloseDeleteModal}
          id={id}
        />
      )}
    </>
  );
};

export default BannerManagement;
