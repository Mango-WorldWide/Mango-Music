import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react"
import { addSongPlaylist } from "../../store/playlist"


const AddSongModal = ({song}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [playlist, setPlaylist] = useState(0)
    const [err, setErr] = useState(null)
    const userPlaylists = useSelector((state)=>state.session.user.playlists)
    const payload = {}
    const handleSubmit = (e) =>{
        e.preventDefault()
        payload.playlist_id = playlist
        payload.song_id = song.id
        if (playlist > 0){
            dispatch(addSongPlaylist(payload)).then(closeModal)
        } else {
            setErr('Please Select a Playlist')
        }
    }

    const cancelOnClick = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {err && (
                    <p>{err}</p>
                )}
                <select name='playlist' onChange={(e) => setPlaylist(e.target.value)} value={playlist}>
                    <option value="">
                        Select a Playlist...
                    </option>
                    {userPlaylists.map((playlistList) => (
                        <option value={playlistList.id} key={playlistList.id}>{playlistList.title}</option>
                    ))}
                </select>
                <button className="orangeButton songSubmit" type="submit">Submit</button>
                <button className="no-button" onClick={cancelOnClick}>Nevermind</button>
            </form>
        </div>
    )
}

export default AddSongModal
