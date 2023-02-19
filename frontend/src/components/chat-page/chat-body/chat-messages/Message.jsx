import React from "react";

import "./message.css";

const Message = ({
  message,
  userId,
  lastMessageRef,
  firstMessageRef,
  index,
  messagesLength,
}) => {
  return message.user._id === userId ? (
    <div className="content-sender" key={message.messageId || message._id}>
      {index === messagesLength - 1 && <div ref={firstMessageRef}></div>}
      {index === messagesLength - (messagesLength - 1) && (
        <div ref={lastMessageRef}></div>
      )}
      <div className="inner-content-sender">
        <p className="sender-text">{message.messageText}</p>
        <span className="sender-time">{message.sendDate}</span>
      </div>
    </div>
  ) : (
    <div className="content-recipient" key={message.messageId || message._id}>
      {index === messagesLength - 1 && <div ref={firstMessageRef}></div>}
      <div className="inner-content-recipient">
        <div className="recipient-name-text">
          <span className="recipient-name">{message.user.login}</span>
          <p className="recipient-text">{message.messageText}</p>
        </div>
        <span className="recipient-time">{message.sendDate}</span>
      </div>
    </div>
  );
};

export default Message;
