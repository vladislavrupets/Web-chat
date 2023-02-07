import React, { useState, useEffect, useContext} from 'react';

const ChatroomsSidebar = (props) => {

  


  return (
    <aside className="chatrooms-sidebar">
      Chatrooms:
      {props.chatrooms.map((chatroom) => (
        <div className="chatroom-container-content" key={chatroom._id}>
          <span className='chatroom-name'>{chatroom.roomName}</span>
          <button
            className="chatroom-btn"
            onClick={()=> props.handleClickChatroom(chatroom._id, chatroom.roomName)}
            >
            </button>
        </div>
      ))}
    </aside>
  );
};

export default ChatroomsSidebar;
