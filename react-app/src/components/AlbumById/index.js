import { useDispatch, useSelector } from "react-redux"
import { deleteAlbumThunk, loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import AlbumsIndexItem from "../AlbumsIndexItem"
import { useHistory, useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../store/album"

const AlbumById = () =>  {
    const dispatch = useDispatch()
    const history = useHistory()
    const album = useSelector(state => state.albums)
    const { albumId } = useParams()

    useEffect(()=>{
        console.log('inside album by id', albumId)
        dispatch(loadOneAlbumThunk(albumId))
    },[dispatch])
    console.log(album.id)
    if (!album) return null
    // return (
    //     <section className="albumIndexItems">
    //         {albums.map((album) => (
    //             <AlbumsIndexItem
    //                 album={album}
    //             />
    //         ))}
    //     </section>
    // )
    const handleClick = () => {
        dispatch(deleteAlbumThunk(albumId))
        history.push(`/albums`)
    }
    return(
        <div>
            <button onClick={handleClick}>DELETE ME</button>
            <img src={album.cover} alt={album.title}/>
        </div>
    )
}

export default AlbumById
