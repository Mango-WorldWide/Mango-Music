import { useDispatch, useSelector } from "react-redux"
// import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import './AlbumsIndexItem.css'
const AlbumsIndexItem = ({album}) =>  {
    console.log('album index item',album.cover)
    return (
        <div className="album-item">
            <Link to={`/albums/${album.id}`}>
                <img src={album.cover} alt={album.title}/>
            </Link>
            <p>{album.title}</p>
        </div>
    )

}

export default AlbumsIndexItem
