import React from "react";
import { useNavigate } from "react-router-dom";

import "./chatHeader.css";

const ChatHeader = (props) => {
  return (
    <div className="chat-header">
      <span className="room-name-header">{props.roomName}</span>
    </div>
  );
};

export default ChatHeader;
