import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSongThunk } from "../../store/song"

const DeleteSongModal = (song, albumId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    console.log(song, 'what is my song in my modal to delete')
    const deleteOnClick = (e) => {
        e.preventDefault()
        console.log('delete on click modal for songs')
        dispatch(deleteSongThunk(song.song.id, albumId)).then(closeModal)
    }

    const cancelOnClick = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="modal">
            <h1>Comfirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={deleteOnClick}>Yes (Delete Song)</button>
            <button className="no-button" onClick={cancelOnClick}>No (Keep Song)</button>
        </div>
    )
}

export default DeleteSongModal
