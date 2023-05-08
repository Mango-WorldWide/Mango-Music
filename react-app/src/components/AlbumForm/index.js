import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAlbumThunk } from "../../store/album"

const AlbumForm = ({input, formType}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log(user.artist_id)
    const [title, setTitle] = useState(input.title)
    const [description, setDescription] = useState(input.description)
    const [cover, setCover] = useState(input.cover)
    const [genre, setGenre] = useState(input.genre)
    const [year, setYear] = useState(input.year)

    const [albumPayload, setAlbumPayload] = useState({})
    const albumObj = {}

    const updateTitle = (e) => setTitle(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updateCover = (e) => setCover(e.target.value)
    const updateGenre = (e) => setGenre(e.target.value)
    const updateYear = (e) => setYear(e.target.value)

    useEffect(()=>{
        albumObj.title = title
        albumObj.description = description
        albumObj.cover = cover
        albumObj.genre = genre
        albumObj.year = year
        albumObj.artist_id = user.artist_id

        setAlbumPayload(albumObj)
    },[title, description, cover, genre, year])



    const handleSubmit = (e) => {
        if(formType === 'Create'){
            dispatch(createAlbumThunk(albumPayload))
        }
        if(formType === 'Update'){
            dispatch()
        }
    }
    return(
        <form className="create-update-form" onSubmit={handleSubmit}>
            <input
                name = "title"
                id = "title"
                type = "text"
                placeholder="Title"
                value={title}
                onChange={updateTitle}
            />

            <textarea
                name = "description"
                id = "description"
                type = "text"
                placeholder="description"
                value={description}
                onChange={updateDescription}
            />

            <input
                name = "cover"
                id = "cover"
                type = "text"
                placeholder="cover"
                value={cover}
                onChange={updateCover}
            />
            <input
                name = "genre"
                id = "genre"
                type = "text"
                placeholder="genre"
                value={genre}
                onChange={updateGenre}
            />
            <input
                name = "year"
                id = "year"
                type = "text"
                placeholder="year"
                value={year}
                onChange={updateYear}
            />

            <button type="submit">Create Album</button>

        </form>
    )
}

export default AlbumForm
