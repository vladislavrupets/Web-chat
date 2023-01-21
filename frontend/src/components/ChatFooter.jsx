import React, { useState } from 'react';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('sendMessage', {
        userName: localStorage.getItem('userName'), 
        text: message,
        time: null
      });
    }
    setMessage('');
  };

  return (
    <footer className="chat-footer" >
      <form className='footer-form' onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type message..."
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className="send-btn"><i class="fa-solid fa-location-arrow fa-3x"></i></button>
        </form>
    </footer>
  );
};

export default ChatFooter;