import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./authPages.css";

const LoginPage = ({ setupSocket }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login", {
        login,
        password,
      })
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        navigate("/chat");
        setupSocket();
      })
      .catch((err) => {
        setError(err.response.data);
        setLogin("");
        setPassword("");
      });
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2 className="auth-header">Login</h2>
      <span className="auth-error">{error}</span>
      <input
        className={login ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        className={password ? "auth-input valid" : "auth-input"}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={!(login && password)}
        className={login && password ? "submit-btn active" : "submit-btn"}
      >
        Log in
      </button>
      <span className="auth-link" onClick={() => navigate("/register")}>
        Don't have an account?
      </span>
    </form>
  );
};

export default LoginPage;
