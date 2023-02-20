import React, { useState } from "react";

import "./chatFooter.css";

const ChatFooter = ({ socket, chatroomId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() && socket) {
      socket.emit("sendMessage", {
        chatroomId: chatroomId,
        message,
      });
      console.log(message);
      console.log(chatroomId);
    }

    setMessage("");
  };

  return (
    <footer className="chat-footer">
      <form className="footer-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type message..."
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-btn">
          <i className="fa-solid fa-location-arrow fa-3x"></i>
        </button>
      </form>
    </footer>
  );
};

export default ChatFooter;
