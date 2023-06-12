import { usePlayer } from "../../context/PlayerContext";
import { singleSongThunk } from "../../store/song";
import { useDispatch } from 'react-redux'
import { useRef } from "react";

const PlayButton = ({ songId, songs, isButton = false }) => {
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
    if (isPlaying && currentSongIndex === songIndex) {
      setIsPlaying(false);
    } else {
      const theSong = await dispatch(singleSongThunk(songId));
      setCurrentSongIndex(songIndex);
      console.log("songs added to song arrray 👉", songs)
      setSongsArr(songs);
      console.log("SONGS ARRAY --->", songsArr)
      setIsPlaying(true);
      setCurrentSong(theSong);
      console.log("CURRENT SONG FROM PLAY BUTTON ===>", currentSong)
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
