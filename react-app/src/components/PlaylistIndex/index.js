import { useDispatch, useSelector } from "react-redux"
import { getPlaylistsThunk } from "../../store/playlist"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import PlaylistsIndexItem from "../PlaylistIndexItem"

const PlaylistIndex = () =>  {
    const dispatch = useDispatch()
    const getPlaylists = useSelector(state => state.playlists)
    const playlists = Object.values(getPlaylists)
    console.log("playlists 👉👉👉", playlists)

    useEffect(() => {
        dispatch(getPlaylistsThunk())
    },[dispatch])

    if (!getPlaylists) return null
    return (
        <>
        <Link to={"/playlists/new"}>
            <button>
                Create Playlist
            </button>
        </Link>
        <section className="albumIndexItems">
            {playlists.map((playlist) => (
                <PlaylistsIndexItem
                    playlist={playlist}
                />
            ))}
        </section>
        </>
    )
}


export default PlaylistIndex