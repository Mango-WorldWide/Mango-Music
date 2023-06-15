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

  const deleteOnClick = (e) => {
    e.preventDefault();
    if (category === "playlist") {
      dispatch(deletePlaylistSongThunk(song, categoryId)).then(closeModal);
    }
    if (category === "album") {
      dispatch(deleteSongThunk(song.id, categoryId)).then(closeModal);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault()
    closeModal();
  }

  const cancelOnClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {method === "delete" ? (
        <div className="delete-song-modal modal">
          <h1>Comfirm Delete</h1>
          <p>Are you sure you want to remove this song from the album?</p>
          <div className='delete-buttons'>
          <button className="orangeButton" onClick={deleteOnClick}>Yes (Delete Song)</button>
          <button className="no-button orangeButton" onClick={closeModal}>
            No (Keep Song)
          </button>
          </div>
        </div>
      ) : (
        <div className="edit-song-modal modal">
          <div className='edit-song-content'>
          <h1>Edit Song</h1>
          <form onSubmit={handleEdit}>
            <label>
              <p>Title</p>
              <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
               />
            </label>
            <label>
              <p>Genre</p>
              <input 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
               />
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
      )}
    </>
  );
};

export default EditDeleteSongModal;
