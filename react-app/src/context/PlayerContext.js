import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export default function PlayerProvider( { children } ){
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(0)
    const [songsArr, setSongsArr] = useState([])
    return (
        <PlayerContext.Provider value={{isPlaying, setIsPlaying, currentSong, setCurrentSong, songsArr, setSongsArr}}>
            {children}
        </PlayerContext.Provider>

    )
}
