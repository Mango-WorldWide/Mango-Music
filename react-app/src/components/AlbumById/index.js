import { useDispatch, useSelector } from "react-redux"
import { deleteAlbumThunk, loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import AlbumsIndexItem from "../AlbumsIndexItem"
import PlayButton from "../PlayButton"
import { useHistory, useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../store/album"
import LikeButton from "../LikeButton"
import { usePlayer } from "../../context/PlayerContext"
import './AlbumById.css'
import SongForm from "../SongForm"
import { deleteSongThunk } from "../../store/song"
import OpenModalDeleteButton from "../DeleteSong/OpenModalDeleteButton"
import DeleteSongModal from "../DeleteSong"

const AlbumById = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums);
  const likes = useSelector((state) => Object.values(state.likes));
  const albumSongs = album["Songs"];
  const user = useSelector((state) => state.session.user);
  const { albumId } = useParams();
  console.log(Object.values(album), "album state checking");
  useEffect(() => {
    console.log("inside album by id", albumId);
    dispatch(loadOneAlbumThunk(albumId));
  }, [dispatch]);

  if (!album["Songs"]) return null;

  const handleShuffle = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon");
  };
  const handleDelete = () => {
    dispatch(deleteAlbumThunk(albumId));
    history.push(`/albums`);
  };
  const handleUpdate = () => {
    history.push(`/albums/${albumId}/edit`);
  };

    // console.log(album, 'myalbums')
    return (
      <div className="album-container">
        <img className="album-cover" src={album["Album"].cover} alt={album["Album"].title} />
        <h1 className="album-title">{album["Album"].title}</h1>
        <h3 className="album-artist">{album["Album"].artist}</h3>
        {user.artist_id === album.Album.artist_id && (
            <div><SongForm albumId={albumId}/></div>
          )}
        <div className="song-list">
          {album["Songs"].map((song) => (
            <div className="song-item" key={song.id}>
              <div className="song-title">{song.title}</div>
              <PlayButton className="play-button" songId={song.id} songs={albumSongs} />
              <LikeButton
                className="like-button"
                song={song}
                isLiked={likes.filter((like) => like["song_id"] == song.id).length > 0}
              />
              <OpenModalDeleteButton itemText="Delete" modalComponent={<DeleteSongModal  song={song} albumId={albumId}/>} />
            </div>
          ))}

        </div>
        {console.log('USER -----',user)}
      {user.artist_id === album['Album'].artist_id && (
  <>
    <button className="update-button" onClick={handleUpdate}>
        UPDATE ME
      </button>
      <button className="delete-button" onClick={handleDelete}>
        DELETE ME
      </button>
    </>
)}
    </div>
    );
  };

export default AlbumById;
