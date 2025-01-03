import React, { useRef, useState } from "react";
import Modal from "../Modal";
import { imageUpload } from "../../features/slices/imageUpload";
import { toastService } from "../../utils/toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoaderForImage from "../LoaderForImage";
import { addBanner, getBannerList } from "../../features/slices/bannerSlice";
const initialState = {
  name: "",
  imageUrl: "",
  errors: {},
  imageLoader: false,
};
const UploadBanner = ({ handleClose }) => {
  const [iState, setUpdateState] = useState(initialState);
  const {name,imageUrl,errors,imageLoader}=iState
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    const handleEditClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleChange = (e) => {
      setUpdateState({...iState,[e.target.name]:e.target.value})
    }
  const uploadImage = (e) => {
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
      console.log({ file });
      const formData = new FormData();
      formData.append("fileName", file);
      dispatch(imageUpload(formData)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("image uploaded successfully");
          setUpdateState((prev) => ({
            ...prev,
            imageLoader: false,
            [e.target.name]: res?.payload?.url,
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
  const handleValidation=()=>{
    let formErrors = {};
    let isValid = true;
    if (!name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    if (!imageUrl.trim()) {
      formErrors.imageUrl = "Image is required";
      isValid = false;
    }
    setUpdateState((prev) => ({
     ...prev,
      errors: formErrors,
    }));
    return isValid;
  }
  const handleSubmit=()=>{
    const data ={
      name,
      imageUrl
    }
    if(handleValidation()){
      dispatch(addBanner(data)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Banner added successfully");
          navigate("/bannerManagement");
          dispatch(getBannerList())
          handleClose();
        } else {
          toastService.error("Banner add failed");
        }
      });
    }
  }
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Upload Banner</h3>
          <div className="form-group">
            <label>Banner Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Banner Name "
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Upload banner Image </label>
            {imageLoader ? (
              <LoaderForImage />
            ) : !imageUrl ? (
              <div className="UploadBox">
                <div className="Upload">
                  <i className="fa fa-upload" /> <span>Upload Icon</span>
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
                <img src={imageUrl} alt="Uploaded Icon" style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                  transition: "transform 0.3s ease",
                }}/>
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

            {errors.imageUrl && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.imageUrl}
              </p>
            )}
          </div>
          <button className="Button" onClick={handleSubmit}>
            Upload New banner
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadBanner;
