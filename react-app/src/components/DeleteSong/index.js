import { useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadOneAlbumThunk } from "../../store/album";
import { deletePlaylistSongThunk, deleteSongThunk, updateSongThunk } from "../../store/song";

const DeleteSongModal = ({ song, categoryId, category, method }) => {
  const [title, setTitle] = useState(song.title);
  const [genre, setGenre] = useState(song.genre);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // console.log(song, "what is my song in my modal to delete");
  const deleteOnClick = (e) => {
    e.preventDefault();
    if (category === "playlist") {
      // console.log("delete on click modal for songs playlist song", song);
      dispatch(deletePlaylistSongThunk(song, categoryId)).then(closeModal);
    }
    if (category === "album") {
      // console.log("delete song for album");
      dispatch(deleteSongThunk(song.id, categoryId)).then(closeModal);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault()
    const songPayload = {title, genre}
    const phaseOne = await dispatch(updateSongThunk(songPayload, song.id))
    const phaseTwo = await (dispatch(loadOneAlbumThunk(song.album_id)))
    closeModal();
  }

  const cancelOnClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {method === "Delete" ? (
        <div className="modal song-modal">
          <h1>Comfirm Delete</h1>
          <p>Are you sure you want to remove this song from the listings?</p>
          <button onClick={deleteOnClick}>Yes (Delete Song)</button>
          <button className="no-button" onClick={cancelOnClick}>
            No (Keep Song)
          </button>
        </div>
      ) : (
        <div className="modal song-modal">
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
      )}
    </>
  );
};

export default DeleteSongModal;
