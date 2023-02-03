import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    axios.post('http://localhost:8000/user/register', {
      login,
      password,
    }).then(res => {
      console.log(res.data);
      navigate('/login');
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
        <button className="register-btn">Register</button>
    </form>
  );
};

export default RegisterPage;