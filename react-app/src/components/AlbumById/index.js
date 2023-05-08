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
    console.log(Object.values(album),'album state checking')
    useEffect(()=>{
        console.log('inside album by id', albumId)
        dispatch(loadOneAlbumThunk(albumId))
    },[dispatch])
    console.log(album.id)
    if (!album["Songs"]) return null
    // return (
        //     <section className="albumIndexItems">
        //         {albums.map((album) => (
            //             <AlbumsIndexItem
            //                 album={album}
            //             />
            //         ))}
            //     </section>
            // )

    const handleDelete = () => {
        dispatch(deleteAlbumThunk(albumId))
        history.push(`/albums`)
    }
    const handleUpdate = () => {
        history.push(`/albums/${albumId}/edit`)
    }
    console.log(album, 'myalbums')
    return(
        <div>
            <button onClick={handleUpdate} >UPDATE ME</button>
            <button onClick={handleDelete}>DELETE ME</button>
            <img src={album["Album"].cover} alt={album["Album"].title}/>
            {album["Songs"].map((song)=>(
                <div>{song.title}</div>
            ))}
        </div>
    )
}

export default AlbumById
