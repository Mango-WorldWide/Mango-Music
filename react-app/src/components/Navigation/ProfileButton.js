import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from 'react-router-dom';
import "./Navigation.css"

function ProfileButton() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowMenu(false)
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className={!user ? "user-icon-button ": "user-icon-button small"}>
        {user ? (
          <i
            className="fas fa-user-circle"
            onClick={openMenu}
          />
        )
          : (
            <>
              <i
                className="fas fa-user"
                onClick={openMenu}
              />
              <span style={{ color: "rgba(238, 238, 238, 1)" }}>Sign In</span>
            </>
          )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="dropdown-item">Welcome Back, {user.username}!</li>
            <li className="dropdown-item">{user.email}</li>
            <li className="dropdown-item">
              <button className='dropdown-logout' onClick={handleLogout}>Log Out 😞 </button>
            </li>
          </>
        ) : (
          <>

            <OpenModalButton
              className='dropdown-login'
              buttonText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              className='dropdown-signup'
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
