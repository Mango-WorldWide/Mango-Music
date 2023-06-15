
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { addSongPlaylist } from "../../store/playlist";
import "./AddPlaylistSong.css";

const ListItem = ({ playlist, songId, error }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await dispatch(addSongPlaylist(songId, playlist.id));
    if (res && res.errors) {
      error(res.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="list-item" onClick={(e) => handleClick(e, playlist.id)}>
        <p className="list-title">{playlist.title}</p>
      </div>
      <hr className="item-divider" />
    </>
  );
};

export default ListItem;
