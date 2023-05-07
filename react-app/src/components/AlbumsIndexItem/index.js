import { useDispatch, useSelector } from "react-redux"
// import { loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"

const AlbumsIndexItem = ({album}) =>  {
    console.log('album index item',album.cover)
    return (
        <div>
            <img src={album.cover} alt={album.title}/>
        </div>
    )

}

export default AlbumsIndexItem
