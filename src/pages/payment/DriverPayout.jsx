import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadPaymentList,
  getAllDriverPayout,
  getDriverPayout,
  getIlineRevenueListDownload,
  handleDriverPayoutPage,
} from "../../features/slices/payment";
import { Link, useLocation } from "react-router-dom";
import CommonPagination from "../../components/CommonPagination";
import ExportToExcel from "../../components/ExportToExcel";
import ExportToPayout from "../../components/ExportToPayout";
const initialState = {
  // page: 1,
  search: "",
  startDate: "",
  endDate: "",
  timeframe: "",
  id: "",
  deleteModal: false,
  id: "",
};
const DriverPayout = ({ categoryId }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { search, startDate, endDate, timeframe, id } = iState;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const totalRevenueILineRef = useRef();
  const downloadPaymentListRef = useRef();
  const [allData, setAllData] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    const data = {
      limit: 999999,
      categoryId,
    };
    if (categoryId) {
      dispatch(getAllDriverPayout(data)).then((res) => {
        if (res?.payload?.code == 200) {
          console.log({ res });
          setAllData(res?.payload);
        }
      });
    }
  }, [categoryId]);
  useEffect(() => {
    dispatch(downloadPaymentList({ date }));
  }, [date]);
  const { driverPayout, driverPayoutPage, paymentList } = useSelector(
    (state) => {
      return state?.payment;
    }
  );
  console.log({ driverPayout });

  useEffect(() => {
    if (categoryId) {
      setDate("");
      dispatch(
        getDriverPayout({
          categoryId,
          page: driverPayoutPage,
        })
      );
    }
  }, [categoryId]);
  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      if (search || timeframe) {
        dispatch(
          getDriverPayout({
            categoryId,

            // search: search.trim(),
            // timeframe,
          })
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFunc);
  }, [search, timeframe, dispatch, categoryId]);
  const handlePageChange = (page) => {
    dispatch(handleDriverPayoutPage(page));
    dispatch(
      getDriverPayout({
        categoryId,

        page,
        // timeframe,
        // startDate,
        // endDate,
      })
    );
  };
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setUpdateState(initialState);
    setDate("");
    dispatch(getDriverPayout({ categoryId, page: 1 }));
  };
  const handleApply = () => {
    dispatch(getDriverPayout({ date }));
  };

  const handleDateFilter = (e) => {
    console.log("date", e.target.value);

    setDate(e.target.value);
    // const data = {
    //   date,
    // };
    // dispatch(getDriverPayout(data));
  };
  console.log({ driverPayout });

  const downloadPayoutCsv = () => {
    dispatch(downloadPaymentList({ date }));
  };
  return (
    <>
      <div
        className="tab-pane fade active show"
        id="TotalRevenueFromILineDriver"
      >
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={date}
                  onChange={handleDateFilter}
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
              {/* <button
                className="Button"
                style={{
                  marginRight: "5px",
                }}
                onClick={downloadPayoutCsv}
              >
                Download payout csv
              </button> */}
              <ExportToPayout
                ref={downloadPaymentListRef}
                fileName="downloadPaymentList"
              />
              <ExportToExcel
                ref={totalRevenueILineRef}
                fileName="driverPayout"
              />
            </div>
          </div>
          <div className="TableList mt-4" style={{ display: "none" }}>
            <table style={{ width: "150%" }} ref={totalRevenueILineRef}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Driver Name</th>
                  {/* <!-- <th>Account Details</th> --> */}
                  <th>Account No.</th>
                  <th>IFSC Code</th>
                  <th>Bank Name</th>
                  <th>Account Holder Name</th>
                  {/* <th>Date</th> */}
                  <th>Amount Earned</th>
                  <th>iLine Commision</th>
                  <th>Payable Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allData?.earnings?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (driverPayoutPage - 1) * 10}</td>
                      <td>
                        <a
                          className="Blue"
                          data-toggle="modal"
                          data-target="#ApprovalModal"
                        >
                          {res?.driverName}
                        </a>
                      </td>
                      <td>
                        <a>{res?.bankDetails?.accountNumber}</a>
                      </td>
                      <td>{res?.bankDetails?.ifscCode} </td>
                      <td>
                        <a>{res?.bankDetails?.bankName}</a>
                      </td>
                      <td>{res?.bankDetails?.fullName}</td>
                      {/* <td>
                        <a>{res?.vehicleData?.vehicleNumber}</a>
                      </td> */}
                      <td>{res?.totalAmountEarned?.toFixed(2)}</td>
                      <td>{res?.totalCommission?.toFixed(2)}</td>
                      <td>{res?.walletAmount?.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="TableList mt-4" style={{ display: "none" }}>
            <table style={{ width: "150%" }} ref={downloadPaymentListRef}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Driver Name</th>
                  {/* <!-- <th>Account Details</th> --> */}
                  <th>Account No.</th>
                  <th>IFSC Code</th>
                  <th>Bank Name</th>
                  <th>Account Holder Name</th>
                  {/* <th>Date</th> */}
                  <th>Amount Earned</th>
                  <th>iLine Commision</th>
                  <th>Payable Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentList?.earnings?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (driverPayoutPage - 1) * 10}</td>
                      <td>
                        <a
                          className="Blue"
                          data-toggle="modal"
                          data-target="#ApprovalModal"
                        >
                          {res?.driverName}
                        </a>
                      </td>
                      <td>
                        <a>{res?.bankDetails?.accountNumber}</a>
                      </td>
                      <td>{res?.bankDetails?.ifscCode} </td>
                      <td>
                        <a>{res?.bankDetails?.bankName}</a>
                      </td>
                      <td>{res?.bankDetails?.fullName}</td>
                      {/* <td>
                        <a>{res?.vehicleData?.vehicleNumber}</a>
                      </td> */}
                      <td>{res?.totalAmountEarned?.toFixed(2)}</td>
                      <td>{res?.totalCommission?.toFixed(2)}</td>
                      <td>{res?.walletAmount?.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="TableList mt-4">
            <table style={{ width: "150%" }}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Driver Name</th>
                  {/* <!-- <th>Account Details</th> --> */}
                  <th>Account No.</th>
                  <th>IFSC Code</th>
                  <th>Bank Name</th>
                  <th>Account Holder Name</th>
                  {/* <th>Date</th> */}
                  <th>Amount Earned</th>
                  <th>iLine Commision</th>
                  <th>Payable Amount</th>
                </tr>
              </thead>
              <tbody>
                {driverPayout?.earnings?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (driverPayoutPage - 1) * 10}</td>
                      <td>
                        <a
                          className="Blue"
                          data-toggle="modal"
                          data-target="#ApprovalModal"
                        >
                          {res?.driverName}
                        </a>
                      </td>
                      <td>
                        <a>{res?.bankDetails?.accountNumber}</a>
                      </td>
                      <td>{res?.bankDetails?.ifscCode} </td>
                      <td>
                        <a>{res?.bankDetails?.bankName}</a>
                      </td>
                      <td>{res?.bankDetails?.fullName}</td>
                      {/* <td>
                        <a>{res?.vehicleData?.vehicleNumber}</a>
                      </td> */}
                      <td>{res?.totalAmountEarned?.toFixed(2)}</td>
                      <td>{res?.totalCommission?.toFixed(2)}</td>
                      <td>{res?.walletAmount?.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {driverPayout?.earnings?.[0]?.paginationData?.length == 0 && (
              <p className="text-center">No records found.</p>
            )}
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {driverPayout?.earnings?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>
            <div className="PaginationRight">
              {driverPayout?.earnings?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={driverPayoutPage}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    driverPayout?.earnings?.[0]?.totalCount?.[0]?.count || 0
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
    </>
  );
};

export default DriverPayout;
