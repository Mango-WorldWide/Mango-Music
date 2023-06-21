import React, { useState } from "react";
import { login } from "../../store/session";
import { loadLikesThunk } from "../../store/like";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    await dispatch(loadLikesThunk());
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemo = async (isArtist) => {
    if (isArtist) {
      setEmail("artist@aa.io");
    } else {
      setEmail("demo@aa.io");
    }
    setPassword("password");
    const data = await dispatch(login(email, password));
    await dispatch(loadLikesThunk());
    if (data) {
      console.log("data 👉", data)
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form">
      <h1 className="login-form-header">Welcome Back To 🥭 Music</h1>
      <form className="login-form-form" onSubmit={handleSubmit}>
      <p className="errors">{errors.login}</p>
        <label className="login-form-email">
          Email
          <input
            className="login-form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errors">{errors.email}</p>
        </label>
        <label className="login-form-password">
          Password
          <input
            className="login-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errors">{errors.password}</p>
        </label>
        <button className="login-form-button" type="submit">
          Log In
        </button>
        <button className="login-form-button" type="submit" onClick={() => loginDemo(false)}>
          Login as demoUser
        </button>
        <button className="login-form-button" type="submit" onClick={() => loginDemo(true)}>
          Login as demoArtist
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
