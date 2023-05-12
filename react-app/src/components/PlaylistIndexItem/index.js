import { useDispatch, useSelector } from "react-redux"
// import { loadPlaylistsThunk } from "../../store/playlist"
import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"

const PlaylistsIndexItem = ({ playlist }) => {
    const history = useHistory()
  const handleClick = () => {
    history.push(`/playlists/${playlist.id}`)
  };

  return (
    <div 
    className="playlistItem"
    // data-tooltip="..."
    onClick={() => handleClick(playlist.id)}>
      <img src={playlist.cover} alt={playlist.title} />
      <p className="playlistTitle">{playlist.title}</p>
    </div>
  );
};

export default PlaylistsIndexItem
