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

  useEffect(() => {
    setIsSending(false);
  }, [title, genre, mp3]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    console.log("HANDLING SUBMIT OF SONG");
    const formData = new FormData();
    formData.append("mp3", mp3);
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("album_id", albumId);

    const newSong = await dispatch(addSongThunk(formData));
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
        <label>
          genre
          <input
            className="genreInput"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
        <input
          className="fileInput"
          type="file"
          accept="audio/*"
          onChange={(e) => setMp3(e.target.files[0])}
        />
        <button className="orangeButton songSubmit" disabled={isSending} type="submit">
          Submit
        </button>
      </form>
      <hr />
    </>
  );
};

export default SongForm;
