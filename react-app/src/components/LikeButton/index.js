import { useDispatch, useSelector } from "react-redux"
import { loadLikesThunk,  deleteLikeThunk, createLikeThunk} from "../../store/like"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../store/album"

const LikeButton = ({song, isLiked}) =>  {
    const dispatch = useDispatch()
    const history = useHistory()
    const likes = useSelector(state => Object.values(state.likes))

    // const { albumId } = useParams()
    // console.log(Object.values(album),'album state checking')
    // useEffect(()=>{
    //     console.log('inside album by id', albumId)
    //     dispatch(loadOneAlbumThunk(albumId))
    // },[dispatch])
    // console.log(album.id)
    // if (!album["Songs"]) return null

    const handleClick = async (e) => {
        e.preventDefault()
        if (isLiked){
            let like = likes.filter(like=>like["song_id"] == song.id)
            like = like[0]
            await dispatch(deleteLikeThunk(like.id))
        }
        else{
            await dispatch(createLikeThunk({"song_id": song.id}))
        }

        // history.push(`/albums`)
    }
    return(
        <div>
            {isLiked && <button onClick={handleClick}>DISLIKE</button>}
            {!isLiked && <button onClick={handleClick}>LIKE</button>}
        </div>
    )
}

export default LikeButton
