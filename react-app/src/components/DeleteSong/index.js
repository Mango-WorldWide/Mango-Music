import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deletePlaylistSongThunk, deleteSongThunk } from "../../store/song"

const DeleteSongModal = ({song, categoryId, category}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    console.log(song, 'what is my song in my modal to delete')
    const deleteOnClick = (e) => {
        e.preventDefault()
        if (category==='playlist'){
            console.log('delete on click modal for songs playlist song', song)
            dispatch(deletePlaylistSongThunk(song, categoryId)).then(closeModal)
        }
        if (category ==='album') {
            console.log('delete song for album')
            dispatch(deleteSongThunk(song.id, categoryId)).then(closeModal)
        }
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
