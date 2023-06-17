import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePlaylistThunk } from "../../store/playlist";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";
import PlayButton from "../PlayButton";
import ModalButton from "../ModalButton";
import PlaylistForm from "../PlaylistForm";
import SongForm from "../SongForm";
import { usePlayer } from "../../context/PlayerContext";
import { Link } from "react-router-dom";
import "./PlaylistById.css";

function PlaylistById() {
  const ulRef = useRef();
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [showMenu, setShowMenu] = useState();
  const [hoveredSong, setHoveredSong] = useState("");
  const { isPlaying, queue, queueIndex } = usePlayer();
  const playlist = useSelector((state) => state.playlists);
  const likes = useSelector((state) => Object.values(state.likes));
  const user = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
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

  const closeMenu = () => setShowMenu(false);

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
          <div
            className="descContainer playlist"
            data-tooltip={playlist.description.length > 217 ? "MORE" : ""}
          >
            <p className="playlistDesc">{playlist.description}</p>
          </div>
          {playlistSongs && playlistSongs.length > 0 && (
            <div className="playlistButtons">
              {playlistSongs.length > 0 ? (
                <PlayButton
                  nameOfClass="playlistButton green-hover"
                  buttonContent={
                    isPlaying ? (
                      <>
                        <i className="fa fa-pause" aria-hidden="true" />
                        Pause
                      </>
                    ) : (
                      <>
                        <i className="fa fa-play" aria-hidden="true" />
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
              <button className="playlistButton" disabled style={{ cursor: "not-allowed" }}>
                <i className="fa-sharp fa-solid fa-shuffle" />
                Shuffle
              </button>
            </div>
          )}
        </div>
        <div className="more-options-container">
          <button className="more-options" onClick={openMenu}>
            <i className="fa-solid fa-ellipsis" />
          </button>
          <div className={`more-options-dropdown ${showMenu ? "" : "hidden"}`} ref={ulRef}>
            <ModalButton
              modalComponent={<PlaylistForm formType="update" currentPlaylist={playlist} />}
              modalContent={
                <div className="edit-delete-container">
                  <div className="edit-delete" onClick={closeMenu}>
                    <p>Edit</p>
                    <i className="fa-solid fa-pen-to-square" />
                  </div>
                </div>
              }
            />

            <hr className="item-divider options" />
            <ModalButton
              modalComponent={<PlaylistForm formType="delete" currentPlaylist={playlist} />}
              modalContent={
                <div className="edit-delete-container">
                  <div className="edit-delete" onClick={closeMenu}>
                    <p>Delete</p>
                    <i className="fa-solid fa-trash-can" />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      <div className="song-list" onMouseLeave={() => setHoveredSong("")}>
        {playlistSongs && playlistSongs.length > 0 ? (
          <>
            <table className="song-table">
              <th id="play-column"></th>
              <th id="song-column">Song</th>
              <th id="artist-column">Artist</th>
              <th id="album-column">Album</th>
              <th id="likes-column"></th>
                {playlist.songs.map((playlist, i) => (
                  <tr
                    className={`song-data-tr ${i % 2 === 0 ? "grey" : ""}`}
                    onMouseEnter={() => setHoveredSong(i)}
                  >
                    <td className="play-button-td">
                      <PlayButton
                        buttonContent={
                          isPlaying && playlist.songs.id === queue[queueIndex].id ? (
                            <i className="fa fa-pause" aria-hidden="true"></i>
                          ) : (
                            <i className="fa fa-play" aria-hidden="true"></i>
                          )
                        }
                        songId={playlist.songs.id}
                        songs={playlistSongs}
                      />
                    </td>
                    <td className="song-title-td">
                      <p>{playlist.songs.title}</p>
                      {console.log("album name ===>", playlist.songs)}
                    </td>
                    <td className="song-artist-td">{playlist.songs.artist_name}</td>
                    <td className="song-album-td">{playlist.songs.album_title}</td>
                    <td onClick={(e) => handleLikeButton(e, playlist.songs.id)}>
                      {likes.filter((like) => like["song_id"] === playlist.songs.id).length > 0 ? (
                        <i className="fa-solid fa-thumbs-up" />
                      ) : i === hoveredSong ? (
                        <i className="fa-regular fa-thumbs-up" />
                      ) : (
                        ""
                      )}
                    </td>
                    {user.id === playlistOwner && (
                      <td className="remove-song-td">
                        <ModalButton
                          modalContent={<i className="fa-solid fa-trash-can" />}
                          modalComponent={
                            <SongForm
                              currentSong={playlist.id}
                              categoryId={playlistId}
                              category={"playlist"}
                              formType="delete"
                            />
                          }
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </table>
          </>
        ) : (
          <div className="add-button">
            <button className="blue-button-square">
              <Link to="/albums">Add a Song</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistById;
