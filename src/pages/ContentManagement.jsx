import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFaq,
  getStaticContent,
} from "../features/slices/staticContentManagement";
import { Link, useNavigate } from "react-router-dom";
import DeleteFaq from "../components/FAQ/DeleteFaq";
const initialState = {
  deleteModal: "",
  id:""
};
const ContentManagement = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { deleteModal,id } = iState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { supportContent, faq } = useSelector((state) => {
    return state?.contentManagement;
  });
  console.log({ faq });

  const handleClick = (type) => {
    dispatch(getStaticContent({ type }));
  };
  console.log({ supportContent });
  const handleOpenFaq = () => {
    dispatch(getFaq());
  };
  const handleAddFaq = () => {
    navigate("/addFaq");
  };
  const handleopenFaq=(id)=>{
      setUpdateState(prev=>({
        ...prev,
        deleteModal:true,
        id:id
      }))
  }
  const handleCloseFaq=()=>{
      setUpdateState(prev=>({
        ...prev,
        deleteModal:false
      }))
  }
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Content Management</h4>
          </div>
          <div className="StaticArea">
            <div id="accordion">
              <div className="card">
                <div
                  className="card-header"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapse1"
                  aria-expanded="true"
                  onClick={() => handleClick("PRIVACY")}
                >
                  <h4>Privacy Policy</h4>
                  <Link to="/editContentManagemnt" state={"PRIVACY"}>
                    <i className="fa fa-pencil" />
                  </Link>
                </div>
                <div
                  id="collapse1"
                  className="panel-collapse collapse in"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {supportContent?.staticResult?.description}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapse2"
                  onClick={() => handleClick("TERMS")}
                >
                  <h4>Terms and condition</h4>
                  <Link to="/editContentManagemnt" state={"TERMS"}>
                    <i className="fa fa-pencil" />
                  </Link>
                </div>
                <div
                  id="collapse2"
                  className="panel-collapse collapse"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {supportContent?.staticResult?.description}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapse3"
                  onClick={() => handleClick("ABOUT")}
                >
                  <h4>About this App</h4>
                  <Link to="/editContentManagemnt" state={"ABOUT"}>
                    <i className="fa fa-pencil" />
                  </Link>
                </div>
                <div
                  id="collapse3"
                  className="panel-collapse collapse"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {supportContent?.staticResult?.description}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapse4"
                  onClick={() => handleClick("CONTACT")}
                >
                  <h4>Contact Us</h4>
                  <Link to="/editContentManagemnt" state={"CONTACT"}>
                    <i className="fa fa-pencil" />
                  </Link>
                </div>
                <div
                  id="collapse4"
                  className="panel-collapse collapse"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {supportContent?.staticResult?.description}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapse5"
                  onClick={() => handleClick("REFUND")}
                >
                  <h4>Refund Policy</h4>
                  <Link
                    to="/editContentManagemnt"
                    state={supportContent?.staticResult}
                  >
                    <i className="fa fa-pencil" />
                  </Link>
                </div>
                <div
                  id="collapse5"
                  className="panel-collapse collapse"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {supportContent?.staticResult?.description}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header collapsed"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapse6"
                  aria-expanded="false"
                  onClick={handleOpenFaq}
                >
                  <h4>FAQs</h4>
                  <a
                    className="Button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFaq();
                    }}
                  >
                    Add More Questions
                  </a>
                </div>
                <div
                  id="collapse6"
                  className="panel-collapse collapse"
                  style={{}}
                >
                  <div className="card-body">
                    {faq?.addData?.map((res, i) => {
                      return (
                        <div className="FaqBox">
                          <aside>
                            <Link to="/editFaq" state={res} className="Green">
                              <i className="fa fa-pencil" />
                            </Link>
                            <a
                              className="Red"
                              onClick={() => handleopenFaq(res?._id)}
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </aside>
                          <h5>
                            {i + 1}. {res?.question}
                          </h5>
                          <p>{res?.answer}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteModal && <DeleteFaq handleCloseFaq={handleCloseFaq} id={id} />}
    </>
  );
};

export default ContentManagement;
