import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [songsInfo, setSongsInfo] = useState("")
  const [queueIndex, setQueueIndex] = useState("");
  const [queue, setQueue] = useState([]);
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        queueIndex,
        setQueueIndex,
        queue,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
