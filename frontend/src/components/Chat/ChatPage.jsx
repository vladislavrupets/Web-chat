import React, { useEffect, useState, useRef} from 'react';


import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatroomsSidebar from './ChatroomsSidebar';

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState();
  const [userId, setUserId] = useState('');
  const [messagesStorage, setMessagesStorage] = useState({});

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
          setMessagesStorage({ ...messagesStorage, [ChatroomId]: messages })
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
  
    if (socket && ChatroomId && messagesStorage.hasOwnProperty(ChatroomId)) {
      socket.on('receiveMessage', (message) => {
        if (ChatroomId === message.chatroomId) {
          let temp = {};
          Object.assign(temp, messagesStorage);
          temp[ChatroomId].push(message);
          setMessagesStorage({ ...temp });
          console.log(messagesStorage);
        }
      });
    }  
  }, [socket, messagesStorage]);


  // //autoscroll
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesStorage, userId]);
 
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, [ChatroomId]);

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