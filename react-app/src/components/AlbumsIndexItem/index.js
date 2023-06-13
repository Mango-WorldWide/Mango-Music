import { Link } from "react-router-dom"
import './AlbumsIndexItem.css'

const AlbumsIndexItem = ({album}) =>  {
    return (
        <div className="album-item">
            <Link to={`/albums/${album.id}`}>
                <img src={album.cover} alt={album.title}/>
                <p>{album.title}</p>
            </Link>
            <Link to={`/artist/${album.artist_id}`}>
                <p>{album.artist}</p>
            </Link>
        </div>
    )

}

export default AlbumsIndexItem
