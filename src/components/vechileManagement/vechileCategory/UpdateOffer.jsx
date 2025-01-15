import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Modal";
import { editOffer, getOffersList } from "../../../features/slices/vechileManagement/vechileCategory";
import { toastService } from "../../../utils/toastify";
import { imageUpload } from "../../../features/slices/imageUpload";
import { useDispatch } from "react-redux";
import LoaderForImage from "../../LoaderForImage";
const initialState = {
  categoryId: "",
  discountLabel: "",
  discountRate: "",
  imageUrl: "",
  startDate: "",
  endDate: "",
  errors: {},
  imageLoader: false,
  id: "",
};
const UpdateOffer = ({ handleCloseUpdateModal,data }) => {
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
      id
    } = iState;
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
  useEffect(() => {
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toISOString().split("T")[0]; // Formats to 'YYYY-MM-DD'
    };

    setUpdateState((prev) => ({
      ...prev,
      categoryId: data?.categoryId || "",
      discountLabel: data?.discountLabel || "",
      discountRate: data?.discountRate || "",
      endDate: formatDate(data?.endDate),
      imageUrl: data?.imageUrl || "",
      startDate: formatDate(data?.startDate),
      id: data?._id || "",
    }));
  }, [data]);

    console.log({data,iState});
    
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
          id
        };
        if (handleValidation()) {
          dispatch(editOffer(data)).then((res) => {
            if (res?.payload?.code == 200) {
              toastService.success("Vehicle category offer edit successfully");
              dispatch(getOffersList({ categoryId, page }));
              setUpdateState(initialState);
              handleCloseUpdateModal();
            } else {
              toastService.error("Failed to edit vehicle category offer");
            }
          });
        }
      };
  return (
    <div className="ModalBox modal-open ">
      <div
        id="SubAdminUserEdit"
        className="modal fade show"
        role="dialog"
        aria-modal="true"
        style={{ paddingRight: 6, display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="Category">
                <a className="CloseModal" onClick={handleCloseUpdateModal}>
                  ×
                </a>
                <h3>Edit offer</h3>
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
                        width: "150px",
                        height: "150px",
                        borderRadius: "0",
                        overflow: "hidden",
                        border: "2px solid #979797",
                        position: "relative",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Uploaded Icon"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
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

                <button className="Button" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UpdateOffer;
