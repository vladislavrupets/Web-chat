import React, { useEffect, useState, useRef} from 'react';


import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatroomsSidebar from './ChatroomsSidebar';

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState('');
  const [RoomName, setRoomName] = useState('')
  
  const handleClickChatroom = (chatroomId, roomName) => {
    if (chatroomId !== ChatroomId) {
      setChatroomId(chatroomId);
      setRoomName(roomName);
    }
  }

  //receive messages on enter 
  const [messagesStorage, setMessagesStorage] = useState({});

  useEffect(() => {
    if (socket && ChatroomId) {
      if (!messagesStorage.hasOwnProperty(ChatroomId)) {
        socket.emit('enter', {
        chatroomId: ChatroomId,
      });
        socket.on('receiveMessagesOnEnter', (messages) => {
          console.log(messages);
          setMessagesStorage({ ...messagesStorage, [ChatroomId]: messages })         
        });
      }
    }
  }, [socket, ChatroomId]);

  //recieve message
  const [userId, setUserId] = useState('');
  const [Message, setMessage] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (socket && token && ChatroomId && !messagesStorage[ChatroomId].includes(Message)) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
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

  //autoscroll (need to fix)
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Message, userId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  },[ChatroomId])
 

  return (
    <div className='chat-container'>
      <ChatroomsSidebar className='sidebar' socket={socket} handleClickChatroom={handleClickChatroom } />
        <div className='inner-chat-container'>
        <ChatHeader roomName={RoomName} />
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