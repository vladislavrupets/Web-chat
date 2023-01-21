import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem('userName', userName);
      socket.emit('enter');
    navigate('/chat');
    };
    
  return (
    <form className="authorization-container" onSubmit={handleSubmit}>
      <h2 className="home-header">Chat</h2>
      <input
        className='name-input'
        type="text"
        placeholder='Nickname'
        minLength={1}
        maxLength={20}
        required 
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
        <button className="enter-btn">Enter</button>
    </form>
  );
};

export default Home;