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
  const response = await fetch("/api/albums");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadAlbums(data));
  } else {
    return false;
  }
};

// get artist's albums
export const loadArtistAlbumsThunk = () => async (dispatch) => {
  const res = await fetch("/api/artist/albums");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAlbums({Albums: data}));
    return data
  }
};

export const loadOneAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadOneAlbum(data));
  } else {
    return false;
  }
};

export const createAlbumThunk = (album) => async (dispatch) => {
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
    return false;
  }
};

export const updateAlbumThunk = (album, albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
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
      action.albums.Albums.forEach((album) => {
        newState[album.id] = album;
      });
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
