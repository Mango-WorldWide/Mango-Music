import { usePlayer } from "../../context/PlayerContext";
import { singleSongThunk } from "../../store/song";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const PlayButton = ({ songId, songs, isButton = false }) => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    setCurrentSong,
    queueIndex,
    setQueueIndex,
    queue,
    setQueue,
  } = usePlayer();
  const songArrId = songs.map((x) => x["id"]);
  const selectedSong = songs.find((song) => song.id === songId);
  const selectedSongIndex = songArrId.indexOf(songId);
  const handleClick = async () => {
    if (isPlaying && (queueIndex === selectedSongIndex) && (currentSong.title === selectedSong.title)) {
      setIsPlaying(false);
    } else {
      const theSong = await dispatch(singleSongThunk(songId));
      setQueueIndex(selectedSongIndex);
      setQueue(songs);
      setIsPlaying(true);
      setCurrentSong(theSong);
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
          {isPlaying && songId === queue[queueIndex].id ? (
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
