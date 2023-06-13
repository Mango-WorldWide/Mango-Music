import { useDispatch, useSelector } from "react-redux";
import { loadAlbumsThunk, loadArtistAlbumsThunk } from "../../store/album";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AlbumsIndexItem from "../AlbumsIndexItem";
import "./AlbumIndex.css";

const AlbumsIndex = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getAlbums = useSelector((state) => state.albums);
  const albums = Object.values(getAlbums);

  useEffect(() => {
    if (location.pathname === "/albums") dispatch(loadAlbumsThunk());
    else return dispatch(loadArtistAlbumsThunk());
  }, [dispatch, location.pathname]);

  if (!getAlbums) return null;
  return (
    <section className="albumIndex">
      {albums.map((album) => (
        <AlbumsIndexItem key={album.id} album={album} />
      ))}
      {location.pathname === "/albums/artist" ? (
        <Link to={"/albums/new"}>
          <button className="createMoreButton">
            <img alt="plus" className="plus-sign new" src="/plus.png" />
          </button>
        </Link>
      ) : null}
    </section>
  );
};

export default AlbumsIndex;
