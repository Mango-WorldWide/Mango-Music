import ProgressBar from "../ProgressBar";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePlayer } from "../../context/PlayerContext";
import "./AudioPlayerIndex.css"
import { useSelector, useDispatch } from "react-redux";
import { loadSongsThunk, singleSongThunk } from "../../store/song";
const new_song = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
const new_song1 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
const new_song2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
// import new_song from '../static/Music/Bad Bunny - Un Verano Sin Ti/01. Moscow Mule.mp3'
// import new_song1 from "../static/Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
// import new_song2 from "../static/Music/Bad Bunny - Un Verano Sin Ti/04. Tití Me Preguntó.mp3"
const all_songs = [new_song, new_song1, new_song2]

const AudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch()
  const [duration, setDuration] = useState(0);
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr} = usePlayer();
  const [isLooping, setIsLooping] = useState(false);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  const [songData, setSongData] = useState(null);

  const audioPlayer = useRef();
  const progressBarRef = useRef();
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
    if (currentSong != null) {
      dispatch(singleSongThunk(songsArr[currentSong].id))
        .then((song) => {
          if (song) {
            setSongData(song);
          }
        })
        .catch((err) => console.error(err));
    }
}, [currentSong, dispatch]);

useEffect(() => {
  if (audioPlayer.current && songData) {
      audioPlayer.current.src = songData.mp3;
      audioPlayer.current.load();
  }
}, [songData]);



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

  if (!songsArr.length) return null

  const goForward = () => {
    if (currentSong < songsArr.length - 1) {
      setCurrentSong((prev) => prev + 1);
    } else{
      setCurrentSong(prev=>prev)
    }
  };

  const goBack = () => {
    if (currentSong > 0) {
      setCurrentSong((prev) => prev - 1);
    } else {
      setCurrentSong(songsArr.length - 1);
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


  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <p className="audio-player-shuffle" onClick={(e) => alert("Feature Coming Soon!")}><i class="fa-solid fa-shuffle"></i></p>
        <p className="audio-playeer-back" onClick={goBack}><i class="fa-solid fa-backward"></i></p>
        <p className="audio-player-play-pause" onClick={playPause}>{isPlaying ? <i className="fa fa-pause" aria-hidden="true"></i> : <i class="fa fa-play" aria-hidden="true"></i>}</p>
        <p className="audio-player-forward" onClick={goForward}><i class="fa-solid fa-forward"></i></p>
        <p
      className={`audio-player-loop ${isLooping ? "active" : ""}`}
      onClick={loopControl}
    >
      {isLooping ? (
        <i className="fa-solid fa-repeat fa-fade"></i>
      ) : (
        <i className="fa-solid fa-repeat"></i>
      )}
    </p>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img className="musicCover audio-player-img" src={songsArr[currentSong].album.cover} alt={songsArr[currentSong].title} />
          <div className="audio-player-text">
            <h3 className="title">{songsArr[currentSong].title}</h3>
            <p className="subTitle">{songsArr[currentSong].artist.name}</p>
          </div>
        </div>
        <ProgressBar progressBarRef={progressBarRef} audioPlayerRef={audioPlayer} currentTime={currentTime} duration={duration}/>
      </div>
      <div className="audio-player-volume-controls">
        <p onClick={muteControl} className="audio-player-mute-button">{unmuteVolume?<i class="fa-solid fa-volume-xmark fa-fade"></i>:<i class="fa-solid fa-volume-high"></i>}</p>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={volumeControl}
        />
      </div>
      {console.log('SONGS', songData)}
      <audio src={songData ? songData.mp3 : ''} ref={audioPlayer} loop={isLooping} onEnded={goForward} style={{ display: "hidden" }} onLoadedMetadata={onLoadedMetadata}></audio>
    </div>
  );
};
export default AudioPlayer;
