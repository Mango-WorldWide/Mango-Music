import { useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePlaylistThunk, deletePlaylistThunk } from "../../store/playlist";
import "./byId.css"
function PlaylistById() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("dispatching get single playlist");
    dispatch(getSinglePlaylistThunk(playlistId));
  }, [dispatch]);

  const handleDelete = async () => {
    await dispatch(deletePlaylistThunk(playlistId));
    history.push("/playlists");
  };

  const handleEdit = () => {
    history.push(`/playlists/${playlistId}/edit`);
  };

  const playlist = useSelector((state) => state.playlists);

  if (!playlist || !playlist.id) return null;
  return (
    <div>
      <div className="container playlist">
        <h1>{playlist.title}</h1>
        <p>{playlist.description}</p>
        {playlist.songs.map((s, i) => (
          <p key={i}>{s.songs.title}</p>
        ))}
        <button onClick={handleEdit}>Edit Playlist</button>
        <button onClick={handleDelete}>Delete Playlist</button>
      </div>
    </div>
  );
}

export default PlaylistById;
