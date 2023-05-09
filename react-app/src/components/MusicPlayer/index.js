import ReactAudioPlayer from "react-audio-player";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import x from "../../Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
import defaultCover from "../../Music/Bad Bunny - Un Verano Sin Ti/cover.jpg"
import { thunkAllSongs } from "../../store/song";

// import fs = require('fs')

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState("");
  const newX =  currentSong.slice(8)
  console.log("old x",x)
  console.log("new x",newX)

  useEffect(() => {
    // dispatch(thunkAllSongs());
    fetch("/api/songs/allSongs")
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched songs data:", data);
        setFetchedSongs(data.songs);
        setCurrentSong(data.songs[0].mp3);
      });
  }, []);

  console.log("CURRENT", currentSong)

  const goBack = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? fetchedSongs.length - 1 : prevIndex - 1
    );
    setCurrentSong(fetchedSongs[currentSongIndex].mp3);
  };

  const goForward = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === fetchedSongs.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentSong(fetchedSongs[currentSongIndex].mp3);
  };

  return (
    <>
      <h2>Playing Now</h2>
      {fetchedSongs.length > 0 && (
        <>
      <img className="musicCover" src={fetchedSongs[currentSongIndex].album.cover} />
      <div>
      <h3 className="title">{console.log("help",fetchedSongs[currentSongIndex].mp3)}</h3>

          <h3 className="title">{fetchedSongs[currentSongIndex].title}</h3>
          <p className="subTitle">{fetchedSongs[currentSongIndex].artist.name}</p>
      </div>
      <audio
        src={currentSong} // Make sure to replace 'x' with 'currentSong'
        controls
        autoPlay={true}
      />
      </>
      )}

      <button onClick={goBack}>back</button>
      <button onClick={goForward}>forward</button>
    </>
  );
};


export default MusicPlayer
