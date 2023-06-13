import { useDispatch, useSelector } from "react-redux"
import { getUserPlaylistsThunk } from "../../store/playlist"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import PlaylistsIndexItem from "../PlaylistIndexItem"
import "./PlaylistIndex.css";
import AuthModal from "../AuthModal"


const PlaylistIndex = () =>  {
    const dispatch = useDispatch()
    const getPlaylists = useSelector(state => state.playlists)
    const playlists = Object.values(getPlaylists)
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getUserPlaylistsThunk())
    },[dispatch])

    if (!user) {
      return <AuthModal />;
    }

    if (!getPlaylists) return null
    return (
        <div className="allPlaylistsContainer">
          {playlists.map((playlist) => (
            <PlaylistsIndexItem key={playlist.id} playlist={playlist}/>
          ))}
          <Link to={"/playlists/new"}>
            <button className="createMoreButton">
            <img className="plus-sign new" src="/plus.png" />
            </button>
          </Link>
        </div>

      );
}


export default PlaylistIndex
