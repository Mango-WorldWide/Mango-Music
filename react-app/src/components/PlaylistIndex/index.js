import { useDispatch, useSelector } from "react-redux"
import { getPlaylistsThunk } from "../../store/playlist"
import { useEffect } from "react"
import PlaylistsIndexItem from "../PlaylistIndexItem"

const PlaylistIndex = () =>  {
    const dispatch = useDispatch()
    const getPlaylists = useSelector(state => state.playlists)
    console.log("getPlaylists 👉", getPlaylists)
    const playlists = Object.values(getPlaylists)
    console.log('these are all the playlists', playlists)
    useEffect(() => {
        console.log('inside useeffect')
        dispatch(getPlaylistsThunk())
    },[dispatch])

    if (!getPlaylists) return null
    return (
        <>
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