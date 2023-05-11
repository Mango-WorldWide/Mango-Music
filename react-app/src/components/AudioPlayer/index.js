import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { usePlayer } from "../../context/PlayerContext";
import "./AudioPlayerIndex.css"
import ProgressBar from "../ProgressBar";
// import new_song from '../../Music/Bad Bunny - Un Verano Sin Ti/01. Moscow Mule.mp3'
// import new_song1 from "../../Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
// import new_song2 from "../../Music/Bad Bunny - Un Verano Sin Ti/04. Tití Me Preguntó.mp3"
import new_song from '../../Music/Bad Bunny - Un Verano Sin Ti/01. Moscow Mule.mp3'
import new_song1 from "../../Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
import new_song2 from "../../Music/Bad Bunny - Un Verano Sin Ti/04. Tití Me Preguntó.mp3"
const all_songs = [new_song, new_song1, new_song2]

const AudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr} = usePlayer();
  const [isLooping, setIsLooping] = useState(false);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  const [queueIndex, setQueueIndex] = useState(0);
  const dispatch = useDispatch();
  const getSongs = useSelector((state) => state.songs);
  const songs = Object.values(getSongs);
  // console.log("songs 👉", songs);
  // console.log(songs[0]);
  // const MP3s = songs.map((x) => x["mp3"]);

  const audioPlayer = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    dispatch(loadSongsThunk());
  }, [dispatch]);

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const newCurrentTime = audioPlayer.current.currentTime;
    setCurrentTime(newCurrentTime);
    progressBarRef.current.value = newCurrentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, []);

  useEffect(() => {
    if (audioPlayer && audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.play();
        playAnimationRef.current = requestAnimationFrame(repeat);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(playAnimationRef.current);
      }
    }
  }, [isPlaying, audioPlayer, currentSong]);

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
    if (currentSong < songsArr.length - 1) {
      setCurrentSong((prev) => prev + 1);
    } else{
      setCurrentSong(prev=>prev)
    }
  };

  const goBack = () => {
    if (currentSong > 0) {
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

  const onLoadedMetadata = () => {
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  if (!songs.length) return null
  // console.log("=====>", songs[queueIndex])
  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <button className="audio-player-shuffle" onClick={(e) => alert("Feature Coming Soon!")}>Shuffle</button>
        <button className="audio-playeer-back" onClick={goBack}>Back</button>
        <button className="audio-player-play-pause" onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
        {/* <PlayButton songId={all_songs[currentSong]} /> */}
        <button className="audio-player-forward" onClick={goForward}>Forward</button>
        <button className="audio-player-loop" onClick={loopControl}>Loop</button>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img className="musicCover audio-player-img" src={songs[currentSong].album.cover} />
          {/* {console.log("AUDIOPLAYER", songs[currentSong].album.cover)} */}
          <div className="audio-player-text">
            <h3 className="title">{songs[currentSong].title}</h3>
            <p className="subTitle">{songs[currentSong].artist.name}</p>
          </div>
        </div>
        <ProgressBar progressBarRef={progressBarRef} audioPlayerRef={audioPlayer} currentTime={currentTime} duration={duration}/>
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
      <audio src={all_songs[currentSong]} ref={audioPlayer} loop={isLooping} onEnded={goForward} style={{ display: "hidden" }} onLoadedMetadata={onLoadedMetadata}></audio>
    </div>
  );
};
export default AudioPlayer;
