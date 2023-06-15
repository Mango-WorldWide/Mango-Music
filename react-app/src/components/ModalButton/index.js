import React from 'react';
import { useModal } from '../../context/Modal';
import "./ModalButton.css"

function ModalButton({
  modalComponent, // component to render inside the modal
  modalContent, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className={className} onClick={onClick}>{modalContent}</div>
  );
}

export default ModalButton;
