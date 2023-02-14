import React from "react";
import { useNavigate } from "react-router-dom";

import "./chatHeader.css";

const ChatHeader = ({ roomName, scrollTop }) => {
  return (
    <div className="chat-header">
      <span className="room-name-header">{roomName}</span>
      <span>{scrollTop}</span>
    </div>
  );
};

export default ChatHeader;
