import { useHistory } from "react-router-dom";
import { authenticate } from "./session";

////////////// Action Creators ///////////////
export const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
export const GET_SINGLE_PLAYLIST = "playlists/GET_SINGLE_PLAYLIST";
export const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
export const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";
export const CLEAR_PLAYLISTS = "playlists/CLEAR_PLAYLISTS";

///////////// Action Creators ///////////////

// get all playlists
export const getPlaylists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists,
});
// get single playlist
export const getSinglePlaylist = (playlist) => ({
  type: GET_SINGLE_PLAYLIST,
  playlist,
});

// update single playlist
export const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
  playlist,
});

//// delete single playlist
export const deletePlaylist = (playlistId) => ({
  type: DELETE_PLAYLIST,
  playlistId,
});

// clear playlists state
export const clearPlaylists = () => ({
  type: CLEAR_PLAYLISTS,
});

/////////////////// Thunks ///////////////////

// get all playlists
export const getPlaylistsThunk = () => async (dispatch) => {
  const res = await fetch("/api/playlists");
  if (res.ok) {
    const data = await res.json();
    console.log("getPlaylistThunk data 👉", data)
    dispatch(getPlaylists(data));
    return data;
  }
};

// get user's playlists
export const getUserPlaylistsThunk = () => async (dispatch) => {
  const res = await fetch("/api/playlists/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(getPlaylists(data));
    return data
  }
};

// get playlist details of single playlist
export const getSinglePlaylistThunk = (playlistId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}`);
  if (res.ok) {
    const data = await res.json();
    console.log("getSinglePlaylistThunk 👉", data)
    dispatch(getSinglePlaylist(data));
    return data;
  }
};

// post a playlist
export const createPlaylistThunk = (playlist) => async (dispatch) => {
  const res = await fetch("/api/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  });
  if (res.ok) {
    const data = await res.json();
    console.log("createPlaylistThunk 👉", data)
    return data;
  }
};

// update a playlist
export const updatePlaylistThunk = (playlist, playlistEdits) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlistEdits),
  });
  if (res.ok) {
    const data = await res.json();
    console.log("updatePlaylistThunk 👉", data)
    return data;
  }
};

// delete a playlist
export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    console.log("👉 successful in deletePlaylistThunk")
    dispatch(getUserPlaylistsThunk());
  }
};

export const addSongPlaylist = (playlist) => async(dispatch) => {
  console.log(playlist.playlist_id,' we in the add song playlist')
  const playlistId = playlist.playlist_id
  const history = useHistory()
  const response = await fetch(`/api/playlists/${playlistId}/song`,{
      method:"POST",
      headers: {
        "Content-Type": 'application/json'
      },
    body: JSON.stringify(playlist)
  })
  if (response.ok){
    console.log('add song playlist worked!!!!!!')
  }
}
const playlistsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PLAYLISTS:
      newState = {};
      console.log(" action.playlists 👉👉👉👉",  action.playlists)
      action.playlists.forEach((playlist) => {
        newState[playlist.id] = playlist;
      });
      return newState;
    case GET_SINGLE_PLAYLIST:
      newState = {}
      newState = {...action.playlist}
      return newState
    case CLEAR_PLAYLISTS:
      return {};
    default:
      return state;
  }
};

export default playlistsReducer;
