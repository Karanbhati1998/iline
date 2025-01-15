import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { configData } from "../utils/CkEditorData";
import CkEditorComponent from "./CkEditorComponent";
import { useDispatch, useSelector } from "react-redux";
import { editStaticContent, getStaticContent } from "../features/slices/staticContentManagement";
import { toastService } from "../utils/toastify";
import QuillEditor from "./QuillEditor";
const EditContentManagement = () => {
  const [description, setDescription] = useState("");
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { supportContent } = useSelector((state) => {
    return state?.contentManagement;
  });
  useEffect(() => {
     dispatch(getStaticContent({ type: state })).then((res) => {
       if (res?.payload?.code == 200) {
         console.log(res);
         setDescription(res?.payload?.staticResult?.description);
       } else {
         console.log({ res });
       }
     });
  }, [state]);
  console.log({ state });
  const handleUpdate = () => {
    dispatch(
      editStaticContent({
        staticId: supportContent?.staticResult?._id,
        description,
      })
    ).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("Edit Successfully");
        navigate("/contentManagement");
      } else {
        toastService.error("Edit Failed");
        console.log({ res });
      }
    });
  };
 const handleQuillChange = (name, value) => {
   setDescription(value)// Dynamically update the corresponding state field
 };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Content Management</h4>
          </div>
          <div className="CommonForm">
            <h4>Update Content</h4>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Description</label>
                </div>
                <div className="col-sm-10">
                  {/* <CkEditorComponent/> */}
                  <QuillEditor
                    name="description"
                    value={description}
                    onChange={handleQuillChange}
                    // Optional custom height
                  />
                  {/* <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="10"
                    cols="100"
                    placeholder="Type your content here..."
                    style={{ padding: "10px", fontSize: "16px" }}
                  ></textarea> */}
                  <br />
                  <button className="Button" onClick={handleUpdate}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContentManagement;
