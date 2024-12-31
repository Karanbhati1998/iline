import React, { useEffect, useRef, useState } from 'react'
import BackButton from '../../BackButton';
import { toastService } from '../../../utils/toastify';
import { useDispatch } from 'react-redux';
import { imageUpload } from '../../../features/slices/imageUpload';
import LoaderForImage from '../../LoaderForImage';
import { addFeature } from '../../../features/slices/vechileManagement/vechileCategory';
import { useLocation } from 'react-router-dom';
const initialState = {
  name: "",
  icon: "",
  categoryId:"",
  errors: {},
  imageLoader: false,
};
const AddFeatureList = () => {
  const [iState, setUpdateState] = useState(initialState);
  const dispatch = useDispatch();
  const {state}=useLocation()
  const fileInputRef = useRef(null);
  useEffect(()=>{
    setUpdateState(prev=>({
      ...prev,
      categoryId:state,
    }))
  },[])
  const { name, icon, categoryId, errors, imageLoader } = iState;
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
        imageLoader:true,
        errors: {
          ...prev.errors,
          [e.target.name]: "",
        }
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
    const handleChange=(e)=>{
      const {name,value}=e.target
      setUpdateState((prev) => ({
         ...prev,
          [name]:value,
          errors:{
           ...prev.errors,
            [name]: "",
          }
        }));
    }
    const handleValidation=()=>{
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
         setUpdateState(prev=>({
          ...prev,
           errors:formErrors,
         }))
    return isValid;
    }
    const handleSubmit=()=>{
      const data={
        name,
        icon,
        categoryId
      }
      if(handleValidation()){
        dispatch(addFeature(data)).then(res=>{
          if(res?.payload?.code==200){
            toastService.success("Vehicle category features added successfully")
            setUpdateState(initialState)
          }else{
            toastService.error("Failed to add vehicle category features");
          }
        })
      }
    }
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Add Vehicle Category</h4>
          <div className="TitleLink">
            <a className="TitleLink">
              <BackButton />
            </a>
          </div>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            <h4>Category Profile</h4>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Enter Features</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the feature"
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
              </div>
              <div className="col-sm-4">
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
                        width: "120px",
                        borderRadius: "0",
                        overflow: "hidden",
                        border: "2px solid #979797",
                        position: "relative",
                      }}
                    >
                      <img src={icon} alt="Uploaded Icon" />
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
              </div>
              <div className="col-sm-2">
                <div className="form-group">
                  <button className="Button" onClick={handleSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <h4>Features </h4>
              </div>
              <div className="col-sm-4">
                <h4>Features icon </h4>
              </div>
              <div className="col-sm-4">
                <h4>Action</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label>Feature </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fast Delivery"
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <img src="images/car.png" />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <div className="Actions">
                  <a className="Green">
                    <i className="fa fa-pencil" />
                  </a>
                  <a
                    className="Red"
                    data-toggle="modal"
                    data-target="#DeleteModal"
                  >
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label>Feature </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fast Delivery"
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <img src="images/car.png" />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <div className="Actions">
                  <a className="Green">
                    <i className="fa fa-pencil" />
                  </a>
                  <a
                    className="Red"
                    data-toggle="modal"
                    data-target="#DeleteModal"
                  >
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFeatureList