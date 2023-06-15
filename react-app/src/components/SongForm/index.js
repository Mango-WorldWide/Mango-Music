import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistSongThunk, deleteSongThunk, updateSongThunk } from "../../store/song";
import { loadOneAlbumThunk } from "../../store/album";
import { addSongThunk } from "../../store/song";
import FileStatus from "./FileStatus.js";
import "./SongForm.css";

const SongForm = ({ albumId, currentSong, categoryId, category, formType }) => {
  const dispatch = useDispatch(); // so that we can redirect after the image upload is successful
  const { closeModal } = useModal();
  const [mp3, setMp3] = useState("");
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errorMessages = {};
    if (!title) errorMessages.title = "Title is required.";
    if (!genre) errorMessages.genre = "Genre is required.";
    if (!mp3 || !mp3.name.endsWith(".mp3")) errorMessages.mp3 = "Mp3 file is required.";
    return errorMessages;
  };

  useState(() => {
    if(currentSong){
      setTitle(currentSong.title)
      setGenre(currentSong.genre)
    }
  })

  useEffect(() => {
    setIsSending(false);
  }, [title, genre, mp3]);

  const deleteOnClick = (e) => {
    e.preventDefault();
    if (category === "playlist") {
      dispatch(deletePlaylistSongThunk(currentSong, categoryId)).then(closeModal);
    }
    if (category === "album") {
      dispatch(deleteSongThunk(currentSong.id, categoryId)).then(closeModal);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await dispatch(updateSongThunk(currentSong.id, {title, genre}))
    await dispatch(loadOneAlbumThunk(albumId))
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessages = validate();
    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }
    setIsSending(true);
    setErrors(validate());
    const formData = new FormData();
    formData.append("mp3", mp3);
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("album_id", albumId);

    await dispatch(addSongThunk(formData));
    e.target[2].value = null;
    setTitle("");
    setGenre("");
  };

  return (
    <>
      {formType === "delete" ? (
        <div className="delete-modal modal">
          <h1>Comfirm Delete</h1>
          <p>Are you sure you want to remove this song from the album?</p>
          <div className="delete-buttons">
            <button className="orangeButton" onClick={deleteOnClick}>
              Yes (Delete Song)
            </button>
            <button className="no-button orangeButton" onClick={closeModal}>
              No (Keep Song)
            </button>
          </div>
        </div>
      ) : formType === "edit" ? (
        <div className="edit-modal modal">
          <div className="edit-song-content">
            <h1>Edit Song</h1>
            <form onSubmit={handleEdit}>
              <label>
                <p>Title</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label>
                <p>Genre</p>
                <input value={genre} onChange={(e) => setGenre(e.target.value)} />
              </label>
              <div>
                <button
                  style={{
                    margin: "25px auto",
                    fontSize: "1rem",
                  }}
                  className="orangeButton"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <FileStatus isSending={isSending} />
          <form onSubmit={handleSubmit} className="songForm" encType="multipart/form-data">
            <label>
              title
              <input
                className="titleInput"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            {errors.title && <p className="errors">{errors.title}</p>}
            <label>
              genre
              <input
                className="genreInput"
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </label>
            {errors.genre && <p className="errors">{errors.genre}</p>}
            <input
              className="fileInput"
              type="file"
              accept="audio/*"
              onChange={(e) => setMp3(e.target.files[0])}
            />
            {errors.mp3 && <p className="errors">{errors.mp3}</p>}
            <button className="orangeButton songSubmit" disabled={isSending} type="submit">
              Submit
            </button>
          </form>
          <hr />
        </div>
      )}
    </>
  );
};

export default SongForm;
