import { useDispatch, useSelector } from "react-redux"
import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import AlbumsIndexItem from "../AlbumsIndexItem"
import './AlbumIndex.css'

const AlbumsIndex = () =>  {
    const dispatch = useDispatch()
    const getAlbums = useSelector(state => state.albums)
    const albums = Object.values(getAlbums)
    console.log('these are all the albums', albums)
    useEffect(() => {
        console.log('inside useeffect')
        dispatch(loadAlbumsThunk())
    },[dispatch])

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
