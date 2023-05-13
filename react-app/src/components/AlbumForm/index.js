import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAlbumThunk, updateAlbumThunk } from "../../store/album";
import { loadArtistThunk } from "../../store/artist";
import { usePlayer } from "../../context/PlayerContext";
import { useParams, useHistory } from "react-router-dom";
import "./AlbumForm.css";

const AlbumForm = ({ input, formType }) => {
  console.log("formType 👉👉👉👉👉👉👉👉", formType)
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr } =
    usePlayer();
  const user = useSelector((state) => state.session.user);
  const artist = useSelector((state) => state.artist);
  // console.log(user.artist_id)
  const [title, setTitle] = useState(input.title);
  const [description, setDescription] = useState(input.description);
  const [cover, setCover] = useState(input.cover);
  const [genre, setGenre] = useState(input.genre);
  const [year, setYear] = useState(input.year);

  const [albumPayload, setAlbumPayload] = useState({});
  const albumObj = {};

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateCover = (e) => setCover(e.target.value);
  const updateGenre = (e) => setGenre(e.target.value);
  const updateYear = (e) => setYear(e.target.value);

  useEffect(() => {
    if (user && user.artist_id) {
      dispatch(loadArtistThunk(user.artist_id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    albumObj.title = title;
    albumObj.description = description;
    albumObj.cover = cover;
    albumObj.genre = genre;
    albumObj.year = year;
    albumObj.artist_id = user.artist_id;

    setAlbumPayload(albumObj);
    console.log("ALBUMOBJ", albumObj);
  }, [title, description, cover, genre, year, user.artist_id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    // const playlistEdits = { title, description, cover };
    // console.log("playlist 👉", playlistEdits)
    if (title === null || title === "") err.title = "Title is required";
    if (cover === null || cover === "") err.cover = "Cover is required";
    if (genre === null || genre === "") err.genre = "Genre is required";
    if (year === null || year === "") err.year = "Year is required";
    const albumExists =
      artist && artist.albums && artist.albums.find((album) => album.title === title);
    if (albumExists && formType === "Create") {
      err.title = "An album with this title already exists";
    }
    if (!!Object.values(err).length) {
      console.log("👉 found errors while updating playlist 👈");
      setErrors(err);
      return;
    }
    if (formType === "Create") {
      console.log("!!!!! CREATING ALBUM !!!!!!!!");
      const newAlbum = await dispatch(createAlbumThunk(albumPayload));
      if (newAlbum) {
        history.push(`/albums/${newAlbum.id}`);
      }
    }
    if (formType === "Update") {
      console.log("!!!!! UPDATING ALBUM !!!!!!!!");
      const updatedAlbum = await dispatch(updateAlbumThunk(albumPayload, albumId));
      console.log("updatedAlbum ==>", updatedAlbum)
      if(updatedAlbum) history.push(`/albums/${updatedAlbum.id}`);
    }
  };
  return (
    <div className="album-form">
      <img
        className="musicCover audio-player-img"
        src={
          albumPayload["cover"]
            ? albumPayload["cover"]
            : process.env.PUBLIC_URL + "/mango-holder.gif"
        }
        alt={albumPayload["cover"]}
      />
      <form className="create-update-form" onSubmit={handleSubmit}>
        {errors.title && <p className="errors">{errors.title}</p>}
        <input
          className="form-input"
          name="title"
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle}
        />
        <textarea
          className="textarea-input"
          name="description"
          id="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={updateDescription}
        />
        {errors.cover && <p className="errors">{errors.cover}</p>}
        <input
          className="form-input"
          name="cover"
          id="cover"
          type="text"
          placeholder="cover"
          value={cover}
          onChange={updateCover}
        />
        {errors.genre && <p className="errors">{errors.genre}</p>}
        <input
          className="form-input"
          name="genre"
          id="genre"
          type="text"
          placeholder="genre"
          value={genre}
          onChange={updateGenre}
        />
        {errors.year && <p className="errors">{errors.year}</p>}
        <input
          className="form-input"
          name="year"
          id="year"
          type="text"
          placeholder="year"
          value={year}
          onChange={updateYear}
        />

        <button className="form-submit-button" type="submit">
          {formType} Album
        </button>
      </form>
    </div>
  );
};

export default AlbumForm;
