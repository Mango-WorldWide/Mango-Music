import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumThunk, loadAlbumsThunk } from "../../store/album";
import { useEffect, useState, useRef } from "react";
import AlbumsIndexItem from "../AlbumsIndexItem";
import PlayButton from "../PlayButton";
import { useHistory, useParams } from "react-router-dom";
import { loadOneAlbumThunk } from "../../store/album";
import { singleSongThunk } from "../../store/song";
import { deleteLikeThunk, createLikeThunk} from "../../store/like"
import LikeButton from "../LikeButton";
import { usePlayer } from "../../context/PlayerContext";

const AlbumById = () => {
  const [hoveredSong, setHoveredSong] = useState("")
  const dispatch = useDispatch();
  const { isPlaying, setIsPlaying } = usePlayer();
  const audioPlayer = useRef();
  const song = useSelector((state) => Object.values(state.songs));
  const history = useHistory();
  const album = useSelector((state) => state.albums);
  const likes = useSelector((state) => Object.values(state.likes));
  const { albumId } = useParams();
  console.log(Object.values(album), "album state checking");
  console.log(hoveredSong)
  useEffect(() => {
    console.log("inside album by id", albumId);
    dispatch(loadOneAlbumThunk(albumId));
  }, [dispatch]);
  // console.log(album.id)
  if (!album["Songs"]) return null;


  const handleDelete = () => {
    dispatch(deleteAlbumThunk(albumId));
    history.push(`/albums`);
  };
  const handleUpdate = () => {
    history.push(`/albums/${albumId}/edit`);
  };
  const handlePlay = async (songId) => {
    await dispatch(singleSongThunk(songId))
    setIsPlaying((prev) => !prev);
  };

  const handleShuffle = () => {
    history.push(`/albums/${albumId}/edit`);
  };
  console.log(album, "myalbums");
  return (
    <div className="outerAlbumContainer">
      <div className="innerAlbumContainer top">
        <div className="coverDiv">
          <img
            className="albumImage"
            src={album["Album"].cover}
            alt={album["Album"].title}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="albumMenu">
          <h1 className="albumTitle">{album["Album"].title}</h1>
          <h2 className="albumArtist">{album["Album"].artist}</h2>
          <div className="albumGenreYear">
            <p className="albumGenre">{album["Album"].genre}</p>
            <p id="dot">·</p>
            <p></p>
            <p className="albumYear">{album["Album"].year}</p>
          </div>
          <div className="descContainer" data-tooltip="MORE">
            <p className="albumDesc">{album["Album"].description}</p>
          </div>
          <div class="albumButtons">
            <button className="albumButton" onClick={handlePlay}>
              <i class="fa-solid fa-play" />
              Play
            </button>
            <button className="albumButton" onClick={handleShuffle}>
              <i class="fa-sharp fa-solid fa-shuffle" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
      <div className="song-list" onMouseLeave={(() => setHoveredSong(""))}>
        {album["Songs"].map((song, i) => (
          <div
            key={song.id}
            className={`song-item ${i % 2 === 0 ? "grey" : ""}`}
            onMouseEnter={() => setHoveredSong(i)}
            onClick={() => handlePlay(song.id)}
          >
            <div className="song-title">
              <p>{i === hoveredSong ? <i class="fa-solid fa-play orange" /> : i + 1}</p>
              <p>{song.title}</p>
            </div>
            <PlayButton className="play-button" songId={song.id} albumId={albumId} />
            <LikeButton
              className="like-button"
              song={song}
              isLiked={likes.filter((like) => like["song_id"] == song.id).length > 0}
            />
          </div>
        ))}
      </div>
      <button className="update-button" onClick={handleUpdate}>
        UPDATE ME
      </button>
      <button className="delete-button" onClick={handleDelete}>
        DELETE ME
      </button>
    </div>
  );
};

export default AlbumById;

{
  /* <button onClick={handleUpdate}>UPDATE ME</button>
<button onClick={handleDelete}>DELETE ME</button> */
}
