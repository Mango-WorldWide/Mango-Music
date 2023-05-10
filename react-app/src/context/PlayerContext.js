import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export default function PlayerProvider( { children } ){
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <PlayerContext.Provider value={{isPlaying, setIsPlaying}}>
            {children}
        </PlayerContext.Provider>

    )
}
