import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('UserLogin');
    navigate('/login');
    };
    
    return (
    <>
      <div className="chat-header">
        <button className='leave-chat-button' onClick={handleLeaveChat}>
          <i class="fa-solid fa-chevron-left fa-2x"></i>
        </button>
      </div>
    </>
  );
};

export default ChatHeader;