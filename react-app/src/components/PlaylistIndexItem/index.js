import { useHistory } from "react-router-dom";

const PlaylistsIndexItem = ({ playlist }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/playlists/${playlist.id}`);
  };

  return (
    <div 
    className="playlistItem"
    // data-tooltip="..."
    onClick={() => handleClick(playlist.id)}>
      <img src={playlist.cover} alt={playlist.title} />
      <p className="playlistTitle">{playlist.title}</p>
    </div>
  );
};

export default PlaylistsIndexItem;
