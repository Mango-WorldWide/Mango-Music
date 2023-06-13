import { useModal } from '../../context/Modal'

const OpenModalAddButton = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const  { setModalContent } = useModal()
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <p className="no-button" onClick={onClick}>{itemText}</p>
    )
}
 export default OpenModalAddButton
