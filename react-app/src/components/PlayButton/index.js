import { usePlayer } from "../../context/PlayerContext";
import { singleSongThunk } from "../../store/song";
import { useDispatch } from "react-redux";

const PlayButton = ({
  nameOfClass,
  buttonContent,
  songId,
  songs,
  isButton = false,
}) => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    setCurrentSong,
    queueIndex,
    setQueueIndex,
    setQueue,
  } = usePlayer();

  const songArrId = songs.map((x) => x["id"]);
  const selectedSong = songs.find((song) => song.id === songId);
  const selectedSongIndex = songArrId.indexOf(songId);
  const handleClick = async () => {
    if (isPlaying && queueIndex === selectedSongIndex && currentSong.title === selectedSong.title) {
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
        <div className={nameOfClass} onClick={handleClick}>
          {buttonContent}
        </div>
      </>
  );
};

export default PlayButton;