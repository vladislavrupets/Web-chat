import React, { useState } from "react";
import Modal from "../../../modal/Modal";

import "./modalAddChatroom.css";

const ModalAddChatroom = ({ isActive, setActive }) => {
  const [chatroomName, setChatroomName] = useState("");

  const handleCreateChatroom = () => {};
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
