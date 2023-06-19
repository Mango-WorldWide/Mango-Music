import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  getUserPlaylistsThunk,
  getSinglePlaylistThunk,
  createPlaylistThunk,
  updatePlaylistThunk,
  deletePlaylistThunk,
} from "../../store/playlist";
import AuthModal from "../AuthModal";
import { authenticate } from "../../store/session";
import "./PlaylistForm.css";

function PlaylistForm({ currentPlaylist, formType }) {
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (currentPlaylist) {
      setTitle(currentPlaylist.title);
      setDescription(currentPlaylist.description);
      setCover(currentPlaylist.cover);
    }
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePlaylistThunk(currentPlaylist.id));
    await dispatch(getUserPlaylistsThunk());
    await dispatch(authenticate())
    closeModal();
    history.push("/playlists");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const playlist = { title, description, cover };
    if (title === null || title === "") err.title = "Title is required";
    if (cover === null || cover === "") err.cover = "Cover is required";

    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      if (formType === "create") {
       const newPlaylist = await dispatch(createPlaylistThunk(playlist));
       if (newPlaylist) {
          await dispatch(getUserPlaylistsThunk());
          await dispatch(authenticate())
          history.push(`/playlists/${newPlaylist.id}`);
          closeModal();
        }
      } else {
        await dispatch(updatePlaylistThunk(currentPlaylist.id, playlist));
        await dispatch(getUserPlaylistsThunk());
        await dispatch(authenticate())
        await dispatch(getSinglePlaylistThunk(currentPlaylist.id));
      }
      closeModal();
    }
  };

  if (!user) {
    return <AuthModal />;
  }

  return (
    <>
      {formType === "delete" ? (
        <div className="delete-modal modal">
          <h1>Comfirm Delete</h1>
          <p>Are you sure you want to delete this playlist?</p>
          <div className="delete-buttons">
            <button className="orangeButton" onClick={(e) => handleDelete(e)}>
              Yes (Delete Playlist)
            </button>
            <button className="no-button orangeButton" onClick={closeModal}>
              No (Keep Playlist)
            </button>
          </div>
        </div>
      ) : (
        <div className="new-playlist-modal modal">
          <div className="cover-image-container">
            <img
              className="preview-cover audio-player-img"
              src={cover ? cover : process.env.PUBLIC_URL + "/mango-holder.gif"}
              alt={cover}
            />
          </div>
          <div>
            <form className="create-playlist-form" onSubmit={handleSubmit}>
              <div>
                <h1>{formType === "create" ? "Create a New Playlist" : "Edit a Playlist"}</h1>
              </div>
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
                <button className="orangeButton">
                  {formType === "create" ? "Create Playlist" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaylistForm;
