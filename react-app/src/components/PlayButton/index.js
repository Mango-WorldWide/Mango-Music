import { usePlayer } from "../../context/PlayerContext";



const PlayButton = ({ songId, songs }) => {
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr} = usePlayer();
  console.log(songs,'PLAY SONGSSSSSSS')
  const songArrId = songs.map((x) => x["id"]);
  console.log(songArrId, 'play button song arr id')
  const songIndex = songArrId.indexOf(songId)
  console.log(songId, ' song id inside play button')
  const handleClick = () => {


    if (isPlaying && currentSong === songIndex) {
      setIsPlaying(false);
    } else {
    setSongsArr(songs)
    setIsPlaying(true);
    setCurrentSong(songIndex)
  };
  }

  return (
    <>
       <p onClick={handleClick} className="play-pause-btn">
       {isPlaying && currentSong === songIndex ? (
      <i className="fa fa-pause" aria-hidden="true"></i>
                        ) : (
      <i class="fa fa-play" aria-hidden="true"></i>
       )}</p>

    </>
  );
};

export default PlayButton;
