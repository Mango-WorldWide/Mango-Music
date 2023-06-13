import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePlaylistThunk, deletePlaylistThunk } from "../../store/playlist";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";
import PlayButton from "../PlayButton";
import "./PlaylistById.css";
import { authenticate } from "../../store/session";
import OpenModalDeleteButton from "../DeleteSong/OpenModalDeleteButton";
import DeleteSongModal from "../DeleteSong";
import { usePlayer } from "../../context/PlayerContext";

function PlaylistById() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [hoveredSong, setHoveredSong] = useState("");
  const { isPlaying, queue, queueIndex } = usePlayer();

  const playlist = useSelector((state) => state.playlists);
  const likes = useSelector((state) => Object.values(state.likes));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    console.log("dispatching get single playlist");
    dispatch(getSinglePlaylistThunk(playlistId));
  }, [dispatch, playlistId]);

  const handleLikeButton = async (e, songId) => {
    e.preventDefault();
    if (likes.filter((like) => like["song_id"] === songId).length > 0) {
      let like = likes.filter((like) => {
        return like["song_id"] === songId;
      });
      like = like[0];
      await dispatch(deleteLikeThunk(like.id));
    } else {
      await dispatch(createLikeThunk({ song_id: songId }));
    }
  };

  const handleShuffle = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon!");
  };

  const handleDelete = async () => {
    await dispatch(deletePlaylistThunk(playlistId));
    dispatch(authenticate());
    history.push("/playlists");
  };

  const handleEdit = () => {
    history.push(`/playlists/${playlistId}/edit`);
  };
  if (!playlist || !playlist.id) return null;
  const playlistSongs = playlist.songs.map((x) => x.songs);
  const playlistOwner = playlist.user_id;

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
          <h1 className="singlePlaylistTitle">{playlist.title}</h1>
          {/* <h2 className="playListOwner">{album["Album"].artist}</h2> */}
          <div
            className="descContainer playlist"
            data-tooltip={playlist.description.length > 217 ? "MORE" : ""}
          >
            <p className="playlistDesc">{playlist.description}</p>
          </div>
          <div class="playlistButtons">
            {playlistSongs.length > 0 ? (
              <PlayButton
                nameOfClass="playlistButton"
                buttonContent={
                  isPlaying ? (
                    <>
                      <i className="fa fa-pause" aria-hidden="true" />
                      Pause
                    </>
                  ) : (
                    <>
                      <i class="fa fa-play" aria-hidden="true" />
                      Play
                    </>
                  )
                }
                songId={playlistSongs[0].id}
                songs={playlistSongs}
              />
            ) : (
              <button disabled={true}>Play</button>
            )}
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
              <td className="songTitle">
                {/* <p>
                {playlist.songs.id === selectedSong ? (
                  <i class="fa-sharp fa-solid fa-pause orange" />
                ) : i === hoveredSong ? (
                  <i class="fa-solid fa-play orange" />
                ) : (
                  i + 1
                )}
              </p> */}
                <PlayButton
                  buttonContent={
                    isPlaying && playlist.songs.id === queue[queueIndex].id ? (
                      <i className="fa fa-pause" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-play" aria-hidden="true"></i>
                    )
                  }
                  songId={playlist.songs.id}
                  songs={playlistSongs}
                />
                <p>{playlist.songs.title}</p>
              </td>
              <td className="songArtist">{playlist.songs.artist_name}</td>
              <td className="songAlbum">{playlist.songs.album_name}</td>
              <td onClick={(e) => handleLikeButton(e, playlist.songs.id)}>
                {likes.filter((like) => like["song_id"] === playlist.songs.id).length > 0 ? (
                  <i class="fa-solid fa-thumbs-up" />
                ) : i === hoveredSong ? (
                  <i class="fa-regular fa-thumbs-up" />
                ) : (
                  ""
                )}
              </td>
              {user.id === playlistOwner && (
                <td>
                  <OpenModalDeleteButton
                    itemText="Delete"
                    modalComponent={
                      <DeleteSongModal
                        song={playlist.id}
                        categoryId={playlistId}
                        category={"playlist"}
                        method={"Delete"}
                      />
                    }
                  />
                </td>
              )}
            </tr>
          ))}
          <button className="playlistId-edit-playlist" onClick={handleEdit}>
            Edit Playlist
          </button>
          <button className="playlistId-delete-playlist" onClick={handleDelete}>
            Delete Playlist{" "}
          </button>
        </table>
      </div>
    </div>
  );
}

export default PlaylistById;
