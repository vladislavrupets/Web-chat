import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({setupSocket}) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    axios.post('http://26.64.252.244:8000/user/login', {
      login,
      password,
    }).then(res => {
      localStorage.setItem('Token', res.data.token);
      localStorage.setItem('UserLogin', login);
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
    <form className="register-container" onSubmit={handleSubmit}>
      <h2 className="register-header">Chat</h2>
      <input
        className='login-input'
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
        className='password-input'
        type='password'
        placeholder='Password'
        minLength={1}
        maxLength={20}
        required 
        // value={userName}
        ref={passwordRef}
        // onChange={(e) => setUserName(e.target.value)}
      />
        <button className="register-btn">Login</button>
    </form>
  );
};

export default LoginPage;