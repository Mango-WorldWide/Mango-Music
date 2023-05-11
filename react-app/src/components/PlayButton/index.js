import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayer } from "../../context/PlayerContext";
import { thunkLoadOneAlbumPlayer } from "../../store/player";


const PlayButton = ({ songId, albumId }) => {
  const {isPlaying, setIsPlaying, currentSong, setCurrentSong} = usePlayer();
  const audioPlayer = useRef();
  const dispatch = useDispatch();
  const song = useSelector((state) => Object.values(state.songs));
  const songs = useSelector((state) => state.player['Songs'])
  const songTest = songs.map((x) => x["id"]);
    console.log('SONGTEST', songTest)
    console.log('ALBUMID PLAYBUTTON',albumId)
    console.log('CURRENTSONG', currentSong)
    const songIndex = songTest.indexOf(songId)
    console.log('SONGINDEX', songIndex)
  const handleClick = async() => {
    await dispatch(thunkLoadOneAlbumPlayer(albumId))
    setIsPlaying((prev) => !prev);
    setCurrentSong(songIndex)
  };


  return (
    <>
       <button onClick={handleClick}>Play</button>
       <>{console.log("SONGMP3 THING", isPlaying)}</>
      {/* <audio src={song.mp3} ref={audioPlayer}></audio> */}
    </>
  );
};

export default PlayButton;
