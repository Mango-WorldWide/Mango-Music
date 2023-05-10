import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadArtistThunk } from "../../store/artist"

const ArtistById = () => {
    const dispatch = useDispatch()
    const { artistId } = useParams()
    const artist = useSelector(state => state.artist)
    useEffect(()=>{
        dispatch(loadArtistThunk(artistId))
    },[dispatch])
    if(!artist.albums) return null
    console.log(artist.albums[0].cover)
    return(
        <div>
            <div>{artist.name}</div>
            {artist.albums.map((album)=>(
                <img src={album.cover}/>
            ))}
            {artist.songs.map((song)=>(
                <p>{song.title}</p>
            ))}
        </div>
    )
}

export default ArtistById
