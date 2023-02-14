import React, { useState, lazy, Suspense } from "react";

import "./chatBody.css";
const Message = lazy(() => import("./chat-messages/Message"));

const ChatBody = ({ messages, userId, handleScroll, lastMessageRef }) => {
  return (
    <div className="message-container" onScroll={handleScroll}>
      {messages?.map((message) => (
        <Suspense fallback={"loading"}>
          <Message
            userId={userId}
            message={message}
            lastMessageRef={lastMessageRef}
          />
        </Suspense>
      ))}
    </div>
  );
};

export default ChatBody;
