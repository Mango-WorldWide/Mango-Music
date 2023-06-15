import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import ListItem from "./ListItem";
import "./AddPlaylistSong.css";

const AddPlaylistSongModal = ({ song }) => {
  const { closeModal } = useModal();
  const [error, setError] = useState(null);
  const userPlaylists = useSelector((state) => state.session.user.playlists);
  console.log("userPlaylists  👉", userPlaylists )


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
