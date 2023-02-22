import React, { useState } from "react";
import Modal from "../../../modal/Modal";

import "./modalAddChatroom.css";

const ModalAddChatroom = ({ isActive, setActive, setRooms, socket }) => {
  const [chatroomName, setChatroomName] = useState("");

  const handleCreateChatroom = () => {
    socket.emit("createChatroom", chatroomName);
    console.log(chatroomName);
    socket.off("getNewChatroom").on("getNewChatroom", (newChatroom) => {
      setRooms((prev) => {
        return [...prev, newChatroom];
      });
    });
    setChatroomName("");
    setActive(false);
  };
  return (
    <Modal isActive={isActive} setActive={setActive}>
      <h1>Add new chatroom: {chatroomName}</h1>
      <input
        type="text"
        value={chatroomName}
        onChange={(e) => setChatroomName(e.target.value)}
      />
      <button onClick={handleCreateChatroom}>Create</button>
    </Modal>
  );
};

export default ModalAddChatroom;
