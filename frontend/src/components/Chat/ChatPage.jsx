import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';

import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatroomsSidebar from './ChatroomsSidebar';

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState('');
  const [RoomName, setRoomName] = useState('')

  //get rooms list
  const [chatrooms, setRooms] = useState([]);

  const getRooms = () => {
    axios
      .get('http://localhost:8000/chatroom', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('Token'),
        },
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        setTimeout(getRooms, 3000);
        console.log(err);
      });
  };


  useEffect(() => {
    getRooms();
    if (socket) {
      socket.emit('joinRooms');
      socket.emit('enterChatPage');
      socket.on('getLastMessages', (messages) => {
        console.log(messages)
      })
    }
  }, [socket]);

  const handleClickChatroom = (chatroomId, roomName) => {
    if (chatroomId !== ChatroomId) {
      setChatroomId(chatroomId);
      setRoomName(roomName);
    }
  }

  const [messagesStorage, setMessagesStorage] = useState({});
 

  useEffect(() => {
    if (socket && ChatroomId) {
      if (!messagesStorage.hasOwnProperty(ChatroomId)) {
        socket.emit('enterChatroom', {
        chatroomId: ChatroomId,
      });
        socket.on('getChatroomMessages', (messages) => {
          console.log(messages);
          setMessagesStorage({ ...messagesStorage, [ChatroomId]: messages });    
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
          console.log(messagesStorage);
          console.log(message);
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
      <ChatroomsSidebar className='sidebar' socket={socket} handleClickChatroom={handleClickChatroom} chatrooms={chatrooms} />
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