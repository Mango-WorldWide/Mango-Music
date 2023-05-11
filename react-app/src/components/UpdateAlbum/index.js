import { useDispatch, useSelector } from "react-redux"
import AlbumForm from "../AlbumForm"
import { useEffect } from "react"
import { loadOneAlbumThunk } from "../../store/album"
import { useParams } from "react-router-dom"
const UpdateAlbum = () => {
    const dispatch = useDispatch()
    const album = useSelector(state => state.albums)
    const { albumId } = useParams()
    useEffect(()=>{
        dispatch(loadOneAlbumThunk(albumId))
    },[dispatch])
    if(!album["Songs"]) return null
    const input = {
        title: album["Album"].title,
        description: album["Album"].description,
        cover: album["Album"].cover,
        genre: album["Album"].genre,
        year: album["Album"].year

    }
    return (
        <AlbumForm input={input} formType="Update"/>
    )
}
export default UpdateAlbum