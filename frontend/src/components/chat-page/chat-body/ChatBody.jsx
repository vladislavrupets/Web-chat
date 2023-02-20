import React, { useEffect, useLayoutEffect, useState, useRef } from "react";

import "./chatBody.css";
import Message from "./chat-messages/Message";

const ChatBody = ({
  messages,
  userId,
  fetchMoreData,
  isLoading,
  lastMessageRef,
}) => {
  const firstMessageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          fetchMoreData();
        }
      },
      {
        root: null,
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0,
      }
    );

    if (firstMessageRef.current) {
      observer.observe(firstMessageRef.current);
    }

    return () => {
      if (firstMessageRef.current) {
        observer.unobserve(firstMessageRef.current);
      }
    };
  }, [messages, isLoading, fetchMoreData]);

  return (
    <>
      {messages && (
        <div className="messages-container">
          {messages?.map((message, index) => (
            <Message
              index={index}
              messagesLength={messages.length}
              userId={userId}
              message={message}
              lastMessageRef={lastMessageRef}
              firstMessageRef={firstMessageRef}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ChatBody;
