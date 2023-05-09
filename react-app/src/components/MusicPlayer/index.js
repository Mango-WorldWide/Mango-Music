import ReactAudioPlayer from "react-audio-player";
import { useState,useEffect } from "react";
// import x from "../../static/Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
// import fs = require('fs')

const MusicPlayer = () => {
  const [queueIndex, setQueueIndex] = useState(0);

  const songs = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  ];

  const goForward = () => {
    if (queueIndex < songs.length - 1){
      setQueueIndex(prev => prev + 1)
    }
  }

  const goBack = () => {
    if (queueIndex > 0 ){
      setQueueIndex(prev => prev - 1)
    }
  }

  return (
    <>
      <h1>{songs[queueIndex]}</h1>
      <ReactAudioPlayer src={songs[queueIndex]} controls autoPlay={true} loop={true} />
      <button onClick={goBack}>back</button>
      <button onClick={goForward}>forward</button>
    </>
  );
};

export default MusicPlayer;