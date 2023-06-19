import { useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistSongThunk, deleteSongThunk } from "../../store/song";
import "./EditDeleteSongModal.css"

const EditDeleteSongModal = ({ song, categoryId, category, method }) => {
  const [title, setTitle] = useState(song.title);
  const [genre, setGenre] = useState(song.genre);
  const dispatch = useDispatch();
  const { closeModal } = useModal();



  return (
    <>
     
    </>
  );
};

export default EditDeleteSongModal;
