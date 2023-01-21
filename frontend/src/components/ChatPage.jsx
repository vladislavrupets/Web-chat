import React, { useEffect, useState, useRef } from 'react';

import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  //message display
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages([...messages, ...data]);
    });
  }, [socket, messages]);

  //autoscroll
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className='main-container'>
      <ChatHeader/>
        <ChatBody messages={messages} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} />
      </div>
  );
};

export default ChatPage;