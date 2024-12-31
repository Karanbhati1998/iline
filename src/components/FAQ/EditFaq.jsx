import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editFaq } from "../../features/slices/staticContentManagement";
import { toastService } from "../../utils/toastify";
import { useDispatch } from "react-redux";
const initialState = {
  question: "",
  answer: "",
  faqId:"",
};
const EditFaq = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { question, answer } = iState;
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      question: state.question,
      answer: state.answer,
      faqId: state._id,
    }));
  }, [state]);
  const handleChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(editFaq(iState)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("edit Faq successfully");
        navigate("/contentManagement");
      } else {
        toastService.error(res?.payload?.message);
        console.log({ res });
      }
    });
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Content Management</h4>
          </div>
          <div className="CommonForm">
            <h4>Update FAQ</h4>
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
                  <textarea
                    rows="10"
                    cols="100"
                    placeholder="Type your content here..."
                    style={{ padding: "10px", fontSize: "16px" }}
                    name="answer"
                    value={answer}
                    onChange={handleChange}
                  ></textarea>
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
};

export default EditFaq;
