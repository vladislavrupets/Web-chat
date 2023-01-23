import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socket from './socket';

import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import IndexPage from './components/IndexPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<IndexPage />} exact/>
          <Route path="/register" element={<RegisterPage />} exact/>
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/chat" element={<ChatPage socket={socket} />} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;