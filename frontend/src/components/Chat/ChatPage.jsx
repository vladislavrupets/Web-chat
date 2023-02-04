import React, { useEffect, useState, useRef} from 'react';


import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatroomsSidebar from './ChatroomsSidebar';

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState();
  const [userId, setUserId] = useState('');
  const [messagesStorage, setMessagesStorage] = useState({});
  const [Message, setMessage] = useState({});

  const handleClickChatroom = (chatroomId) => {
    if (chatroomId !== ChatroomId) {
      setChatroomId(chatroomId);
    }
  }



  useEffect(() => {
    if (socket && ChatroomId) {
      if (!messagesStorage.hasOwnProperty(ChatroomId)) {
        socket.emit('enter', {
        chatroomId: ChatroomId,
      });
        socket.on('receiveMessagesOnEnter', (messages) => {
          console.log(messages);
          setMessagesStorage({ ...messagesStorage, [ChatroomId]: messages })
         
          console.log(messagesStorage)
          console.log(Message);
        });
      }
    }
  }, [socket, ChatroomId]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
  
    if (socket && ChatroomId && !messagesStorage[ChatroomId].includes(Message)) {
      socket.on('receiveMessage', (message) => {
        if (ChatroomId === message.chatroomId) {
          let temp = {};
          Object.assign(temp, messagesStorage);
          temp[ChatroomId].push(message);
          setMessagesStorage({ ...temp });
          setMessage(message);
          console.log(messagesStorage[ChatroomId]);
          console.log(message)
        }
      });
    }  
  }, [socket, messagesStorage]);


  // //autoscroll
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Message, userId]);
 

  return (
    <div className='chat-container'>
      <ChatroomsSidebar className='sidebar' socket={socket} handleClickChatroom={handleClickChatroom } />
        <div className='inner-chat-container'>
          <ChatHeader />
          <ChatBody messages={messagesStorage[ChatroomId]} lastMessageRef={lastMessageRef} userId={userId} />
          {ChatroomId ? (
            < ChatFooter socket={socket} chatroomId={ChatroomId} />
          ) : <></>
        }
        </div>
      </div>
  );
};

export default ChatPage;