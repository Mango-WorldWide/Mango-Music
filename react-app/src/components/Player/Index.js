import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
// import defaultSong from "../../static/Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3";
// import defaultCover from "../../static/Music/Bad Bunny - Un Verano Sin Ti/cover.jpg"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "react-circular-progressbar/dist/styles.css";

import "./Player.css";

const PlayingButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [play, { pause, duration, sound }] = useSound(currentSong, { volume: 0.5 });

  useEffect(() => {
    [{play}] = useSound(currentSong, {volume: 0.5})
  }, [currentSong])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/songs/allSongs")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched songs data:", data);
        setFetchedSongs(data.songs);
        setCurrentSong(data.songs[0].mp3);
      });
  }, []);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const skipToPrevious = () => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : fetchedSongs.length - 1;
      setCurrentSong(fetchedSongs[newIndex].mp3);
      console.log("CURRENT:", currentSong)
      return newIndex;
    });
  };

  const skipToNext = () => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex < fetchedSongs.length - 1 ? prevIndex + 1 : 0;
      setCurrentSong(fetchedSongs[newIndex].mp3);
      return newIndex;
    });
  };




  return (
    fetchedSongs.length > 0 && typeof fetchedSongs[currentSongIndex] !== "undefined" ? (
      <div className="component">
        <h2>Playing Now</h2>
        <img
          className="musicCover"
          src={fetchedSongs[currentSongIndex].album.cover} // {defaultCover}
        />
        <div>
          <h3 className="title">{fetchedSongs[currentSongIndex].title}</h3>
          <p className="subTitle">{fetchedSongs[currentSongIndex].artist.name}</p>
        </div>
        <div>

        </div>
          <div>
            {/* PREVIOUS BUTTON */}
            <button className="playButton" onClick={skipToPrevious}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              // PLAY BUTTON
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              // PAUSE BUTTON
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            {/* NEXT SONG BUTTON */}
            <button className="playButton" onClick={skipToNext}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <BiSkipNext />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      ) : (
        // Error in fetching data if this shows up
        <p>Loading songs...</p>
      )
    );
      }


  export default PlayingButton
