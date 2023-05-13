const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
const LOAD_ONE_ALBUM = "albums/LOAD_ONE_ALBUM";
const CREATE_ALBUM = "albums/CREATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

export const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums,
  };
};

export const loadOneAlbum = (album) => {
  return {
    type: LOAD_ONE_ALBUM,
    album,
  };
};

export const createAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    album,
  };
};

export const deleteAlbum = (album) => {
  return {
    type: DELETE_ALBUM,
    album,
  };
};
export const loadAlbumsThunk = () => async (dispatch) => {
  console.log("inside load albums thunk");
  const response = await fetch("/api/albums");
  console.log("response inside load albums thunk", response);
  if (response.ok) {
    console.log("load albums thunk response is ok");
    const data = await response.json();
    dispatch(loadAlbums(data));
  } else {
    console.log("load albums thunk response not ok");
    return false;
  }
};

// get artist's albums
export const loadArtistAlbumsThunk = () => async (dispatch) => {
  const res = await fetch("/api/artist/albums");
  if (res.ok) {
    const data = await res.json();
    console.log("data 👉👉👉", data)
    dispatch(loadAlbums({Albums: data}));
    return data
  }
};

export const loadOneAlbumThunk = (albumId) => async (dispatch) => {
  console.log("LOADING SINGLE ALBUM", albumId);
  const response = await fetch(`/api/albums/${albumId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadOneAlbum(data));
  } else {
    console.log(response, "thunk fail");
    return false;
  }
};

export const createAlbumThunk = (album) => async (dispatch) => {
  console.log("inside the thunk", album);
  const response = await fetch(`/api/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createAlbum(data));
    return data;
  } else {
    console.log(response, "thunk fail");
    return false;
  }
};

export const updateAlbumThunk = (album, albumId) => async (dispatch) => {
  console.log("inside update thunk", album);
  const response = await fetch(`/api/albums/${albumId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  console.log(" after fetch")
  if (response.ok) {
    const data = await response.json();
    console.log("thunk passed 👉", data)
    return data;
  } else {
    console.log(response, "thunk fail");
    return false;
  }
};

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(loadAlbumsThunk());
  } else {
    return false;
  }
};
const albumsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALBUMS:
      newState = {};
      console.log("action.albums 👾👾👾👉", action.albums)
      action.albums.Albums.forEach((album) => {
        newState[album.id] = album;
      });
      console.log("newState 👉👾👾👾", newState)
      return newState;
    case LOAD_ONE_ALBUM:
      newState = {};
      newState = { ...action.album };
      return newState;
    default:
      return state;
  }
};

export default albumsReducer;
