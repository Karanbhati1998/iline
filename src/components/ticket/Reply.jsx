import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { previousChat } from "../../features/slices/supportTicketManagement";
import { getToken } from "../../utils/getToken";
import moment from "moment/moment";
import { useSocket } from "../../context/SocketContext";
const initialState = {
  userId: "",
  roomId: "",
  ticketId: "",
  profilePic: "",
  sendBy: "Admin",
  desription:""
};
const Reply = () => {
  const [iState, setUpdateState] = useState(initialState);
  const { userId, roomId, ticketId, profilePic, sendBy, description } = iState;
  const { state } = useLocation();
  console.log({state});
  
  const dispatch = useDispatch();
  const lastMessageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socket = useSocket();

  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      userId: state?.userId,
      roomId: state?.roomId,
      ticketId: state?.ticket_number,
      profilePic: state?.profilePic,
      description: state?.description,
      sendBy: "Admin",
    }));
  }, [state]);

  useEffect(() => {
    dispatch(previousChat({ roomId })).then((res) => {
      if (res?.payload?.code === 200) {
        setMessages((prev) => [...prev, ...res?.payload?.askedData]);
      }
    });
  }, [roomId, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinrooms", {
        roomId,
        user: userId,
      });

      socket.on("recieveMessage", (data) => {
        console.log({data});
        
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      return () => {
        socket.off("recieveMessage");
      };
    }
  }, [socket, roomId, userId]);

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        message: newMessage,
        userId: "674562c051af2d77388255e2",
        ticketId,
        profilePic,
        sendBy,
        roomId,
        seen_status_by_user: true,
      };
      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
useEffect(() => {
  if (lastMessageRef.current) {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Help Center</h4>
        </div>

        <div className="InformationBoxDetails mb-4">
          <div className="Informations ">
            <div className="ProfileInfo ">
              <article>
                <aside className="full">
                  <p>
                    <strong>Ticket No.</strong>
                    <span>{ticketId}</span>
                  </p>
                  <p>
                    <strong>description</strong>
                    <span> {description}</span>
                  </p>
                </aside>
              </article>
            </div>
          </div>
        </div>
        <div
          className="conversation-container"
          style={{
            padding: "0px",
          }}
        >
          <div className="messages">
            <div
              className="col-sm-12"
              style={{
                padding: "0px",
              }}
            >
              <div className="chat-panel">
                <div className="chat-header">
                  <div className="chat-item active">
                    <div className="avatar">
                      <img src={state?.userData?.profilePic} style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }} />
                    </div>
                    <div className="chat-info">
                      <p className="chat-title">{state?.userData?.fullName}</p>
                    </div>
                  </div>
                </div>
                {messages?.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg?.sendBy !== "Admin"
                        ? "message received"
                        : "message sent right"
                    }
                    ref={index === messages.length - 1 ? lastMessageRef : null} // Add ref to the last message
                  >
                    <p className="message-text">{msg.message}</p>
                    <span className="message-time">
                      {moment(msg?.createdAt).format("hh:mm A")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="messages">
            {messages?.map((msg, index) => (
              <div className="message" key={index}>
                <img
                  src={msg.profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="profile-pic"
                  style={{
                    width: "53px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "2px",
                    float: "none",
                    marginLeft: "10px",
                  }}
                >
                  {msg.sendBy || "Anonymous"}
                </span>
                <br />
                <p
                  style={{
                    marginLeft: "60px",
                    marginTop: "10px",
                    display: "inline-block",
                  }}
                >
                  {msg.message}
                </p>
              </div>
            ))}
          </div> */}
          <div className="input-container">
            <input
              type="text"
              placeholder="Write your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
