import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { usePlayer } from "../../context/PlayerContext";
import "./AudioPlayerIndex.css"
import new_song from '../../Music/Bad Bunny - Un Verano Sin Ti/03. Me Porto Bonito.mp3'
import new_song1 from "../../Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
import new_song2 from "../../Music/Bad Bunny - Un Verano Sin Ti/04. Tití Me Preguntó.mp3"

const all_songs = [new_song, new_song1, new_song2]

const AudioPlayer = () => {
  const {isPlaying, setIsPlaying} = usePlayer();
  const [IsLooping, setIsLooping] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const dispatch = useDispatch();
  const getSongs = useSelector((state) => state.songs);
  const songs = Object.values(getSongs);
  console.log("songs 👉", songs);
  console.log(songs[0]);
  // const song = songs.map((x) => x["mp3"]);

  const audioPlayer = useRef();

  //testing if not needed
  useEffect(() => {
    dispatch(loadSongsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (audioPlayer && audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [isPlaying, audioPlayer, queueIndex]);

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

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const loopControl = () => {
    setIsLooping((prev) => !prev);
  };

  if (!songs.length) return null
  console.log("=====>", songs[queueIndex])
  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <button onClick={(e) => alert("Feature Coming Soon!")}>Shuffle</button>
        <button onClick={goBack}>Back</button>
        <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
        {/* <PlayButton songId={all_songs[queueIndex]} /> */}
        <button onClick={goForward}>Forward</button>
        <button onClick={loopControl}>Loop</button>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img className="musicCover audio-player-img" src={songs[queueIndex].album.cover} />
          <div className="audio-player-text">
            <h3 className="title">{songs[queueIndex].title}</h3>
            <p className="subTitle">{songs[queueIndex].artist.name}</p>
          </div>
        </div>
        <span>Progress Bar</span>
      </div>
      <div className="audio-player-volume-controls">
        <span>Volume Bar</span>
      </div>
      <audio src={all_songs[queueIndex]} ref={audioPlayer} loop={IsLooping} style={{ display: "hidden" }}></audio>
    </div>
  );
};
export default AudioPlayer;
