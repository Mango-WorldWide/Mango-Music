import { useDispatch, useSelector } from "react-redux"
// import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import './AlbumsIndexItem.css'
const AlbumsIndexItem = ({album}) =>  {
    // console.log('album index item',album.cover)
    return (
        <div className="album-item">
            <Link to={`/albums/${album.id}`}>
                <img src={album.cover} alt={album.title}/>
                <p>{album.title}</p>
            </Link>
            {/* {console.log(album.artist_id)} */}
            <Link to={`/artist/${album.artist_id}`}>
                <p>{album.artist}</p>
            </Link>
        </div>
    )

}

export default AlbumsIndexItem
