const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM'
const CREATE_ALBUM = 'albums/CREATE_ALBUM'
const DELETE_ALBUM = 'albums/DELETE_ALBUM'

export const loadAlbums = (albums) => {
    return {
        type:LOAD_ALBUMS,
        albums
    }
}

export const loadOneAlbum = (album) => {
    return {
        type:LOAD_ONE_ALBUM,
        album
    }
}

export const createAlbum = (album) => {
    return {
        type:CREATE_ALBUM,
        album
    }
}

export const deleteAlbum = (album) => {
    return {
        type:DELETE_ALBUM,
        album
    }
}
export const loadAlbumsThunk = () => async(dispatch) => {
    console.log('inside load albums thunk')
    const response = await fetch('/api/albums')
    console.log('response inside load albums thunk', response)
    if (response.ok){
        console.log('load albums thunk response is ok')
        const data = await response.json()
        dispatch(loadAlbums(data))
    } else {
        console.log('load albums thunk response not ok')
        return false
    }
}

export const loadOneAlbumThunk = (albumId) => async(dispatch) => {
    console.log('inside the albulm thunk', albumId)
    const response = await fetch(`/api/albums/${albumId}`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadOneAlbum(data))
    } else {
        console.log(response,'thunk fail')
        return false
    }
}

export const createAlbumThunk = (album) => async(dispatch) => {
    console.log('inside the thunk', album)
    const response = await fetch(`/api/albums`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(album)
    })
}

export const updateAlbumThunk = (album, albumId) => async(dispatch) => {
    console.log('inside update thunk', album)
    const response = await fetch(`/api/albums/${albumId}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(album)
    })
}

export const deleteAlbumThunk = (albumId) => async(dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`,{
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(loadAlbumsThunk())
    } else {
        return false
    }
}
const albumsReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_ALBUMS:
            newState = {}
            action.albums.Albums.forEach((album)=> {
                newState[album.id] = album;
            })
            return newState
        case LOAD_ONE_ALBUM:
            newState = {}
            newState = {...action.album}
            return newState
        default:
            return state
    }
}

export default albumsReducer
