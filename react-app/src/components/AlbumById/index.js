import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumThunk } from "../../store/album";
import { useEffect, useState } from "react";
import PlayButton from "../PlayButton";
import { useHistory, useParams } from "react-router-dom";
import { loadOneAlbumThunk } from "../../store/album";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";
import SongForm from "../SongForm";
import AuthModal from "../AuthModal";
import ModalButton from "../ModalButton";
import AlbumForm from "../AlbumForm";
import AddPlaylistSongModal from "../AddPlaylistSong";
import { usePlayer } from "../../context/PlayerContext";
import "./AlbumById.css";

const AlbumById = () => {
  const [hoveredSong, setHoveredSong] = useState("");
  const dispatch = useDispatch();
  // const audioPlayer = useRef();
  const history = useHistory();
  const album = useSelector((state) => state.albums);
  const likes = useSelector((state) => Object.values(state.likes));
  const albumSongs = album["Songs"];
  const user = useSelector((state) => state.session.user);
  const { albumId } = useParams();
  const { isPlaying, queue, queueIndex } = usePlayer();

  useEffect(() => {
    dispatch(loadOneAlbumThunk(albumId));
  }, [dispatch, albumId]);

  if (!album["Songs"]) return null;

  if (!user) {
    return <AuthModal />;
  }

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

  // user only function
  const handleUpdate = () => {
    history.push(`/albums/${albumId}/edit`);
  };
  const handleDelete = async () => {
    await dispatch(deleteAlbumThunk(albumId));
    history.push(`/albums/artist`);
  };

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
          <h2 className="albumArtist">
            <a href={`/artist/${album["Album"].artist_id}`}>{album["Album"].artist}</a>
          </h2>
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
          <div className="orangeButtons">
            {albumSongs && albumSongs.length > 0 && (
              <>
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
                      <i className="fa fa-play" aria-hidden="true" />
                      Play
                    </>
                  )
                }
                songId={albumSongs[0].id}
                songs={albumSongs}
              />
              <button className="orangeButton" disabled style={{ cursor: "not-allowed" }}>
              <i className="fa-sharp fa-solid fa-shuffle" />
              Shuffle
            </button>
              </>
            )}
          </div>
        </div>
      </div>
      {user.artist_id === album.Album.artist_id && (
        <div>
          <h3>Add a Song</h3>
          <SongForm albumId={albumId} />
        </div>
      )}
      {albumSongs && albumSongs.length > 0 && (
      <div className="song-list" onMouseLeave={() => setHoveredSong("")}>
        <table className="songTable">
          <th id="songColumn">Song</th>
          <th id="likesColumn" />
          <th id="likesColumn" />
          <th id="likesColumn" />
          {album["Songs"].map((song, i) => (
            <>
              <tr
                className={`songData ${i % 2 === 0 ? "grey" : ""}`}
                onMouseEnter={() => setHoveredSong(i)}
              >
                <td className="songTitle">
                  <PlayButton
                    buttonContent={
                      isPlaying && song.id === queue[queueIndex]?.id ? (
                        <i className="fa fa-pause" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-play" aria-hidden="true"></i>
                      )
                    }
                    songId={song.id}
                    songs={albumSongs}
                  />
                  <p>{song.title}</p>
                </td>
                <td onClick={(e) => handleLikeButton(e, song.id)}>
                  {likes.filter((like) => like["song_id"] === song.id).length > 0 ? (
                    <i className="fa-solid fa-thumbs-up" />
                  ) : i === hoveredSong ? (
                    <i className="fa-regular fa-thumbs-up" />
                  ) : (
                    ""
                  )}
                </td>
                {user.playlists.length > 0 && (
                  <td>
                    <ModalButton
                      modalContent={<img alt="plus" className="plus-sign album" src="/plus.png" />}
                      modalComponent={<AddPlaylistSongModal song={song} />}
                    />
                  </td>
                )}
                {user.artist_id === album.Album.artist_id && (
                  <>
                    <td>
                      <ModalButton
                        modalContent={<i className="fa-solid fa-pen-to-square" />}
                        modalComponent={
                          <SongForm
                            currentSong={song}
                            albumId={albumId}
                            category={"album"}
                            formType="edit"
                          />
                        }
                      />
                    </td>
                    <td>
                      <ModalButton
                        modalContent={<i className="fa-solid fa-trash-can" />}
                        modalComponent={
                          <SongForm
                            currentSong={song}
                            categoryId={albumId}
                            category={"album"}
                            formType="delete"
                          />
                        }
                      />
                    </td>
                  </>
                )}
              </tr>
            </>
          ))}
        </table>
      </div>
      )}
      {user.artist_id === album["Album"].artist_id && (
        <div style={{display: "flex"}}>
          <ModalButton
            modalContent={<button className="update-button green-hover">Update Album</button>}
            modalComponent={<AlbumForm currentAlbum={album.Album} formType="update" />}
          />
          <ModalButton
            modalContent={<button className="delete-button red-hover">Delete Album</button>}
            modalComponent={<AlbumForm currentAlbum={album.Album} formType="delete" />}
          />
        </div>
      )}
    </div>
  );
};

export default AlbumById;
