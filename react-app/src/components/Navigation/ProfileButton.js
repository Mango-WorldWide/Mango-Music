import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import ModalButton from "../ModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton() {
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

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
    setShowMenu(false);
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className={!user ? "user-icon-button " : "user-icon-button small"}>
        {user ? (
          <i className="fas fa-user-circle" onClick={openMenu} />
        ) : (
          <>
            <i className="fas fa-user" onClick={openMenu} />
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
              <button className="dropdown-logout" onClick={handleLogout}>
                Log Out 😞{" "}
              </button>
            </li>
          </>
        ) : (
          <div className="dropdown-buttons">
            <ModalButton
              modalContent={<button className="dropdown-login" onClick={e=>setShowMenu(false)}>Log In</button>}
              modalComponent={<LoginFormModal />}
            />

            <ModalButton
              modalContent={<button className="dropdown-signup" onClick={e=>setShowMenu(false)}>Sign Up</button>}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
