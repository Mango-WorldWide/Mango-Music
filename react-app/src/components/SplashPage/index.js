import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRandomSongThunk } from "../../store/song";
import { Link, useHistory } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { loadAlbumsThunk } from "../../store/album";
import { shuffleArr } from "../../util.js"
import PlayButton from "../PlayButton";
import AlbumsIndexItem from "../AlbumsIndexItem";
import "./SplashPage.css";

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => Object.values(state.songs));
  const getAlbums = useSelector((state) => state.albums);
  const [albums, setAlbums] = useState(null)
  const [genreIndex, setGenreIndex] = useState(0);
  const [hoveredSong, setHoveredSong] = useState("");
  // const [setSongIndex] = useState(0);
  const { isPlaying, currentSong, queue, queueIndex } = usePlayer();

  // function shuffleArray(array) {
  //   let currentIndex = array.length;
  //   let temporaryValue, randomIndex;

  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
  // }

  useEffect(() => {
    dispatch(loadRandomSongThunk());
    dispatch(loadAlbumsThunk())
  }, [dispatch]);

  useEffect(()=>{
    const storeAlbums = Object.values(getAlbums);
    setAlbums(storeAlbums.length ? shuffleArr(storeAlbums).slice(0, 6) : null)
  },[getAlbums])

  // genre stuff..
  // const genres = [
  //   {
  //     name: "Reggaeton",
  //     image:
  //       "https://is4-ssl.mzstatic.com/image/thumb/Features125/v4/a7/2a/d6/a72ad6ff-1366-2979-4b9d-80030e7f6190/U0MtTVMtV1ctRXNzZW50aWFsX1JlZ2dhZXRvbi1BREFNX0lEPTEzNDc0MTE3ODgucG5n.png/305x305SC.CAESS02.webp?l=en-US",
  //   },
  //   { name: "Rock", image: "/Rock.png" },
  //   {
  //     name: "Country",
  //     image:
  //       "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/9a/72/8c/9a728cdb-cb26-5176-e594-dcefba6a82cd/9df5f4a3-d980-4fe7-963b-c35f8cc13d70.png/305x305SC.DN01.webp?l=en-US",
  //   },
  //   { name: "R&B", image: "/R&B.jpg" },
  //   { name: "Hip-Hop", image: "/HipHop.png" },
  //   { name: "Pop", image: "/Pop.png" },
  //   { name: "K-Pop", image: "/KPop.jpg" },
  //   { name: "EDM", image: "/EDM.png" },
  //   {
  //     name: "Classical",
  //     image:
  //       "https://is2-ssl.mzstatic.com/image/thumb/Features114/v4/91/24/1d/91241d46-7606-11ae-bcac-1039d8a90911/QkwtTVMtV1ctQ2xhc3NpY2FsLUFEQU1fSUQ9MTE0MjY1MjYxOCAoMTgpLnBuZw.png/110x110bb.webp",
  //   },
  // ];

  const nextGenre = () => {
    setGenreIndex((prevIndex) => (prevIndex + 3) % albums.length);
  };

  const prevGenre = () => {
    setGenreIndex((prevIndex) => (prevIndex - 3 + albums.length) % albums.length);
  };

  // next and prev for songs
  // const nextSong = () => {
  //   setSongIndex((prevIndex) => Math.min(prevIndex + 15, songs.length - 1));
  // };

  // const prevSong = () => {
  //   setSongIndex((prevIndex) => Math.max(prevIndex - 15, 0));
  // };

  const handlePlaySong = (songId) => { };

  // const handleGenreClick = () => {
  //   history.push("/search");
  // };
  // const shuffledSongs = shuffleArray([...songs].slice(0, 150));

  if (!songs.length || !songs[0].album_name) return null;
  return (
    <div className="splash-page">
      <h2 className="splash-genre-title">Browse Albums</h2>
      <div className="genre-carousel">
        {albums ?
          (<><button className="splash-genre-left" onClick={prevGenre}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          {/* {genres.slice(genreIndex, genreIndex + 3).map((genre) => (
            <div className="genre-tile" key={genre.name} onClick={handleGenreClick}>
              <img className="splash-genre-cover" src={genre.image} alt={genre.name} />
              <h2>{genre.name}</h2>
            </div>
          ))} */}
          {albums.slice(genreIndex, genreIndex + 3).map((album) => (
            <AlbumsIndexItem key={album.id} album={album} />
          ))}
          <button className="splash-genre-right" onClick={nextGenre}>
            <i className="fa-solid fa-angles-right"></i>
          </button></>)
        : <></>}
      </div>
      <div className="song-container">
        <h2 className="splash-song-list-title">Random Songs You Might Like</h2>

        <div className="splash-song-list">
          {songs.map((song, i) => (
            <div className="splash-song" key={song.id}>
              <div onClick={() => handlePlaySong(song.id)}>
                <PlayButton songId={song.id} songs={[song]} isButton={true} />
                <div
                  className="splash-song-cover-container"
                  onMouseEnter={() => setHoveredSong(i)}
                  onMouseLeave={() => setHoveredSong("")}
                >
                  <img className="splash-song-cover" src={song.album_cover} alt={song.title} />
                  {song.id === currentSong.id ? (
                    <div>
                      <div className="splash-song-overlay">
                        <PlayButton
                          nameOfClass="splash-play-button"
                          buttonContent={
                            isPlaying && song.id === queue[queueIndex].id ? (
                              <img alt="playing " className="song-player-logo" src="soundwave-playing.gif" />
                            ) : (
                              <img alt="paused" className="song-player-logo" src="soundwave-paused.png" />
                            )
                          }
                          songId={song.id}
                          songs={[song]}
                        />
                      </div>
                    </div>
                  ) : i === hoveredSong ? (
                    <div>
                      <div className="splash-song-overlay">
                        <PlayButton
                          nameOfClass="splash-play-button"
                          buttonContent={
                            isPlaying && song.id === queue[queueIndex].id ? (
                              <i className="fa fa-pause" aria-hidden="true" />
                            ) : (
                              <i className="fa fa-play" aria-hidden="true" />
                            )
                          }
                          songId={song.id}
                          songs={[song]}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="splash-song-info">
                <h4>{song.title}</h4>
                <Link to={`/artist/${song.artist_id}`}>
                  <h5>{song.artist_name}</h5>
                </Link>
                <h5>{song.genre}</h5>
              </div>
            </div>
          ))}
        </div>
        {/* <p className="splash-song-right" onClick={nextSong}> */}
        {/* <i className="fa-solid fa-angles-right"></i>
        </p> */}
      </div>
    </div>
  );
};

export default SplashPage;
