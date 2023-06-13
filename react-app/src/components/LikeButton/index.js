import { useDispatch, useSelector } from "react-redux";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";

const LikeButton = ({ song, isLiked }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => Object.values(state.likes));

  const handleClick = async (e) => {
    e.preventDefault();
    if (isLiked) {
      let like = likes.filter((like) => like["song_id"] === song.id);
      like = like[0];
      await dispatch(deleteLikeThunk(like.id));
    } else {
      await dispatch(createLikeThunk({ song_id: song.id }));
    }
  };
  return (
    <div>
      {isLiked && <button onClick={handleClick}>DISLIKE</button>}
      {!isLiked && <button onClick={handleClick}>LIKE</button>}
    </div>
  );
};

export default LikeButton;
