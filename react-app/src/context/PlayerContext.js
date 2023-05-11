import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export default function PlayerProvider( { children } ){
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(0)

    return (
        <PlayerContext.Provider value={{isPlaying, setIsPlaying, currentSong, setCurrentSong}}>
            {children}
        </PlayerContext.Provider>

    )
}
