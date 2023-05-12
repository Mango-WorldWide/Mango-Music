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
        closeModal()
    }
  };

  return (
    <div className="login-form">
      <h1 className="login-form-header">Welcome Back To 🥭 Music</h1>
      <form className='login-form-form' onSubmit={handleSubmit}>
        <ul className="login-form-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-form-email">
          Email
          <input
            className="login-form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-form-password">
          Password
          <input
            className="login-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-form-button' type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
