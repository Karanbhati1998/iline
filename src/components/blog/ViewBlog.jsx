import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import QuillEditor from "../QuillEditor";
import LoaderForImage from "../LoaderForImage";
const initialState = {
  title: "",
  author: "",
  image: "",
  description: "",
  imageLoader: false,
};
const ViewBlog = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { author, description, image, title, imageLoader } = iState;
  const dispatch = useDispatch();
  const { state } = useLocation();
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      title: state?.title || "",
      author: state?.author || "",
      description: state?.description || "",
      image: state?.image || "",
      id: state?._id,
    }));
  }, []);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Blog Management</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="CommonForm">
            <h4>View Blog</h4>
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
                    disabled
                  />
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
                    disabled
                  />
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
                          type="file"
                          name="image"
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
                      />
                      <input
                        disabled
                        type="file"
                        name="image"
                        accept=".jpg,.png,.jpeg"
                        style={{ display: "none" }} // Hide the file input
                      />
                    </figure>
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
                    disabled={true}
                    // Optional custom height
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
