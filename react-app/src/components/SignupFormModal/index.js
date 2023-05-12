import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
//   const [artistId, setArtistId] = useState([]);
  const [newArtistName, setNewArtistName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [artist, setArtist] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleArtistCheck = (e) => {
    setArtist(e.target.checked);
    setNewArtistName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
	let newErrors = [];
    const emailRegEx = /\S+@\S+\.\S+/;
    if (!emailRegEx.test(email)) {
        newErrors.push('Please provide a valid email.');
    }
    if (password !== confirmPassword) {
        newErrors.push("Confirm Password field must be the same as the Password field");
    }
    if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
    }
    let artistName;
    if (artist && newArtistName) {
        artistName = newArtistName;
    } else {
        artistName = null; // Use the id of 'No Artist'
        // artist = false
    }
    console.log('ARTIST------', artist, 'ARTISTNAME------', newArtistName);
    const data = await dispatch(signUp(username, email, password, fName, lName, artist, artistName));
    if (data) {
        setErrors([...newErrors, ...data]);
    } else {
        closeModal();
    }
};

  return (
    <div className="signup-form">
      <h1 className="signup-form-header">Sign Up With Mango 🥭</h1>
      <form onSubmit={handleSubmit}>
        <ul className="signup-form-errors">
          {errors.map((error, idx) => (
            <li key={idx} className="signup-form-error">{error}</li>
          ))}
        </ul>
        <label className="signup-form-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>
        <label className="signup-form-label">
          UserName
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>
		<label className="signup-form-label">
          Whats Your First Name?
          <input
            type="text"
            value={fName}
            onChange={(e) => setfName(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>
		<label className="signup-form-label">
          And Your Last Name?
          <input
            type="text"
            value={lName}
            onChange={(e) => setlName(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>
		<label className="signup-form-label">
          Are you an Artist {fName}?
          <input
            type="checkbox"
            value={artist}
            onChange={handleArtistCheck}
            className="signup-form-input"
            // required
          />
        </label>
		{artist && (
        <label className="signup-form-label">
          Artist Name
          <input
            type="text"
            value={newArtistName}
            onChange={(e) => setNewArtistName(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>
      )}
        <label className="signup-form-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>
        <label className="signup-form-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-form-input"
            required
          />
        </label>

        <button type="submit" className="signup-form-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
