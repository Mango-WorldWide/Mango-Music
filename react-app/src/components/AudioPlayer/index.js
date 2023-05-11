import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import { usePlayer } from "../../context/PlayerContext";
import "./AudioPlayerIndex.css"
import new_song from '../../Music/Bad Bunny - Un Verano Sin Ti/01. Moscow Mule.mp3'
import new_song1 from "../../Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
import new_song2 from "../../Music/Bad Bunny - Un Verano Sin Ti/04. Tití Me Preguntó.mp3"
// import new_song from '../static/Music/Bad Bunny - Un Verano Sin Ti/01. Moscow Mule.mp3'
// import new_song1 from "../static/Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
// import new_song2 from "../static/Music/Bad Bunny - Un Verano Sin Ti/04. Tití Me Preguntó.mp3"
const all_songs = [new_song, new_song1, new_song2]

const AudioPlayer = () => {
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr} = usePlayer();
  const [isLooping, setIsLooping] = useState(false);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  // const [currentSong, setCurrentSong] = useState(0);
  // const songs = useSelector((state) => state.player['Songs'])
  console.log(songsArr, 'my song arr', currentSong,'my index for song')
  console.log(songsArr[currentSong],' audio songs array current song')
  const dispatch = useDispatch();
  // const getSongs = useSelector((state) => state.songs);
  // const songs = Object.values(getSongs);
  // console.log('SONGS', songs)
  // const song = songs.map((x) => x["mp3"]);

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

  // if (!getSongs) return null;

  const goForward = () => {
    if (currentSong < all_songs.length - 1) {
      setCurrentSong((prev) => prev + 1);
    } else{
      setCurrentSong(prev=>prev)
    }
  };

  const goBack = () => {
    if (currentSong > 0) {
      setCurrentSong((prev) => prev - 1);
    } else{
      setCurrentSong(prev=>prev)
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

  if (!songsArr.length) return null
  // console.log("=====>", songs[queueIndex])
  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <button onClick={(e) => alert("Feature Coming Soon!")}>Shuffle</button>
        <button onClick={goBack}>Back</button>
        <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
        {/* <PlayButton songId={all_songs[currentSong]} /> */}
        <button onClick={goForward}>Forward</button>
        <button onClick={loopControl}>Loop</button>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img className="musicCover audio-player-img" src={songsArr[currentSong].album.cover} />
          <div className="audio-player-text">
            <h3 className="title">{songsArr[currentSong].title}</h3>
            <p className="subTitle">{songsArr[currentSong].artist.name}</p>
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
      <audio src={all_songs[currentSong]} ref={audioPlayer} loop={isLooping} style={{ display: "hidden" }}></audio>
    </div>
  );
};
export default AudioPlayer;
