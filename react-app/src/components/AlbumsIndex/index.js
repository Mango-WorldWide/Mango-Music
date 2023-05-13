import { useDispatch, useSelector } from "react-redux"
import { loadAlbumsThunk, loadArtistAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import { useLocation } from 'react-router-dom'
import AlbumsIndexItem from "../AlbumsIndexItem"
import './AlbumIndex.css'

const AlbumsIndex = () =>  {
    const dispatch = useDispatch()
    const location = useLocation()
    const getAlbums = useSelector(state => state.albums)
    const albums = Object.values(getAlbums)

    console.log('these are all the albums', albums)
    useEffect(() => {
        
        if(location.pathname === "/albums") dispatch(loadAlbumsThunk()) 
        else return dispatch(loadArtistAlbumsThunk())
    },[dispatch, location.pathname])

    if (!getAlbums) return null
    return (
        <section className="albumIndex">
            {albums.map((album) => (
                <AlbumsIndexItem
                    key={album.id} album={album}
                />
            ))}
        </section>
    )
}

export default AlbumsIndex
