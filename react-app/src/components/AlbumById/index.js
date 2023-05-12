import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumThunk, loadAlbumsThunk } from "../../store/album";
import { useEffect, useState } from "react";
import AlbumsIndexItem from "../AlbumsIndexItem";
import PlayButton from "../PlayButton";
import { useHistory, useParams } from "react-router-dom";
import { loadOneAlbumThunk } from "../../store/album";
import LikeButton from "../LikeButton";
import { usePlayer } from "../../context/PlayerContext";
import "./AlbumById.css";

const AlbumById = () => {
  const [hoveredSong, setHoveredSong] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums);
  const likes = useSelector((state) => Object.values(state.likes));
  const albumSongs = album["Songs"];
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

  const handleLikeButton = async (e) => {
    // e.preventDefault();
    // if (isLiked) {
    //   let like = likes.filter((like) => like["song_id"] == song.id);
    //   like = like[0];
    //   await dispatch(deleteLikeThunk(like.id));
    // } else {
    //   await dispatch(createLikeThunk({ song_id: song.id }));
    // }
  };

  // console.log(album, 'myalbums')
  return (
    <div className="album-container">
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
          <div
            className="descContainer"
            data-tooltip={album["Album"].description.length > 217 ? "MORE" : ""}
          >
            <p className="albumDesc">{album["Album"].description}</p>
          </div>
          <div class="albumButtons">
            <PlayButton className="play-button" songId={album["Songs"][0].id} songs={albumSongs} />
            <button className="albumButton" onClick={handleShuffle}>
              <i class="fa-sharp fa-solid fa-shuffle" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
      <div className="song-list" onMouseLeave={() => setHoveredSong("")}>
      {album["Songs"].map((song, i) => (
                  <div className={`song-data ${i % 2 === 0 ? "grey" : ""}`}
                  onMouseEnter={() => setHoveredSong(i)}>
                    <div className="pepper">
          <div className="song-item" key={song.id}>
            <div className="song-title">{song.title}</div>
            <PlayButton className="play-button" songId={song.id} songs={albumSongs} />
            </div>
            <div className="thumbButtonContainer" onClick={() => handleLikeButton()}>
              <i class="fa-solid fa-thumbs-up" />
            </div>
            <LikeButton
              className="like-button"
              song={song}
              isLiked={likes.filter((like) => like["song_id"] == song.id).length > 0}
            />
          </div>
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
