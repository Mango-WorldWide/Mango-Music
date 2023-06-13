import React, {useState, useEffect, useRef} from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
// import './AuthModal.css';

const AuthModal = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


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


  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  return (
    <div className="auth-modal">
      <h2>Please Login or Signup to Continue</h2>
      <OpenModalButton
              className='dropdown-login'
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
      <OpenModalButton
              className='dropdown-signup'
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
    </div>
  );
};

export default AuthModal;
