import React, { useState } from 'react';

const ChatFooter = (props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() && props.socket) {
      props.socket.emit('sendMessage', { 
        chatroomId: props.chatroomId,
        message,
      });
      console.log(message);
      console.log(props.chatroomId);
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