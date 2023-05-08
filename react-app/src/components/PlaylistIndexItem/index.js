import { useDispatch, useSelector } from "react-redux"
// import { loadPlaylistsThunk } from "../../store/playlist"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const PlaylistsIndexItem = ({playlist}) =>  {
    console.log('playlist index item',playlist.cover)
    return (
        <div>
            <Link to={`/playlists/${playlist.id}`}>
                <img src={playlist.cover} alt={playlist.title}/>
            </Link>
        </div>
    )

}

export default PlaylistsIndexItem