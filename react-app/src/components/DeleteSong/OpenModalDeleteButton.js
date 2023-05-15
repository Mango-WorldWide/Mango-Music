import { useModal } from "../../context/Modal";

const OpenModalDeleteButton = ({ modalComponent, itemText, onItemClick, onModalClose }) => {
  const { setModalContent, setOnModalClose } = useModal();
  const onClick = () => {
    // if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };
  return (
    <>
      {itemText === "Delete" ? (
        <p className="no-button" onClick={onClick}>
          {itemText}
        </p>
      ) : (
        <p className="no-button" onClick={onClick}>
          {itemText}
        </p>
      )}
    </>
  );
};
export default OpenModalDeleteButton;
