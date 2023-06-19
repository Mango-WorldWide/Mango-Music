import React, {useState, useEffect, useRef} from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ModalButton from '../ModalButton';
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
      <ModalButton
              modalContent={<button className='dropdown-login'>Log In</button>}
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
      <ModalButton
              modalContent={<button className='dropdown-signup'>Sign Up</button>}
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
    </div>
  );
};

export default AuthModal;
