import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPlaylistsThunk } from "../../store/playlist";
import { useModal } from "../../context/Modal";
import ListItem from "./ListItem";
import "./AddPlaylistSong.css";

const AddPlaylistSongModal = ({ song }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const getPlaylists = useSelector((state) => state.playlists);
  const userPlaylists = Object.values(getPlaylists)


  useEffect(() => {
    dispatch(getUserPlaylistsThunk());
  }, [dispatch]);
  if(!userPlaylists.length) return null
  return (
    <div className="playlist-modal modal">
      <img className="x-mark" alt="close" onClick={closeModal} src="/mark.png" />
      <h1 className="header">Add to Playlist</h1>
      <h3 className="sub-header">{song.title}</h3>
      <hr className="header-divider" />
      <div className="playlist-container">
        {userPlaylists.map((playlist) => (
          <div>
            <ListItem playlist={playlist} songId={song.id} error={setError}/>
          </div>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};



export default AddPlaylistSongModal;
