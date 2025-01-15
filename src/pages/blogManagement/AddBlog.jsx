import React, { useRef, useState } from "react";
import { toastService } from "../../utils/toastify";
import { imageUpload } from "../../features/slices/imageUpload";
import LoaderForImage from "../../components/LoaderForImage";
import { useDispatch } from "react-redux";
import { addBlog } from "../../features/slices/blogSlice";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../../components/QuillEditor";
const initialState = {
  title: "",
  author: "",
  image: "",
  description: "",
  errors: {},
  imageLoader: false,
};
const AddBlog = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { author, description, errors, image, title, imageLoader } = iState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const fileInputRef=useRef()
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
  const handleQuillChange = (name, value) => {
    setUpdateState((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: "",
      },
    })); // Dynamically update the corresponding state field
  };

  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;
    if (!title.trim()) {
      formErrors.title = "Title is required";
      isValid = false;
    }
    if (!author.trim()) {
      formErrors.author = "Author is required";
      isValid = false;
    }
    if (!description.trim()) {
      formErrors.description = "Description is required";
      isValid = false;
    }
    if (!image.trim()) {
      formErrors.image = "Image is required";
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
      title,
      author,
      image,
      description,
    };
    if (handleValidation()) {
      dispatch(addBlog(data)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Blog added successfully");
          setUpdateState(initialState);

          navigate("/blogManagement");
        } else {
          toastService.error("Blog add failed");
        }
      });
    }
  };
   const handleEditClick = () => {
     if (fileInputRef.current) {
       fileInputRef.current.click();
     }
   };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Blog Management</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            <h4>Add Blog</h4>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Title</label>
                </div>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    placeholder="Enter Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Author</label>
                </div>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    placeholder="Enter Author"
                    name="author"
                    value={author}
                    onChange={handleChange}
                  />
                  {errors.author && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.author}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Image </label>
                </div>
                <div className="col-sm-10">
                  {imageLoader ? (
                    <LoaderForImage />
                  ) : !image ? (
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload Icon</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="image"
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
                      <img
                        src={image}
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
                        name="image"
                        onChange={uploadImage}
                        accept=".jpg,.png,.jpeg"
                        style={{ display: "none" }} // Hide the file input
                      />
                    </figure>
                  )}

                  {errors.image && (
                    <p className="d-flex justify-content-start text-danger mt-2 error">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Description</label>
                </div>
                 <div className="col-sm-10">

                <QuillEditor
                  name="description"
                  value={description}
                  onChange={handleQuillChange}
                  error={errors.description}
                  // Optional custom height
                />
                 </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <label></label>
                </div>
                <button className="Button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
