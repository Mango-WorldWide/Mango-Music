import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumThunk } from "../../store/album";
import { useEffect, useState } from "react";
import PlayButton from "../PlayButton";
import { useHistory, useParams } from "react-router-dom";
import { loadOneAlbumThunk } from "../../store/album";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";
import SongForm from "../SongForm";
import OpenModalDeleteButton from "../DeleteSong/OpenModalDeleteButton";
import DeleteSongModal from "../DeleteSong";
import "./AlbumById.css";
import AuthModal from "../AuthModal";
import OpenModalAddButton from "../AddPlaylistSong/OpenModalAddButton";
import AddSongModal from "../AddPlaylistSong";
import { usePlayer } from "../../context/PlayerContext";

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
    // console.log("inside album by id", albumId);
    dispatch(loadOneAlbumThunk(albumId));
  }, [dispatch, albumId]);

  if (!album["Songs"]) return null;

  if (!user) {
    return <AuthModal />;
  }

  const handleShuffle = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon");
  };

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
    history.push(`/albums`);
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
          <div class="orangeButtons">
            {albumSongs && albumSongs.length > 0 && (
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
                songId={albumSongs[0].id}
                songs={albumSongs}
              />
            )}
            <button className="orangeButton" onClick={handleShuffle}>
              <i class="fa-sharp fa-solid fa-shuffle" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
      {user.artist_id === album.Album.artist_id && (
        <div>
          <SongForm albumId={albumId} />
        </div>
      )}
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
                      isPlaying && song.id === queue[queueIndex]?.id ? (
                        <i className="fa fa-pause" aria-hidden="true"></i>
                      ) : (
                        <i class="fa fa-play" aria-hidden="true"></i>
                      )
                    }
                    songId={song.id}
                    songs={albumSongs}
                  />
                  <p>{song.title}</p>
                </td>
                <td onClick={(e) => handleLikeButton(e, song.id)}>
                  {likes.filter((like) => like["song_id"] === song.id).length > 0 ? (
                    <i class="fa-solid fa-thumbs-up" />
                  ) : i === hoveredSong ? (
                    <i class="fa-regular fa-thumbs-up" />
                  ) : (
                    ""
                  )}
                </td>
                {user.playlists.length > 0 && (
                  <td>
                    <OpenModalAddButton
                      itemText={<img alt="plus" className="plus-sign album" src="/plus.png" />}
                      modalComponent={<AddSongModal song={song} />}
                    />
                  </td>
                )}
                {user.artist_id === album.Album.artist_id && (
                  <>
                    <td>
                      <OpenModalDeleteButton
                        itemText="Edit"
                        modalComponent={
                          <DeleteSongModal
                            song={song}
                            categoryId={albumId}
                            category={"album"}
                            method={"Edit"}
                          />
                        }
                      />
                    </td>
                    <td>
                      <OpenModalDeleteButton
                        itemText="Delete"
                        modalComponent={
                          <DeleteSongModal
                            song={song}
                            categoryId={albumId}
                            category={"album"}
                            method={"Delete"}
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
      {user.artist_id === album["Album"].artist_id && (
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
