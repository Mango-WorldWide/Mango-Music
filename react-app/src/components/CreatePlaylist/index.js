import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlaylistThunk } from "../../store/playlist";
import "./createPlaylist.css";

function NewPlaylistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const playlist = { title, description, cover };
    console.log("playlist 👉", playlist)
    if (title === null || title === "") err.title = "Title is required";
    if (cover === null || cover === "") err.cover = "Cover is required";

    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      const newPlaylist = await dispatch(createPlaylistThunk(playlist));
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
            <button>Create Playlist</button>
          </div>
        </form>
      </div>
    );
}

export default NewPlaylistForm;

