import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const lastMessageRef = useRef(null);
  const messagesContRef = useRef(null);

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

  const fetchDataOnEnterRoom = () => {
    if (!messagesStorage[ChatroomId]) {
      console.log(socket);
      socket?.emit("enterChatroom", {
        chatroomId: ChatroomId,
      });
      socket
        ?.off("getChatroomMessages")
        .on("getChatroomMessages", (messages) => {
          setMessagesStorage({ ...messagesStorage, [ChatroomId]: messages });
        });
    }
  };

  useEffect(() => {
    fetchDataOnEnterRoom();
  }, [ChatroomId]);

  //messages lazy loading

  const fetchMoreData = () => {
    setIsLoading(true);
    socket.emit("enterChatroom", {
      chatroomId: ChatroomId,
      messagesCount: messagesStorage[ChatroomId]?.length,
    });
    socket.off("getChatroomMessages").on("getChatroomMessages", (messages) => {
      let temp = {};
      Object.assign(temp, messagesStorage);
      temp[ChatroomId]?.push(...messages);
      setMessagesStorage({ ...temp });
    });
    setIsLoading(false);
  };

  //recieve message

  useEffect(() => {
    if (socket) {
      const token = localStorage.getItem("Token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);

      socket.off("receiveMessage").on("receiveMessage", (message) => {
        setlastMessages({ ...lastMessages, [message.chatroomId]: message });
        if (ChatroomId === message.chatroomId) {
          let temp = {};
          Object.assign(temp, messagesStorage);
          temp[ChatroomId].unshift(message);
          setMessagesStorage({ ...temp });
          setMessage(message);
        }
      });
    }
  }, [socket, messagesStorage, lastMessages]);

  //autoscroll (need to fix)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(lastMessageRef);
  }, [Message]);

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
            userId={userId}
            fetchMoreData={fetchMoreData}
            isLoading={isLoading}
            lastMessageRef={lastMessageRef}
            messagesContRef={messagesContRef}
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
