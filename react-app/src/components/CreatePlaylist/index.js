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
      <div className="mainContainer playlist">
          <img className="musicCover audio-player-img"
      src={cover ? cover : process.env.PUBLIC_URL + '/mango-holder.gif' }
      alt={cover} />
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Create a new Playlist</h1>
          </div>
          {console.log(cover)}
          <label className="titleLabel">
            {/* Title */}
            <input
              name="title"
              value={title}
              className="oneLiner"
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="errors">{errors.title}</p>
          </label>
          <label className="coverLabel">
            {/* Cover */}
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
          {/* Description */}
          <textarea
            name="description"
            className="textArea newPlaylist"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="errors">{errors.description}</p>
          <hr className="lines form" />
          <div className="buttonContainer">
            <button className="orangeButton">Create Playlist</button>
          </div>
        </form>
      </div>
    );
}

export default NewPlaylistForm;
