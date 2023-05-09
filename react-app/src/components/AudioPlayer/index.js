import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadSongsThunk } from "../../store/song"
// import new_song from '../static/Music/Bad Bunny - Un Verano Sin Ti/03. Me Porto Bonito.mp3'
const AudioPlayer = () => {
    const dispatch = useDispatch()
    const getSongs = useSelector(state => state.songs)
    const songs = Object.values(getSongs)
    console.log(songs[0])
    const y = songs.map(x => x["mp3"] )
    console.log(y[0])
    useEffect(() => {
        dispatch(loadSongsThunk())
    },[dispatch])
    if (!getSongs) return null

    return (
        <audio src={'/static/Music//Bad Bunny - Un Verano Sin Ti/03. Me Porto Bonito.mp3'}  controls>

        </audio>
    )
}
export default AudioPlayer
{/* <audio src="/static/media/01. Moscow Mule.8f5a3201.mp3" controls=""></audio> */}
// http://localhost:3000/static/media/03. Me Porto Bonito.99dba593.mp3
