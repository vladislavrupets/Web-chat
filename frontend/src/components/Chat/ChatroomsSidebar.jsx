import React from 'react';

const ChatroomsSidebar = (props) => {

  


  return (
    <aside className="chatrooms-sidebar">
      <div className='search-chatrooms'>
        Search
      </div>
      {props.chatrooms.map(chatroom => (
        <div className="chatroom-container-content"
          key={chatroom._id}
          onClick={() => props.handleClickChatroom(chatroom._id, chatroom.roomName)}>
          <span className='chatroom-name'>{chatroom.roomName}</span>
          <span>{props.lastMessages[chatroom._id]}</span>
        </div>
      ))}
    </aside>
  );
};

export default ChatroomsSidebar;
