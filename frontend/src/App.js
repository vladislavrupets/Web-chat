import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import io from 'socket.io-client';

import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ChatPage from './components/сhat/chatPage/ChatPage';
import IndexPage from './components/IndexPage';

function App() {
 //socket connection
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem('Token');
    if (token && !socket) {
      const newSocket = io('http://localhost:8000/users',{
        query: {
          token: localStorage.getItem('Token'),
        },
        transports : ['websocket']
      });
   
      newSocket.on('connect', () => { 
        console.log('Socket connected.')
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log('Socket disconnected.')
      });

      

      setSocket(newSocket);
    }
  }

  useEffect(() => {
    setupSocket();
  }, []);    

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<IndexPage />} exact/>
          <Route path="/register" element={<RegisterPage />} exact/>
          <Route path="/login" element={<LoginPage setupSocket={setupSocket} />} exact />
          <Route path="/chat" element={<ChatPage socket={socket} />} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;