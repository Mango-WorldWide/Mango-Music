import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
// import new_song from '../static/Music/Bad Bunny - Un Verano Sin Ti/03. Me Porto Bonito.mp3'
const AudioPlayer = () => {
  const [queueIndex, setQueueIndex] = useState(0);
  const dispatch = useDispatch();
  const getSongs = useSelector((state) => state.songs);
  const songs = Object.values(getSongs);
  console.log("songs 👉", songs);
  console.log(songs[0]);
  const song = songs.map((x) => x["mp3"]);

  useEffect(() => {
    dispatch(loadSongsThunk());
  }, [dispatch]);
  if (!getSongs) return null;

  const goForward = () => {
    if (queueIndex < songs.length - 1) {
      setQueueIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (queueIndex > 0) {
      setQueueIndex((prev) => prev - 1);
    }
  };
  if(!songs.length) return null
  console.log("=====>", songs[queueIndex])
  return (
    <div>
      <img className="musicCover" src={songs[queueIndex].album.cover} />
      <div>
        <h3 className="title">{songs[queueIndex].title}</h3>
        <p className="subTitle">{songs[queueIndex].artist.name}</p>
      </div>
      <audio src={song[queueIndex]} controls autoPlay={true} loop={true}></audio>
      <button onClick={goBack}>back</button>
      <button onClick={goForward}>forward</button>
    </div>
  );
};
export default AudioPlayer;
