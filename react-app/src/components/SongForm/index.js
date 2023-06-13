import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSongThunk } from "../../store/song";
import SongFormModal from "./SongFormModal.js";
import "./SongForm.css";

const SongForm = ({ albumId }) => {
  const dispatch = useDispatch(); // so that we can redirect after the image upload is successful
  const [mp3, setMp3] = useState("");
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errorMessages = {};
    if (!title) errorMessages.title = "Title is required.";
    if (!genre) errorMessages.genre = "Genre is required.";
    if (!mp3 || !mp3.name.endsWith('.mp3')) errorMessages.mp3 = "Mp3 file is required.";
    return errorMessages;
  };

  useEffect(() => {
    setIsSending(false);
  }, [title, genre, mp3]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessages = validate()
    if (Object.keys(errorMessages).length > 0){
      setErrors(errorMessages)
      return
    }
    setIsSending(true);
    setErrors(validate())
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
      <SongFormModal isSending={isSending} />
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
    </>
  );
};

export default SongForm;
