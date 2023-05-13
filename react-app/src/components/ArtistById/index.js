import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { loadArtistThunk } from "../../store/artist";
import "./ArtistById.css";

const ArtistById = () => {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const artist = useSelector((state) => state.artist);
  const album = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(loadArtistThunk(artistId));
  }, [dispatch]);

  if (!artist.albums) return null;

  return (
    <div className="artist-page">
      <h1 className="artist-name">{artist.name}</h1>

      <div className="album-section">
        <h2 className="section-title">Albums</h2>
        <div className="album-list">
          {artist.albums.map((album) => (
            <Link className="albumArtistById" to={`/albums/${album.id}`}>
            <img
              key={album.id}
              className="album-cover"
              src={album.cover}
              alt={album.title}
            />
            <h2 className="albumArtistById">{album.title}</h2>
            </Link>
          ))}
          {console.log('ARTIST', album)}
        </div>
      </div>
    </div>
  );
};

export default ArtistById;
