import { useDispatch, useSelector } from "react-redux"
import { deleteAlbumThunk, loadAlbumsThunk } from "../../store/album"
import { useEffect } from "react"
import AlbumsIndexItem from "../AlbumsIndexItem"
import PlayButton from "../PlayButton"
import { useHistory, useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../store/album"
import LikeButton from "../LikeButton"
import { usePlayer } from "../../context/PlayerContext"
import './AlbumById.css'

const AlbumById = () =>  {
    const dispatch = useDispatch()
    const {isPlaying, setIsPlaying} = usePlayer()
    const history = useHistory()
    const album = useSelector(state => state.albums)
    const likes = useSelector(state => Object.values(state.likes))
    const { albumId } = useParams()
    console.log(Object.values(album),'album state checking')
    useEffect(()=>{
        console.log('inside album by id', albumId)
        dispatch(loadOneAlbumThunk(albumId))
    },[dispatch])
    // console.log(album.id)
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
    
    // console.log(album, 'myalbums')
    return (
      <div className="album-container">
        <img className="album-cover" src={album["Album"].cover} alt={album["Album"].title} />
        <h1 className="album-title">{album["Album"].title}</h1>
        <h3 className="album-artist">{album["Album"].artist}</h3>
        <div className="song-list">
          {album["Songs"].map((song) => (
            <div className="song-item" key={song.id}>
              <div className="song-title">{song.title}</div>
              <PlayButton className="play-button" songId={song.id} albumId={albumId} />
              <LikeButton
                className="like-button"
                song={song}
                isLiked={likes.filter((like) => like["song_id"] == song.id).length > 0}
              />
            </div>
          ))}
        </div>
        <button className="update-button" onClick={handleUpdate}>
          UPDATE ME
        </button>
        <button className="delete-button" onClick={handleDelete}>
          DELETE ME
        </button>
      </div>
    );
  };

export default AlbumById
