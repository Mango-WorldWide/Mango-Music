import { usePlayer } from "../../context/PlayerContext";
import { singleSongThunk } from "../../store/song";
import { useDispatch } from 'react-redux'
import { useRef } from "react";

const PlayButton = ({ songId, songs, isButton = false }) => {
  // const audioPlayer = useRef();
  // console.log("audioPlayer 👉 👉 👉 👉 👉", audioPlayer)
  // console.log("isButton from PlayButton 👉👉👉👉👉", isButton);
  // console.log("songId from PlayButton 👉👉👉👉👉", songId);
  // console.log("songs from PlayButton  👉👉👉👉", songs);
  const dispatch = useDispatch();
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    setCurrentSong,
    currentSongIndex,
    setCurrentSongIndex,
    songsArr,
    setSongsArr,
  } = usePlayer();
  // console.log(songs, "PLAY SONGSSSSSSS");
  const songArrId = songs.map((x) => x["id"]);
  // console.log(songArrId, "play button song arr id");
  const songIndex = songArrId.indexOf(songId);
  // console.log(songId, " song id inside play button");
  const handleClick = async () => {
    // console.log("songId from play button 👺👺👺👺👺", songId)
    // console.log("currentSongIndex from play button👺👺👺👺👺", currentSongIndex)
    // console.log("isPlaying from play button 👉", isPlaying);
    console.log("currentSong from play button 👉", currentSong);
    // console.log("songIndexx from play button 👉👉👉", songIndex);
    if (isPlaying && currentSongIndex === songIndex) {
      setIsPlaying(false);
    } else {
      const theSong = await dispatch(singleSongThunk(songId));
      console.log("theSong MP3 from play button 👉👉👉", theSong);
      setCurrentSongIndex(songIndex);
      setSongsArr(songs);
      setIsPlaying(true);
      setCurrentSong(theSong.mp3);
      // setCurrentSong(songIndex);
    }
  };

  return (
    <>
      {isButton ? (
        <button onClick={handleClick} className="playlistButton">
          {isPlaying ? (
            <>
              <i className="fa fa-pause" aria-hidden="true" />
              Pause
            </>
          ) : (
            <>
              <i class="fa fa-play" aria-hidden="true" />
              Play
            </>
          )}
        </button>
      ) : (
        <p onClick={handleClick} className="play-pause-btn">
          {isPlaying && songId === songsArr[currentSongIndex].id ? (
            <i className="fa fa-pause" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-play" aria-hidden="true"></i>
          )}
        </p>
      )}
    </>
  );
};

export default PlayButton;
