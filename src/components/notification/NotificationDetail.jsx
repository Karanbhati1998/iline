import React, { useState } from "react";
import SendNotificationModal from "./SendNotificationModal";
import { useLocation } from "react-router-dom";
import BackButton from "../BackButton";
import moment from "moment";

const NotificationDetail = () => {
  const [sendModal, setSendModal] = useState(false);
  const { state } = useLocation();
  console.log({ state });

  const handleClose = () => {
    setSendModal(false);
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <a className="TitleLink">
              <BackButton />
            </a>
          </div>
          <div className="OrderDetails">
            <h5> Notification Detail</h5>
            <article>
              <aside className="w-100">
                <p>
                  <label>Notification ID</label>
                  <span>{state?.noti_number}</span>
                </p>
                <p>
                  <label>Sent on</label>
                  <span>{moment(state.createdAt).format("DD-MM-YYYY")}</span>
                </p>
                <p>
                  <label>Sent To</label>
                  <span>50000 Users</span>
                </p>
                <p>
                  <label>User Group</label>
                  <span>{state?.userType}</span>
                </p>
                <p>
                  <label>Notification Title</label>
                  <span> {state?.title}</span>
                </p>
                <p className="d-flex">
                  <label>Notification Body</label>
                  <span style={{ width: "calc(100% - 185px)" }}>
                    {state?.content}
                  </span>
                </p>
                <p className="d-flex">
                  <label>Images </label>
                </p>
                <ul className="DetailsImages">
                  <li>
                    <figure style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "cover"
                    }}>
                      <img src={state?.contentUrl}  />
                    </figure>
                  </li>
                </ul>
                <p />
              </aside>
            </article>
            <div className="mt-4">
              <button className="Button" onClick={() => setSendModal(true)}>
                Resend
              </button>
             
            </div>
          </div>
        </div>
      </div>
      {sendModal && (
        <SendNotificationModal handleClose={handleClose} id={state?._id} />
      )}
    </>
  );
};

export default NotificationDetail;
