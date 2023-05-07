const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'

export const loadAlbums = (albums) => {
    return {
        type:LOAD_ALBUMS,
        albums
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

const albumsReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_ALBUMS:
            newState = {}
            action.albums.Albums.forEach((album)=> {
                newState[album.id] = album;
            })
            return newState
        default:
            return state
    }
}

export default albumsReducer
