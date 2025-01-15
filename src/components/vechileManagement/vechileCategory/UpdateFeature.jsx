import React, { useEffect, useRef, useState } from 'react'
import Modal from "../../Modal"
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toastService } from '../../../utils/toastify';
import { imageUpload } from '../../../features/slices/imageUpload';
import LoaderForImage from '../../LoaderForImage';
import { editFeature, getFeaturesList } from '../../../features/slices/vechileManagement/vechileCategory';
const initialState = {
  name: "",
  icon: "",
  id: "",
  categoryId:"",
  imageLoader: false,
  errors: {},
};
const UpdateFeature = ({ state, handleClose }) => {
  const [iState, setUpdateState] = useState(initialState);
  const { name, icon, imageLoader, errors, categoryId,id } = iState;

  const dispatch = useDispatch();
   const fileInputRef = useRef(null);
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      name: state?.name || "",
      icon: state?.icon || "",
      id: state?._id,
      categoryId: state?.categoryId,
    }));
  },[]);
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
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

  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;
    if (!name.trim()) {
      formErrors.name = " Name is required";
      isValid = false;
    }
    if (!icon.trim()) {
      formErrors.icon = "Icon is required";
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
      name,
      icon,
      id,
    };
    if (handleValidation()) {
      dispatch(editFeature(data)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Vehicle category features edit successfully");
          setUpdateState(initialState);
          handleClose();
          dispatch(getFeaturesList({ categoryId }));
        } else {
          toastService.error("Failed to edit vehicle category features");
        }
      });
    }
  };
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Edit Features</h3>

          <div className="form-group">
            <label>Enter Features</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors?.name && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors?.name}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Upload icon</label>
            {imageLoader ? (
              <LoaderForImage />
            ) : !icon ? (
              <div className="UploadBox">
                <div className="Upload">
                  <i className="fa fa-upload" /> <span>Upload Icon</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="icon"
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
                  src={icon}
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
                  name="icon"
                  onChange={uploadImage}
                  accept=".jpg,.png,.jpeg"
                  style={{ display: "none" }} // Hide the file input
                />
              </figure>
            )}

            {errors?.icon && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors?.icon}
              </p>
            )}
          </div>
          <button className="Button" onClick={handleSubmit}>
            {" "}
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateFeature