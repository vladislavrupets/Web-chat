import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

import "./chatPage.css";
import ChatBody from "./chat-body/ChatBody";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatHeader from "./chat-header/ChatHeader";
import ChatSidebar from "./chat-sidebar/ChatSidebar";

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [chatrooms, setRooms] = useState([]);

  const [messagesStorage, setMessagesStorage] = useState("");
  const [Message, setMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessages, setlastMessages] = useState(null);
  const [userId, setUserId] = useState("");

  const lastMessageRef = useRef(null);

  const handleClickChatroom = (chatroomId, roomName) => {
    console.log(chatrooms);
    console.log(chatroomId);
    if (chatroomId !== ChatroomId) {
      setChatroomId(chatroomId);
      setRoomName(roomName);
    }
  };

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
      socket.off("getLastMessages").on("getLastMessages", (messages) => {
        let temp = {};
        messages.map((message) => {
          if (message) {
            temp[message.chatroomId] = message;
          }
        });
        setlastMessages({ ...temp });
      });
      //getRooms();
      socket.off("getAllChatrooms").on("getAllChatrooms", (chatroomsList) => {
        console.log(chatroomsList);
        setRooms(chatroomsList);
      });
    }
  }, [socket]);

  //get messages on enter chatroom

  const fetchDataOnEnterRoom = () => {
    if (!messagesStorage[ChatroomId]) {
      console.log(ChatroomId);
      socket?.emit("enterChatroom", {
        chatroomId: ChatroomId,
      });
      socket
        ?.off("getChatroomMessages")
        .on("getChatroomMessages", (messages) => {
          if (!messages) {
            console.log(messages);
          }
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
    console.log(1);
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
  }, [socket, lastMessages, messagesStorage]);

  //autoscroll (need to fix)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(lastMessageRef);
  }, [Message]);

  return (
    <div className="chat-container" id="111">
      <ChatSidebar
        className="sidebar"
        handleClickChatroom={handleClickChatroom}
        chatrooms={chatrooms}
        setRooms={setRooms}
        lastMessages={lastMessages}
        userId={userId}
        socket={socket}
      />
      {ChatroomId && (
        <div className="inner-chat-container">
          <ChatHeader roomName={RoomName} />
          <ChatBody
            messages={messagesStorage[ChatroomId]}
            userId={userId}
            fetchMoreData={fetchMoreData}
            isLoading={isLoading}
            lastMessageRef={lastMessageRef}
          />
          <ChatFooter socket={socket} chatroomId={ChatroomId} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
