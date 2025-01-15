import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addFaq, getFaq } from '../../features/slices/staticContentManagement';
import { toastService } from '../../utils/toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import QuillEditor from '../QuillEditor';
const initialState={
    question:"",
    answer:"",
}
const AddFaq = () => {
    const [iState,setUpdateState] =useState(initialState)
    const {question,answer}=iState;
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setUpdateState({...iState,[e.target.name]:e.target.value})
    }
    const handleSubmit=()=>{
        dispatch(addFaq(iState)).then(res=>{
            if(res?.payload?.code==200){
                toastService.success("add Faq successfully")
                  dispatch(getFaq());
                navigate("/contentManagement");
            }else{
                toastService.error(res?.payload?.message);
                console.log({res});
            }
        })
    }
     const handleQuillChange = (name, value) => {
       setUpdateState((prev) => ({
         ...prev,
         [name]: value,
       })); // Dynamically update the corresponding state field
     };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Content Management</h4>
          </div>
          <div className="CommonForm">
            <h4>Add FAQ</h4>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Question</label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={question}
                    name="question"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2">
                  <label>Answer</label>
                </div>
                <div className="col-sm-10">
                  <QuillEditor
                    name="answer"
                    value={answer}
                    onChange={handleQuillChange}
                    // error={errors.description}
                    // Optional custom height
                  />
                  {/* <textarea
                    rows="10"
                    cols="100"
                    placeholder="Type your content here..."
                    style={{ padding: "10px", fontSize: "16px" }}
                    name="answer"
                    value={answer}
                    onChange={handleChange}
                  ></textarea> */}
                  <br />

                  <button className="Button" onClick={handleSubmit}>
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
}

export default AddFaq