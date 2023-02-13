import React, { lazy, Suspense } from "react";

import "./chatBody.css";
const Message = lazy(() => import("./chat-messages/Message"));

const ChatBody = ({ messages, userId }) => {
  return (
    <div className="message-container">
      {messages?.map((message) => (
        <Suspense fallback={"loading"}>
          <Message userId={userId} message={message} />
        </Suspense>
      ))}
    </div>
  );
};

export default ChatBody;
