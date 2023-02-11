import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './authorizationPages.css'

const LoginPage = ({setupSocket}) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    axios.post('http://localhost:8000/user/login', {
      login,
      password,
    }).then(res => {
      localStorage.setItem('Token', res.data.token);
      navigate('/chat');
      setupSocket();
    }).catch(err => {
      console.log(err); 
    });
  }

  // const navigate = useNavigate();
  // const [userName, setUserName] = useState('');

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     localStorage.setItem('userName', userName);
  //     socket.emit('enter');
  //   navigate('/chat');
  //   };
    
  return (
    <form className="authorization-container" onSubmit={handleSubmit}>
      <h2 className="authorization-header">Login</h2>
      <input
        className='user-input'
        type="text"
        placeholder='Login'
        minLength={1}
        maxLength={20}
        required 
        // value={userName}
        ref={loginRef}
        // onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className='user-input'
        type='password'
        placeholder='Password'
        minLength={1}
        maxLength={20}
        required 
        // value={userName}
        ref={passwordRef}
        // onChange={(e) => setUserName(e.target.value)}
      />
        <button className="login-btn">Log in</button>
    </form>
  );
};

export default LoginPage;