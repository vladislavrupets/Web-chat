import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Context } from '../../context';


const ChatroomsSidebar = (props) => {

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
    if (props.socket) {
      props.socket.emit('joinRooms');
    }
  }, [props.socket]);


  return (
    <aside className="chatrooms-sidebar">
      Chatrooms:
      {chatrooms.map((chatroom) => (
        <div className="chatroom" key={chatroom._id}>
          <button
            className="chatroom-btn"
            onClick={()=> props.handleClickChatroom(chatroom._id)}
          >
            {chatroom.roomName}
          </button>
        </div>
      ))}
    </aside>
  );
};

export default ChatroomsSidebar;
