import { useDispatch, useSelector } from "react-redux"
import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import AlbumsIndexItem from "../AlbumsIndexItem"


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
        <section className="albumIndexItems">
            {albums.map((album) => (
                <AlbumsIndexItem
                    album={album}
                />
            ))}
        </section>
    )
}

export default AlbumsIndex
