import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAlbumThunk,
  updateAlbumThunk,
  loadOneAlbumThunk,
  deleteAlbumThunk,
} from "../../store/album";
import { loadArtistThunk } from "../../store/artist";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { authenticate } from "../../store/session";
import "./AlbumForm.css";

const AlbumForm = ({ currentAlbum, formType }) => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const artist = useSelector((state) => state.artist);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const [albumPayload, setAlbumPayload] = useState({});
  const albumObj = {};

  useEffect(() => {
    if (user && user.artist_id) {
      dispatch(loadArtistThunk(user.artist_id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (currentAlbum) {
      setTitle(currentAlbum.title);
      setDescription(currentAlbum.description);
      setCover(currentAlbum.cover);
      setGenre(currentAlbum.genre);
      setYear(currentAlbum.year);
    }
  }, []);

  useEffect(() => {
    albumObj.title = title;
    albumObj.description = description;
    albumObj.cover = cover;
    albumObj.genre = genre;
    albumObj.year = year;
    albumObj.artist_id = user.artist_id;

    setAlbumPayload(albumObj);
  }, [title, description, cover, genre, year, user.artist_id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(authenticate());
    await dispatch(deleteAlbumThunk(albumId));
    closeModal();
    history.push(`/albums`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    if (title === null || title === "") err.title = "Title is required";
    if (cover === null || cover === "") err.cover = "Cover is required";
    if (genre === null || genre === "") err.genre = "Genre is required";
    if (year === null || year === "") err.year = "Year is required";
    const albumExists =
      artist && artist.albums && artist.albums.find((album) => album.title === title);
    if (albumExists && formType === "create") {
      err.title = "An album with this title already exists";
    }
    if (!!Object.values(err).length) {
      setErrors(err);
      return;
    }
    if (formType === "create") {
      const newAlbum = await dispatch(createAlbumThunk(albumPayload));
      if (newAlbum) {
        history.push(`/albums/${newAlbum.id}`);
        closeModal();
      }
    }
    if (formType === "update") {
      const updatedAlbum = await dispatch(updateAlbumThunk(albumPayload, currentAlbum.id));
      if (updatedAlbum) {
        dispatch(loadOneAlbumThunk(updatedAlbum.id));
        closeModal();
      }
    }
  };
  return (
    <>
      {formType === "delete" ? (
        <div className="delete-modal modal">
          <h1>Comfirm Delete</h1>
          <p>Are you sure you want to delete this album?</p>
          <div className="delete-buttons">
            <button className="orangeButton" onClick={(e) => handleDelete(e)}>
              Yes (Delete Album)
            </button>
            <button className="no-button orangeButton" onClick={closeModal}>
              No (Keep Album)
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: "800px", height: "400px" }} className="new-playlist-modal modal">
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
                <h1>{formType === "create" ? "Create an Album" : "Edit an Album"}</h1>
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
              <div className="flex-inputs">
                <label>
                  <input
                    placeholder="genre"
                    className={`auth-input ${errors.genre && "input-error"}`}
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <p className="errors">{errors.genre}</p>
                </label>
                <label>
                  <input
                    placeholder="year"
                    className={`auth-input ${errors.year && "input-error"}`}
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <p className="errors">{errors.year}</p>
                </label>
              </div>
              <textarea
                name="description"
                className="textArea newPlaylist"
                value={description}
                placeholder="Description"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="errors">{errors.description}</p>
              <hr className="lines form" />
              <div className="buttonContainer">
                <button className="orangeButton">
                  {formType === "create" ? "Create Album" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
    // <div className="album-form">
    //   <img
    //     className="musicCover audio-player-img"
    //     src={
    //       albumPayload["cover"]
    //         ? albumPayload["cover"]
    //         : process.env.PUBLIC_URL + "/mango-holder.gif"
    //     }
    //     alt={albumPayload["cover"]}
    //   />
    //   <form className="create-update-form" onSubmit={handleSubmit}>
    //     {errors.title && <p className="errors">{errors.title}</p>}
    //     <input
    //       className="form-input"
    //       name="title"
    //       id="title"
    //       type="text"
    //       placeholder="Title"
    //       value={title}
    //       onChange={updateTitle}
    //     />
    //     <textarea
    //       className="textarea-input"
    //       name="description"
    //       id="description"
    //       type="text"
    //       placeholder="description"
    //       value={description}
    //       onChange={updateDescription}
    //     />
    //     {errors.cover && <p className="errors">{errors.cover}</p>}
    //     <input
    //       className="form-input"
    //       name="cover"
    //       id="cover"
    //       type="text"
    //       placeholder="cover"
    //       value={cover}
    //       onChange={updateCover}
    //     />
    //     {errors.genre && <p className="errors">{errors.genre}</p>}
    //     <input
    //       className="form-input"
    //       name="genre"
    //       id="genre"
    //       type="text"
    //       placeholder="genre"
    //       value={genre}
    //       onChange={updateGenre}
    //     />
    //     {errors.year && <p className="errors">{errors.year}</p>}
    //     <input
    //       className="form-input"
    //       name="year"
    //       id="year"
    //       type="text"
    //       placeholder="year"
    //       value={year}
    //       onChange={updateYear}
    //     />

    //     <button className="form-submit-button" type="submit">
    //       {formType} Album
    //     </button>
    //   </form>
    // </div>
  );
};

export default AlbumForm;
