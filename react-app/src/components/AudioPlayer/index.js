import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadSongsThunk } from "../../store/song"
// import new_song from '../static/Music/Bad Bunny - Un Verano Sin Ti/03. Me Porto Bonito.mp3'
const AudioPlayer = () => {
    const [queueIndex, setQueueIndex] = useState(0)
    const dispatch = useDispatch()
    const getSongs = useSelector(state => state.songs)
    const songs = Object.values(getSongs)
    console.log(songs[0])
    const song = songs.map(x => x["mp3"] )
    useEffect(() => {
        dispatch(loadSongsThunk())
    },[dispatch])
    if (!getSongs) return null

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
        <div>

            <audio src={song[queueIndex]} controls autoPlay={true} loop={true}></audio>
            <button onClick={goBack}>back</button>
            <button onClick={goForward}>forward</button>
        </div>
    )
}
export default AudioPlayer
{/* <audio src="/static/media/01. Moscow Mule.8f5a3201.mp3" controls=""></audio> */}
// http://localhost:3000/static/media/03. Me Porto Bonito.99dba593.mp3
