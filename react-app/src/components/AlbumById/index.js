import { useDispatch, useSelector } from "react-redux"
import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import AlbumsIndexItem from "../AlbumsIndexItem"
import { useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../store/album"

const AlbumById = () =>  {
    const dispatch = useDispatch()
    const album = useSelector(state => state.albums)
    const { albumId } = useParams()
    console.log('inside album by id', albumId)
    useEffect(()=>{
        dispatch(loadOneAlbumThunk(albumId))
    },[dispatch])
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
    return(
        <div>
            <img src={album.cover} alt={album.title}/>
        </div>
    )
}

export default AlbumById
