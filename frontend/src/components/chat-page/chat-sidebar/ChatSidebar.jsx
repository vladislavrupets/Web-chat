import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./chatSidebar.css";
import ModalAddChatroom from "./modal-add-chatroom/ModalAddChatroom";

const ChatroomsSidebar = ({
  lastMessages,
  chatrooms,
  setRooms,
  handleClickChatroom,
  userId,
  socket,
}) => {
  const [isModalAddChatroomActive, setModalAddChatroomActive] = useState(false);
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  //need to fix modal
  return (
    <>
      {lastMessages && (
        <aside className="chat-sidebar">
          <div className="buttons-container">
            <span className="logout-btn" onClick={handleLeaveChat}>
              Logout
            </span>
            <span
              className="add-chatroom-btn"
              onClick={() => setModalAddChatroomActive(true)}
            >
              Add chatroom
            </span>
          </div>
          <ModalAddChatroom
            isActive={isModalAddChatroomActive}
            setActive={setModalAddChatroomActive}
            setRooms={setRooms}
            socket={socket}
          />
          {chatrooms.map((chatroom) => (
            <div
              className="chatroom-container-content"
              key={chatroom._id}
              onClick={() =>
                handleClickChatroom(chatroom._id, chatroom.roomName)
              }
            >
              <h4 className="chatroom-name">{chatroom.roomName}</h4>
              {lastMessages[chatroom._id] && (
                <div className="inner-chatroom-content">
                  {lastMessages[chatroom._id].user._id === userId ? (
                    <span className="chatroom-content-own">You:</span>
                  ) : (
                    <span className="chatroom-content-login">
                      {lastMessages[chatroom._id].user.login + ":"}
                    </span>
                  )}
                  <span className="chatroom-content-message">
                    {lastMessages[chatroom._id].messageText}
                  </span>
                </div>
              )}
            </div>
          ))}
        </aside>
      )}
    </>
  );
};

export default ChatroomsSidebar;
