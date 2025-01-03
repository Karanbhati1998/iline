import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import LoaderForImage from '../../LoaderForImage';
import { addOffer, getOffersList } from '../../../features/slices/vechileManagement/vechileCategory';
import { useDispatch, useSelector } from 'react-redux';
import { imageUpload } from '../../../features/slices/imageUpload';
import { toastService } from '../../../utils/toastify';
import moment from 'moment';
import CommonPagination from '../../CommonPagination';
import ExportToExcel from '../../ExportToExcel';
const initialState = {
  categoryId: "",
  discountLabel: "",
  discountRate: "",
  imageUrl: "",
  startDate: "",
  endDate: "",
  page: 1,
  errors: {},
  imageLoader: false,
};
const AddOffer = () => {
  const [iState, setUpdateState] = useState(initialState);
    const {
      categoryId,
      discountLabel,
      discountRate,
      endDate,
      imageUrl,
      page,
      startDate,
      errors,
      imageLoader,
    } = iState;
    const { state } = useLocation();
    const dispatch=useDispatch()
    const fileInputRef = useRef(null);
     const offerRef = useRef();
    useEffect(() => {
      setUpdateState((prev) => ({
        ...prev,
        categoryId: state,
      }));
    }, []);
    useEffect(() => {
      dispatch(getOffersList({ categoryId: state, page }));
    }, [page, state]);
      const { VechileOffers } = useSelector((state) => {
        return state?.vechileCategory;
      });
      console.log({ VechileOffers });
     const handleEditClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const uploadImage = (e) => {
      console.log({ errors });
      console.log(e.target.name);
      setUpdateState((prev) => ({
        ...prev,
        imageLoader: true,
        errors: {
          ...prev.errors,
          [e.target.name]: "",
        },
      }));
      const file = e.target?.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("fileName", file);
        dispatch(imageUpload(formData)).then((res) => {
          if (res?.payload?.code == 200) {
            toastService.success("image uploaded successfully");
            setUpdateState((prev) => ({
              ...prev,
              [e.target.name]: res?.payload?.url,
              imageLoader: false,
            }));
          } else {
            toastService.error("image upload failed");
            setUpdateState((prev) => ({
              ...prev,
              [e.target.name]: "",
              imageLoader: false,
            }));
          }
        });
      } else {
        toastService.error("File not found");
      }
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateState((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    };
    const handleValidation = () => {
      let formErrors = {};
      let isValid = true;
      if (!discountLabel.trim()) {
        formErrors.discountLabel = " Discount label is required";
        isValid = false;
      }
      if (!discountRate.trim()) {
        formErrors.discountRate = " Discount rate is required";
        isValid = false;
      }
      if (!startDate.trim()) {
        formErrors.startDate = "Start date is required";
        isValid = false;
      }
      if (!imageUrl.trim()) {
        formErrors.imageUrl = " Icon is required";
        isValid = false;
      }
      if (!endDate.trim()) {
        formErrors.endDate = "End date is required";
        isValid = false;
      }
      setUpdateState((prev) => ({
        ...prev,
        errors: formErrors,
      }));
      return isValid;
    };
    const handleSubmit = () => {
      const data = {
        discountLabel,
        discountRate,
        categoryId,
        imageUrl,
        startDate,
        endDate,
      };
      if (handleValidation()) {
        dispatch(addOffer(data)).then((res) => {
          if (res?.payload?.code == 200) {
            toastService.success(
              "Vehicle category offer added successfully"
            );
            dispatch(getOffersList({ categoryId: state,page }));
            setUpdateState(initialState);
          } else {
            toastService.error("Failed to add vehicle category offer");
          }
        });
      }
    };
    const handlePageChange = (page) => {
        setUpdateState({ ...iState, page });
      };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Add Vehicle Category</h4>
          <div className="TitleLink">
            <a className="TitleLink" href="vehicle-category-listing.html">
              <i className="fa fa-arrow-left" aria-hidden="true" />
              Back
            </a>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Add offer</h4>
          </div>
          <div className="CommonForm">
            {/* <h4>Category Profile</h4> */}
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter the Discount Label </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Label"
                    name="discountLabel"
                    value={discountLabel}
                    onChange={handleChange}
                  />
                  {errors?.discountLabel && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors?.discountLabel}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Enter Discount Rate (in %) </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the discount rate"
                    name="discountRate"
                    value={discountRate}
                    onChange={handleChange}
                  />
                  {errors?.discountRate && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors?.discountRate}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Upload icon</label>
                  {imageLoader ? (
                    <LoaderForImage />
                  ) : !imageUrl ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload icon</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="imageUrl"
                          onChange={uploadImage}
                          accept=".jpg,.png,.jpeg"
                        />
                      </div>
                    </div>
                  ) : (
                    <figure
                      style={{
                        margin: "0",
                        width: "120px",
                        borderRadius: "0",
                        overflow: "hidden",
                        border: "2px solid #979797",
                        position: "relative",
                      }}
                    >
                      <img src={imageUrl} alt="Uploaded Icon" />
                      <i
                        className="fa fa-edit"
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          color: "#fff",
                          background: "rgba(0, 0, 0, 0.6)",
                          borderRadius: "50%",
                          padding: "5px",
                          zIndex: 2, // Place icon above the image
                          cursor: "pointer",
                        }}
                        onClick={handleEditClick} // Trigger the file input click
                      />
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="imageUrl"
                        onChange={uploadImage}
                        accept=".jpg,.png,.jpeg"
                        style={{ display: "none" }} // Hide the file input
                      />
                    </figure>
                  )}

                  {errors?.imageUrl && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors?.imageUrl}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder=""
                    name="startDate"
                    value={startDate}
                    onChange={handleChange}
                  />
                  {errors?.startDate && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors?.startDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder=""
                    name="endDate"
                    value={endDate}
                    onChange={handleChange}
                  />
                  {errors?.endDate && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors?.endDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-4 mt-4">
                <button className="Button" onClick={handleSubmit}>
                  ADD
                </button>
              </div>
            </div>
          </div>
          <div className="FilterArea mb-4">
            <div className="FilterLeft"></div>
            <div className="FilterRight">
              <ExportToExcel ref={offerRef} fileName="vechileCategoryOffer" />
            </div>
          </div>
          <div className="TableList">
            <table ref={offerRef}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Discount Label</th>
                  <th>Discount Rate (in %)</th>
                  <th>Banner</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {VechileOffers?.result?.[0]?.paginationData?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + (page - 1) * 10}</td>
                      <td> {res?.discountLabel}</td>
                      <td>{res?.discountRate}</td>
                      <td>
                        <figure>
                          <img src={res?.imageUrl} />
                        </figure>
                      </td>
                      <td>{moment(res?.startDate).format("DD-MM-YYYY")}</td>
                      <td>{moment(res?.endDate).format("DD-MM-YYYY")}</td>

                      <td>
                        <span
                          className={res?.status == "ACTIVE" ? "Green" : "Red"}
                        >
                          {res?.status}
                        </span>{" "}
                      </td>
                      <td>
                        <div className="Actions">
                          <a className="Blue" href="">
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </a>
                          <a className="Red" href="">
                            <i className="fa fa-trash" aria-hidden="true" />
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
                  {VechileOffers?.result?.[0]?.totalCount?.[0]?.count || 0}
                </span>
              </p>
            </div>

            <div className="PaginationRight">
              {VechileOffers?.result?.[0]?.totalCount?.[0]?.count > 0 && (
                <CommonPagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={
                    VechileOffers?.result?.[0]?.totalCount?.[0]?.count || 0
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
}

export default AddOffer