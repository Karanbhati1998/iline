import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const Reply = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(""); 
    const {state}=useLocation()
    console.log({state});
    
  const userId = state?.userId; 
  const roomId = state?.roomId; 
  const ticketId = state?.ticket_number; 
  const profilePic =
    "https://mobileapplications.s3.ap-south-1.amazonaws.com/pexels-premsinghtanwar-25311235.jpg"; 
  const sendBy = "Karan"; 

  useEffect(() => {
    const socketInstance = io("http://15.206.16.230:4100");
    setSocket(socketInstance);
    socketInstance.emit("joinRooms", { roomId, user: userId });
    socketInstance.on("receiveMessege", (data) => {
      if (data.roomId === roomId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });
    return () => {
      socketInstance.disconnect();
    };
  }, [roomId, userId]);

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        message: newMessage,
        userId,
        ticketId,
        profilePic,
        sendBy,
        roomId,
        seen_status_by_user: true,
      };

      // Emit the message to the server
      socket.emit("sendMessege", messageData);

      // Add the message locally
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, sender: "You" },
      ]);

      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Help Center</h4>
        </div>
        <div className="conversation-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <div className="message" key={index}>
                <span>{msg.sendBy || "Anonymous"}</span>
                <img
                  src={msg.profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="profile-pic"
                />
                <br />
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Write your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
