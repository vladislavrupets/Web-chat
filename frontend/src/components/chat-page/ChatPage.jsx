import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

import ChatBody from "./chat-body/ChatBody";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatHeader from "./chat-header/ChatHeader";
import ChatSidebar from "./chat-sidebar/ChatSidebar";
import "./chatPage.css";

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [chatrooms, setRooms] = useState([]);

  const [messagesStorage, setMessagesStorage] = useState("");
  const [Message, setMessage] = useState({});
  const [lastMessages, setlastMessages] = useState();
  const [userId, setUserId] = useState("");

  const lastMessageRef = useRef(null);

  const handleClickChatroom = useCallback(
    (chatroomId, roomName) => {
      if (chatroomId !== ChatroomId) {
        setChatroomId(chatroomId);
        setRoomName(roomName);
      }
    },
    [ChatroomId]
  );

  //get rooms list and last messages

  const getRooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        setTimeout(getRooms, 3000);
        console.log(err);
      });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joinRooms");
      socket.on("getLastMessages", (messages) => {
        let temp = {};
        messages.map((message) => {
          if (message) {
            temp[message.chatroomId] = message;
          }
        });
        setlastMessages({ ...temp });
      });
      getRooms();
    }
  }, [socket]);

  //get messages on enter chatroom
  const [msgStorageLength, setmsgStorageLength] = useState(null);

  const scrollHandler = (e) => {
    // console.log(
    //   e.currentTarget.scrollHeight -
    //     (e.currentTarget.scrollTop + window.innerHeight)
    // );
    // if (
    //   e.currentTarget.scrollHeight -
    //     (e.currentTarget.scrollTop + window.innerHeight) >
    //   400
    // ) {
    //   fetchData(messagesStorage[ChatroomId]?.length);
    // }

    if (e.currentTarget.scrollTop === 0) {
      fetchData(messagesStorage[ChatroomId]?.length);
      console.log(ChatroomId);
    }
  };

  const fetchData = (messagesCount) => {
    socket.emit("enterChatroom", {
      chatroomId: ChatroomId,
      messagesCount,
    });
    socket.on("getChatroomMessages", (messages, callback) => {
      let temp = {};
      Object.assign(temp, messagesStorage);
      temp[ChatroomId].unshift(...messages);
      setMessagesStorage({ ...temp });
      callback({ status: "bebra" });
    });
  };

  useEffect(() => {
    socket?.emit("enterChatroom", {
      chatroomId: ChatroomId,
    });
    socket?.on("getChatroomMessages", (messages, callback) => {
      setMessagesStorage({ [ChatroomId]: messages });
      callback({ status: "sanya" });
    });
    setTimeout(() => {
      socket?.off("getChatroomMessages");
    }, 300);
  }, [ChatroomId]);
  // useEffect(() => {
  //   if (socket && ChatroomId && isFetching) {
  //     fetchData(msgStorageLength);
  //     setmsgStorageLength((prev) => prev + 30);
  //     setIsFetching(false);
  //   }
  // }, [socket, ChatroomId, isFetching]);

  // recieve message

  useEffect(() => {
    if (socket) {
      const token = localStorage.getItem("Token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);

      socket.on("receiveMessage", (message) => {
        setlastMessages({ ...lastMessages, [message.chatroomId]: message });
        if (
          ChatroomId === message.chatroomId
          // !messagesStorage[ChatroomId].includes(Message)
        ) {
          let temp = {};
          Object.assign(temp, messagesStorage);
          temp[ChatroomId].push(message);
          setMessagesStorage({ ...temp });
          setMessage(message);
        }
      });
      socket.off("receiveMessage", "receiveMessage");
    }
  }, [socket, messagesStorage, lastMessages]);

  //autoscroll (need to fix)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ChatroomId, messagesStorage]);

  // useEffect(() => {
  //   lastMessageRef.current?.scrollIntoView();
  // }, [handleClickChatroom]);

  return (
    <div className="chat-container" id="111">
      <ChatSidebar
        className="sidebar"
        socket={socket}
        handleClickChatroom={handleClickChatroom}
        chatrooms={chatrooms}
        lastMessages={lastMessages}
        userId={userId}
      />
      {ChatroomId ? (
        <div className="inner-chat-container">
          <ChatHeader roomName={RoomName} />
          <ChatBody
            messages={messagesStorage[ChatroomId]}
            lastMessageRef={lastMessageRef}
            userId={userId}
            scrollHandler={scrollHandler}
          />
          <ChatFooter socket={socket} chatroomId={ChatroomId} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatPage;
