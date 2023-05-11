import { usePlayer } from "../../context/PlayerContext";



const PlayButton = ({ songId, songs }) => {
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr} = usePlayer();
  console.log(songs,'PLAY SONGSSSSSSS')
  const songArrId = songs.map((x) => x["id"]);
  console.log(songArrId, 'play button song arr id')
  const songIndex = songArrId.indexOf(songId)
  console.log(songId, ' song id inside play button')
  const handleClick = () => {
    setSongsArr(songs)
    setIsPlaying(true);
    setCurrentSong(songIndex)
  };

  return (
    <>
       <button onClick={handleClick}>Play</button>
    </>
  );
};

export default PlayButton;
