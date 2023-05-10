import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleSongThunk } from "../../store/song";
import { usePlayer } from "../../context/PlayerContext";

const PlayButton = ({ songId }) => {
  const {isPlaying, setIsPlaying} = usePlayer();
  const audioPlayer = useRef();
  const dispatch = useDispatch();
  const song = useSelector((state) => Object.values(state.songs));

  useEffect(() => {
    if (!song) {
      dispatch(singleSongThunk(songId));
    }
  }, [song, songId, dispatch]);


  const handleClick = () => {
    setIsPlaying((prev) => !prev);
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
