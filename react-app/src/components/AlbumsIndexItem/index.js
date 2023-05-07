import { useDispatch, useSelector } from "react-redux"
// import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const AlbumsIndexItem = ({album}) =>  {
    console.log('album index item',album.cover)
    return (
        <div>
            <Link to={`/albums/${album.id}`}>
                <img src={album.cover} alt={album.title}/>
            </Link>
        </div>
    )

}

export default AlbumsIndexItem
