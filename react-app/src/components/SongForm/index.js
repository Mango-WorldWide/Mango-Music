import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongThunk } from "../../store/song";

const SongForm = ({albumId}) => {
  const dispatch = useDispatch(); // so that we can redirect after the image upload is successful
  const [mp3, setMp3] = useState(null);
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  console.log(albumId,'song submitting')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mp3", mp3);
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("album_id", albumId);
    console.log("formData 👉", mp3, title, genre, albumId,formData)
    await dispatch(addSongThunk(formData));
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        title
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        genre
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </label>
      <input type="file" accept="audio/*" onChange={(e) => setMp3(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SongForm
