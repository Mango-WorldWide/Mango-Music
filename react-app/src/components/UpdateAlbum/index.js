import { useDispatch, useSelector } from "react-redux";
import AlbumForm from "../AlbumForm";
import { useEffect } from "react";
import { loadOneAlbumThunk } from "../../store/album";
import { useParams, useHistory } from "react-router-dom";
const UpdateAlbum = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums);
  const { albumId } = useParams();
  useEffect(async () => {
    dispatch(loadOneAlbumThunk(albumId));
  }, [dispatch]);
  if (!album["Songs"]) return null;
  const input = {
    title: album["Album"].title,
    description: album["Album"].description,
    cover: album["Album"].cover,
    genre: album["Album"].genre,
    year: album["Album"].year,
  };
  return <AlbumForm input={input} formType="Update" />;
};
export default UpdateAlbum;
