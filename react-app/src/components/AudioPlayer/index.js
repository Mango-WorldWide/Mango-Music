import ProgressBar from "../ProgressBar";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useDispatch } from "react-redux";
import { singleSongThunk } from "../../store/song";

import "./AudioPlayerIndex.css";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong, queueIndex, setQueueIndex, queue } =
    usePlayer();

  const [isLooping, setIsLooping] = useState(false);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);

  const audioPlayer = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    if (audioPlayer.current) {
      const newCurrentTime = audioPlayer.current.currentTime;
      setCurrentTime(newCurrentTime);
      progressBarRef.current.value = newCurrentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
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
      if (unmuteVolume) {
        setVolume(() => 0);
        audioPlayer.current.volume = 0;
      } else {
        setVolume((prev) => prev);
        audioPlayer.current.volume = volume / 100;
      }
    }
  }, [volume, audioPlayer, unmuteVolume]);

  if (!queue.length) return null;

  const goForward = async () => {
    if (queueIndex < queue.length - 1) {
      setQueueIndex((prev) => prev + 1);
      let newSong = await dispatch(singleSongThunk(queue[queueIndex + 1].id));
      setCurrentSong(newSong);
    }else{
      setIsPlaying(false)
    }
  };

  const goBack = async () => {
    if (queueIndex > 0) {
      setQueueIndex((prev) => prev - 1);
      let newSong = await dispatch(singleSongThunk(queue[queueIndex - 1].id));
      setCurrentSong(newSong);
    }
  };

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const loopControl = () => {
    setIsLooping((prev) => !prev);
  };

  const volumeControl = (e) => {
    setVolume(e.target.value);
    if (e.target.value > 0) {
      setUnmuteVolume(false);
    } else {
      setUnmuteVolume(true);
    }
  };

  const muteControl = () => {
    setUnmuteVolume((prev) => !prev);
    if (unmuteVolume) {
      setVolume(prevVolume);
      audioPlayer.current.volume = prevVolume / 100;
    } else {
      setPrevVolume(volume);
      audioPlayer.current.volume = volume / 100;
    }
  };

  const onLoadedMetadata = () => {
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  // if (!currentSong || !queueIndex) return null;
  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <p className="audio-player-shuffle" onClick={(e) => alert("Feature Coming Soon!")}>
          <i className="fa-solid fa-shuffle" style={{ cursor: "not-allowed" }}></i>
        </p>
        <p className="audio-playeer-back" onClick={goBack}>
          <i className="fa-solid fa-backward"></i>
        </p>
        <p className="audio-player-play-pause" onClick={playPause}>
          {isPlaying ? (
            <i className="fa fa-pause" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-play" aria-hidden="true"></i>
          )}
        </p>
        <p className="audio-player-forward" onClick={goForward}>
          <i className="fa-solid fa-forward"></i>
        </p>
        <p className={`audio-player-loop ${isLooping ? "active" : ""}`} onClick={loopControl}>
          {isLooping ? (
            <i className="fa-solid fa-repeat fa-fade"></i>
          ) : (
            <i className="fa-solid fa-repeat"></i>
          )}
        </p>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img
            className="musicCover audio-player-img"
            src={queue[queueIndex]?.cover}
            alt={queue[queueIndex]?.title}
          />
          <div className="audio-player-text">
            <h3 className="title">{queue[queueIndex]?.title}</h3>
            <p className="subTitle">{queue[queueIndex]?.artist_name}</p>
          </div>
        </div>
        <ProgressBar
          progressBarRef={progressBarRef}
          audioPlayerRef={audioPlayer}
          currentTime={currentTime}
          duration={duration}
        />
      </div>
      <div className="audio-player-volume-controls">
        <p onClick={muteControl} className="audio-player-mute-button">
          {unmuteVolume ? (
            <i className="fa-solid fa-volume-xmark fa-fade"></i>
          ) : (
            <i className="fa-solid fa-volume-high"></i>
          )}
        </p>
        <input type="range" min={0} max={100} value={volume} onChange={volumeControl} />
      </div>
      {/* <audio src={all_songs[selectedSongIndex]} ref={audioPlayer} loop={isLooping} onEnded={goForward} style={{ display: "hidden" }} onLoadedMetadata={onLoadedMetadata}/> */}
      <audio
        src={currentSong.mp3}
        ref={audioPlayer}
        loop={isLooping}
        onEnded={goForward}
        style={{ display: "hidden" }}
        onLoadedMetadata={onLoadedMetadata}
      />
    </div>
  );
};
export default AudioPlayer;
