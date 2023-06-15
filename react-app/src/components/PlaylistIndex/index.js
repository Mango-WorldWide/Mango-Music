import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylistsThunk } from "../../store/playlist";
import { useEffect } from "react";
import PlaylistsIndexItem from "../PlaylistIndexItem";
import "./PlaylistIndex.css";
import AuthModal from "../AuthModal";
import ModalButton from "../ModalButton";
import PlaylistForm from "../PlaylistForm";

const PlaylistIndex = () => {
  const dispatch = useDispatch();
  const getPlaylists = useSelector((state) => state.playlists);
  const playlists = Object.values(getPlaylists);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserPlaylistsThunk());
  }, [dispatch]);

  if (!user) {
    return <AuthModal />;
  }

  if (!getPlaylists) return null;
  return (
    <div className="allPlaylistsContainer">
      {playlists.map((playlist) => (
        <PlaylistsIndexItem key={playlist.id} playlist={playlist} />
      ))}
      {/* <button className="createMoreButton">
            <img className="plus-sign new" alt="plus" src="/plus.png" />
          </button> */}
      <ModalButton
        modalComponent={<PlaylistForm method="create"/>}
        modalContent={
          <button className="createMoreButton">
            <img className="plus-sign new" alt="plus" src="/plus.png" />
          </button>
        }
      />
    </div>
  );
};

export default PlaylistIndex;
