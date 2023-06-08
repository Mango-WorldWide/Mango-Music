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
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    setCurrentSong,
    currentSongIndex,
    setCurrentSongIndex,
    songsArr,
  } = usePlayer();

  const [isLooping, setIsLooping] = useState(false);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);

  const audioPlayer = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const newCurrentTime = audioPlayer.current.currentTime;
    setCurrentTime(newCurrentTime);
    progressBarRef.current.value = newCurrentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, []);

  useEffect(() => {
    // console.log("audioPlayer.current 👉", audioPlayer.current)
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

  if (!songsArr.length) return null;

  const goForward = async () => {
    if (currentSongIndex < songsArr.length - 1) {
      console.log("currentSongIndex  👉", currentSongIndex )
      setCurrentSongIndex((prev) => prev + 1);
      console.log("BEFORE SET CURRENT SONG!! -->", currentSong)

      console.log("songsArr 👉", songsArr)
      setCurrentSong(songsArr[currentSongIndex + 1]);
      console.log("CURRENT SONG!! -->", currentSong)
      await dispatch(singleSongThunk(currentSong.id));
    } else {
      setCurrentSongIndex((prev) => prev);
      setCurrentSong(songsArr[currentSongIndex]);
    }
  };

  const goBack = async () => {
    if (currentSongIndex > 0) {
      console.log("currentSongIndex  👉", currentSongIndex )
      setCurrentSongIndex((prev) => prev - 1);
      console.log("BEFORE SET CURRENT SONG!! -->", currentSong)
      setCurrentSong(songsArr[currentSongIndex - 1]);
      console.log("CURRENT SONG!! -->", currentSong)
      await dispatch(singleSongThunk(currentSong.id));
    } else {
      setCurrentSongIndex(songsArr.length - 1);
      setCurrentSong(songsArr[currentSongIndex]);
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

  // if (!currentSong || !currentSongIndex) return null;
  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <p className="audio-player-shuffle" onClick={(e) => alert("Feature Coming Soon!")}>
          <i class="fa-solid fa-shuffle"></i>
        </p>
        <p className="audio-playeer-back" onClick={goBack}>
          <i class="fa-solid fa-backward"></i>
        </p>
        <p className="audio-player-play-pause" onClick={playPause}>
          {isPlaying ? (
            <i className="fa fa-pause" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-play" aria-hidden="true"></i>
          )}
        </p>
        <p className="audio-player-forward" onClick={goForward}>
          <i class="fa-solid fa-forward"></i>
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
            src={songsArr[currentSongIndex].album.cover}
            alt={songsArr[currentSongIndex].title}
          />
          <div className="audio-player-text">
            <h3 className="title">{songsArr[currentSongIndex].title}</h3>
            <p className="subTitle">{songsArr[currentSongIndex].artist.name}</p>
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
            <i class="fa-solid fa-volume-xmark fa-fade"></i>
          ) : (
            <i class="fa-solid fa-volume-high"></i>
          )}
        </p>
        <input type="range" min={0} max={100} value={volume} onChange={volumeControl} />
      </div>
      {/* <audio src={all_songs[songIndex]} ref={audioPlayer} loop={isLooping} onEnded={goForward} style={{ display: "hidden" }} onLoadedMetadata={onLoadedMetadata}/> */}
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
