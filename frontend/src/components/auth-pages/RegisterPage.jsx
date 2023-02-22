import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./authPages.css";

const LOGIN_REGEX = /^[a-zA-Z0-9_-]{3,15}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const RegisterPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [inputRules, setInputRules] = useState({
    login: "Must be from 3 to 15 characters",
    password:
      "Must be 8 characters long. and contain at least one lowercase and uppercase letter and a number",
    confirmPass: "Passwords must match",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValidLogin = () => {
    return LOGIN_REGEX.test(login);
  };

  const isValidPass = () => {
    return PASSWORD_REGEX.test(password);
  };

  const isValidConfirmPass = () => {
    return confirmPass !== "" && confirmPass === password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/register", {
        login,
        password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data);
        setLogin("");
      });
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2 className="auth-header">Registration</h2>
      <span className="auth-error">{error}</span>
      <input
        className={isValidLogin() ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <span
        className={isValidLogin() ? "auth-input-rule valid" : "auth-input-rule"}
      >
        {inputRules.login}
      </span>
      <input
        className={isValidPass() ? "auth-input valid" : "auth-input"}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className={isValidPass() ? "auth-input-rule valid" : "auth-input-rule"}
      >
        {inputRules.password}
      </span>
      <input
        className={isValidConfirmPass() ? "auth-input valid" : "auth-input"}
        type="password"
        placeholder="Confirm password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <span
        className={
          isValidConfirmPass() ? "auth-input-rule valid" : "auth-input-rule"
        }
      >
        {inputRules.confirmPass}
      </span>
      <button
        disabled={!(isValidLogin() && isValidPass() && isValidConfirmPass())}
        className={
          isValidLogin() && isValidPass() && isValidConfirmPass()
            ? "submit-btn active"
            : "submit-btn"
        }
      >
        Register
      </button>
      <span className="auth-link" onClick={() => navigate("/login")}>
        Already have an account?
      </span>
    </form>
  );
};

export default RegisterPage;
