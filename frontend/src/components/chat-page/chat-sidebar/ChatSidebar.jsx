import React from 'react';
import {useNavigate} from 'react-router-dom'

import './chatSidebar.css'

const ChatroomsSidebar = (props) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('Token');
    navigate('/login');
  };
  
  //need to fix
  if (props.lastMessages) {
    return (
      <aside className="chat-sidebar">
        <div className='logout-btn' onClick={handleLeaveChat}>
          Logout
        </div>
        {props.chatrooms.map(chatroom => (
          <div className="chatroom-container-content"
            key={chatroom._id}
            onClick={() => props.handleClickChatroom(chatroom._id, chatroom.roomName)}>
            <span className='chatroom-name'>{chatroom.roomName}</span>
            {props.lastMessages[chatroom._id].userId === props.userId ? (
              <span>You:</span>
            ) : (
              <span>{props.lastMessages[chatroom._id].user.login}</span>
            )}
            <span>{props.lastMessages[chatroom._id].messageText}</span>
          </div>
        ))}
      </aside>
    );
  }
};


export default ChatroomsSidebar;