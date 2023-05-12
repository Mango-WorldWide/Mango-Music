import { useEffect, useState, useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePlaylistThunk, deletePlaylistThunk } from "../../store/playlist";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";
import { singleSongThunk } from "../../store/song";
import PlayButton from "../PlayButton";
import LikeButton from "../LikeButton";
import { usePlayer } from "../../context/PlayerContext";
import "./PlaylistById.css";

function PlaylistById() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [hoveredSong, setHoveredSong] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const { isPlaying, setIsPlaying } = usePlayer();
  const audioPlayer = useRef();

  const playlist = useSelector((state) => state.playlists);
  const likes = useSelector((state) => Object.values(state.likes));

  useEffect(() => {
    console.log("dispatching get single playlist");
    dispatch(getSinglePlaylistThunk(playlistId));
  }, [dispatch]);

  const handleLikeButton = async (e, songId) => {
    e.preventDefault();
    if (likes.filter((like) => like["song_id"] == songId).length > 0) {
      let like = likes.filter((like) => {
        return like["song_id"] == songId;
      });
      like = like[0];
      await dispatch(deleteLikeThunk(like.id));
    } else {
      await dispatch(createLikeThunk({ song_id: songId }));
    }
  };

  const handleDelete = async () => {
    await dispatch(deletePlaylistThunk(playlistId));
    history.push("/playlists");
  };

  const handleEdit = () => {
    history.push(`/playlists/${playlistId}/edit`);
  };

  const handlePlay = async (songId) => {
    setSelectedSong(songId);
    await dispatch(singleSongThunk(songId));
    setIsPlaying((prev) => !prev);
  };

  const handleShuffle = () => {
    // history.push(`/albums/${albumId}/edit`);
  };

  if (!playlist || !playlist.id) return null;
  // const playlistSongs = playlist.songs.map((x) => {
  //   console.log("play ==>", x.songs.album);
  // });
  return (
    <div className="outerPlaylistContainer">
      <div className="innerPlaylistContainer top">
        <div className="coverDiv">
          <img
            className="playlistImage"
            src={playlist.cover}
            alt={playlist.title}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="albumMenu">
          <h1 className="playlistTitle">{playlist.title}</h1>
          {/* <h2 className="playListOwner">{album["Album"].artist}</h2> */}
          <div
            className="descContainer playlist"
            data-tooltip={playlist.description.length > 217 ? "MORE" : ""}
          >
            <p className="playlistDesc">{playlist.description}</p>
          </div>
          <div class="playlistButtons">
            <button className="playlistButton" onClick={handlePlay}>
              <i class="fa-solid fa-play" />
              Play
            </button>
            <button className="playlistButton" onClick={handleShuffle}>
              <i class="fa-sharp fa-solid fa-shuffle" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
      <div className="song-list" onMouseLeave={() => setHoveredSong("")}>
        <table className="songTable">
          <th id="songColumn">Song</th>
          <th id="artistColumn">Artist</th>
          <th id="albumColumn">Album</th>
          <th id="likesColumn"></th>
          {playlist.songs.map((playlist, i) => (
            <tr
              className={`songData ${i % 2 === 0 ? "grey" : ""}`}
              onMouseEnter={() => setHoveredSong(i)}
            >
              <td className="songTitle" onClick={() => handlePlay(playlist.songs.id)}>
                <p>
                  {playlist.songs.id === selectedSong ? (
                    <i class="fa-sharp fa-solid fa-pause orange" />
                  ) : i === hoveredSong ? (
                    <i class="fa-solid fa-play orange" />
                  ) : (
                    i + 1
                  )}
                </p>
                <p>{playlist.songs.title}</p>
              </td>
              <td className="songArtist" onClick={() => handlePlay(playlist.songs.id)}>
                {playlist.songs.artist.name}
              </td>
              <td className="songAlbum" onClick={() => handlePlay(playlist.songs.id)}>
                {playlist.songs.album.title}
              </td>
              <td onClick={(e) => handleLikeButton(e, playlist.songs.id)}>
                {likes.filter((like) => like["song_id"] == playlist.songs.id).length > 0 ? (
                  <i class="fa-solid fa-thumbs-up" />
                ) : i === hoveredSong ? <i class="fa-regular fa-thumbs-up"/> : ""}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default PlaylistById;
