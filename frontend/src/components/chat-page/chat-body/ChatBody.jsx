import React, { useEffect, lazy, Suspense } from "react";

import "./chatBody.css";
const Message = lazy(() => import("./chat-messages/Message"));

const ChatBody = ({ messages, userId, lastMessageRef, scrollHandler }) => {
  // useEffect(() => {
  //   document.addEventListener("scroll", scrollHandler, true);
  //   return () => {
  //     document.removeEventListener("scroll", scrollHandler);
  //   };
  // }, []);

  return (
    <div className="message-container" onScroll={scrollHandler}>
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
