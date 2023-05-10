import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updatePlaylistThunk, getSinglePlaylistThunk } from "../../store/playlist";

function UpdatePlaylistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [errors, setErrors] = useState({});

  const { playlistId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePlaylistThunk(playlistId)).then((playlist) => {
      setTitle(playlist.title);
      setDescription(playlist.description);
      setCover(playlist.cover);
    });
  }, [dispatch, playlistId]);

  const playlist = useSelector((state) => state.playlists);
  console.log("playlist 👉", playlist)
  if (!playlist || !playlist.id) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const playlistEdits = { title, description, cover };
    console.log("playlist 👉", playlistEdits)
    if (title === null || title === "") err.title = "Title is required";
    if (cover === null || cover === "") err.cover = "Cover is required";

    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      const newPlaylist = await dispatch(updatePlaylistThunk(playlist, playlistEdits));
      console.log("newPlaylist 👉", newPlaylist)
      history.push(`/playlists/${newPlaylist.id}`);
    }
  };

  return (
    <div className="mainContainer newSpot">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Create a new Playlist</h1>
        </div>
        <label className="titleLabel">
          Title
          <input
            name="title"
            value={title}
            className="oneLiner"
            id="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="errors">{errors.country}</p>
        </label>
        <label className="coverLabel">
          Cover
          <input
            name="cover"
            value={cover}
            className="oneLiner"
            id="cover"
            placeholder="Cover"
            onChange={(e) => setCover(e.target.value)}
          />
          <p className="errors">{errors.cover}</p>
        </label>
        <textarea
          name="description"
          className="textArea newPlaylist"
          value={description}
          placeholder="Please write at least 30 characters"
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="errors">{errors.description}</p>
        <hr className="lines form" />
        <div className="buttonContainer">
          <button>Update Playlist</button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePlaylistForm;

