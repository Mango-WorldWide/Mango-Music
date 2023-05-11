import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayer } from "../../context/PlayerContext";
import { thunkLoadOneAlbumPlayer } from "../../store/player";


const PlayButton = ({ songId, albumId }) => {
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr} = usePlayer();
  const audioPlayer = useRef();
  const dispatch = useDispatch();
  const [test, setTest] = useState('')
  // const song = useSelector((state) => Object.values(state.songs));
  const songs = useSelector((state) => state.player['Songs'])
  // console.log('SONGTEST', songTest)
  // console.log('ALBUMID PLAYBUTTON',albumId)
  // console.log('CURRENTSONG', currentSong)
  useEffect(()=>{
    dispatch(thunkLoadOneAlbumPlayer(albumId))
  },[dispatch])


  if(!songs) return null
  const songTest = songs.map((x) => x["id"]);
  const songIndex = songTest.indexOf(songId)
    // console.log('SONGINDEX', songIndex)
  const handleClick = () => {
    console.log('hey i clicked it')

    if (isPlaying && currentSong === songIndex) {
      setIsPlaying(false);
    } else {
    setSongsArr(songs)
    setIsPlaying(true);
    setCurrentSong(songIndex)
  }}


  return (
    <>
       <p onClick={handleClick} className="play-pause-btn">
       {isPlaying && currentSong === songIndex ? (
      <i className="fa fa-pause" aria-hidden="true"></i>
                        ) : (
      <i class="fa fa-play" aria-hidden="true"></i>
       )}</p>
      {/* <audio src={song.mp3} ref={audioPlayer}></audio> */}
    </>
  );
};

export default PlayButton;
