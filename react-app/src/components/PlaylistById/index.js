import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePlaylistThunk, deletePlaylistThunk } from "../../store/playlist";
import PlayButton from "../PlayButton"

function PlaylistById() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    console.log("dispatching get single playlist");
    dispatch(getSinglePlaylistThunk(playlistId));
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deletePlaylistThunk(playlistId))
    history.push("/playlists")
  }
  const playlist = useSelector((state) => state.playlists);
  if (!playlist || !playlist.id) return null;
  const playlistSongs = playlist.songs.map((x)=>x.songs)
  console.log(playlistSongs,'whats my playlist')
  return (
    <div className="playlistContainer">
      <h1>{playlist.title}</h1>
      <p>{playlist.description}</p>
      {playlist.songs.map((s, i) => (
        <>
          <p key={i}>{s.songs.title}</p>
          <PlayButton songId={s.songs.id} songs={playlistSongs} />
        </>
      ))}
      <button onClick={handleDelete}>Delete Playlist</button>
    </div>
  );
}

export default PlaylistById;
