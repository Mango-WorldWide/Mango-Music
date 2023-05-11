import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { usePlayer } from "../../context/PlayerContext";
import "./AudioPlayerIndex.css"

const new_song = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
const new_song1 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
const new_song2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"


const MP3s = [new_song, new_song1, new_song2]

const AudioPlayer = () => {
  const {isPlaying, setIsPlaying} = usePlayer();
  const [isLooping, setIsLooping] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);

  const dispatch = useDispatch();
  const getSongs = useSelector((state) => state.songs);
  
  const songs = Object.values(getSongs);
  const audioPlayer = useRef();

  //testing if not needed
  // useEffect(() => {
  //   dispatch(loadSongsThunk());
  // }, [dispatch]);

  useEffect(() => {
    if (audioPlayer && audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [isPlaying, audioPlayer, queueIndex]);

  useEffect(() => {
    if (audioPlayer && audioPlayer.current) {
      audioPlayer.current.muted = unmuteVolume;
      if (unmuteVolume){
        setVolume(() => 0)
        audioPlayer.current.volume = 0
      } else{
        setVolume((prev) => prev)
        audioPlayer.current.volume = volume / 100;
      }
    }
  }, [volume, audioPlayer, unmuteVolume]);

  if (!getSongs) return null;

  const goForward = () => {
    if (queueIndex < MP3s.length - 1) {
      setQueueIndex((prev) => prev + 1);
    } else{
      setQueueIndex(prev=>prev)
    }
  };

  const goBack = () => {
    if (queueIndex > 0) {
      setQueueIndex((prev) => prev - 1);
    } else{
      setQueueIndex(prev=>prev)
    }
  };

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const loopControl = () => {
    setIsLooping((prev) => !prev);
  };

  const volumeControl = (e) => {
    setVolume(e.target.value)
    if (e.target.value > 0){
      setUnmuteVolume(false)
    } else{
      setUnmuteVolume(true)
    }
  }

  const muteControl = () => {
    setUnmuteVolume((prev) => !prev);
    if (unmuteVolume){
      setVolume(prevVolume)
      audioPlayer.current.volume = prevVolume / 100;
    } else {
      setPrevVolume(volume)
      audioPlayer.current.volume = volume / 100;
    }
  }

  if (!songs.length) return null
  // console.log("=====>", songs[queueIndex])
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
          {/* <img className="musicCover audio-player-img" src={songs[queueIndex].album.cover} /> */}
          <div className="audio-player-text">
            <h3 className="title">{songs[queueIndex].title}</h3>
            {/* <p className="subTitle">{songs[queueIndex].artist.name}</p> */}
          </div>
        </div>
        <span>Progress Bar</span>
      </div>
      <div className="audio-player-volume-controls">
        <button onClick={muteControl} className="audio-player-mute-button">{unmuteVolume?"Unmute":"Mute"}</button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={volumeControl}
        />
      </div>
      <audio src={MP3s[queueIndex]} ref={audioPlayer} loop={isLooping} onEnded={goForward} style={{ display: "hidden" }}></audio>
    </div>
  );
};
export default AudioPlayer;
