const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM'


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
    const response = await fetch (`/api/albums/${albumId}`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadOneAlbum(data))
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
            console.log(action.album)
        default:
            return state
    }
}

export default albumsReducer
