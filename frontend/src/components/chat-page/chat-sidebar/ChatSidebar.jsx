import React from "react";
import { useNavigate } from "react-router-dom";

import "./chatSidebar.css";

const ChatroomsSidebar = (props) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  //need to fix
  if (props.lastMessages) {
    return (
      <aside className="chat-sidebar">
        <div className="logout-btn" onClick={handleLeaveChat}>
          Logout
        </div>
        {props.chatrooms.map((chatroom) => (
          <div
            className="chatroom-container-content"
            key={chatroom._id}
            onClick={() =>
              props.handleClickChatroom(chatroom._id, chatroom.roomName)
            }
          >
            <h4 className="chatroom-name">{chatroom.roomName}</h4>
            <div className="inner-chatroom-content">
              {props.lastMessages[chatroom._id].user._id === props.userId ? (
                <span className="chatroom-content-own">You:</span>
              ) : (
                <span className="chatroom-content-login">
                  {props.lastMessages[chatroom._id].user.login + ":"}
                </span>
              )}
              <span className="chatroom-content-message">
                {props.lastMessages[chatroom._id].messageText}
              </span>
            </div>
          </div>
        ))}
      </aside>
    );
  }
};

export default ChatroomsSidebar;
