import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';

import ChatBody from './chat-body/ChatBody';
import ChatFooter from './chat-footer/ChatFooter';
import ChatHeader from './chat-header/ChatHeader';
import ChatSidebar from './chat-sidebar/ChatSidebar';
import './chatPage.css'

const ChatPage = ({ socket }) => {
  const [ChatroomId, setChatroomId] = useState('');
  const [RoomName, setRoomName] = useState('')

  const handleClickChatroom = (chatroomId, roomName) => {
    if (chatroomId !== ChatroomId) {
      setChatroomId(chatroomId);
      setRoomName(roomName);
    }
  }

  //get rooms list and last messages
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

  const [lastMessages, setlastMessages] = useState()

  useEffect(() => {
    if (socket) {
      socket.emit('joinRooms');
      socket.on('getLastMessages', (messages) => {
        let temp = {};
        messages.map(message => {
          temp[message.chatroomId] = message
          console.log(temp)
        });
        setlastMessages({...temp});
      });
      getRooms();
    }
  }, [socket]);

  //get messages on enter chatroom
  const [messagesStorage, setMessagesStorage] = useState('');

  useEffect(() => {
    if (socket && ChatroomId) {
      if (!messagesStorage.hasOwnProperty(ChatroomId)) {
        socket.emit('enterChatroom', {
        chatroomId: ChatroomId,
      });
        socket.on('getChatroomMessages', (messages) => {
          setMessagesStorage({ ...messagesStorage, [ChatroomId]: messages });    
        });
      }
    }
  }, [socket, ChatroomId]);

  //recieve message
  const [userId, setUserId] = useState('');
  const [Message, setMessage] = useState({});

  useEffect(() => {
    if (socket) {
      const token = localStorage.getItem("Token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
      socket.on('receiveMessage', (message) => {
        setlastMessages({...lastMessages, [message.chatroomId]: message});
        if (ChatroomId === message.chatroomId && !messagesStorage[ChatroomId].includes(Message)) {
          let temp = {};
          Object.assign(temp, messagesStorage);
          temp[ChatroomId].push(message);
          setMessagesStorage({ ...temp });
          setMessage(message);
        }
      });
    }  
  }, [socket, messagesStorage, lastMessages]);

  //autoscroll (need to fix)
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Message, userId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  },[handleClickChatroom])
 

  return (
    <div className='chat-container'>
      <ChatSidebar className='sidebar' socket={socket} handleClickChatroom={handleClickChatroom}
        chatrooms={chatrooms} lastMessages={lastMessages} userId={userId}/>
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