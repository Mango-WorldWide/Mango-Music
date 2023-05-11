const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM'

export const loadOneAlbum = (album) => {
    return {
        type:LOAD_ONE_ALBUM,
        album
    }
}


export const thunkLoadOneAlbumPlayer = (albumId) => async(dispatch) => {
    console.log('inside the thunk', albumId)
    const response = await fetch(`/api/albums/${albumId}`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadOneAlbum(data))
    } else {
        console.log('thunk fail ALBUMID', albumId)
        return false
    }
}



const playerReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_ONE_ALBUM:
            newState = {}
            newState = {...action.album}
            return newState
        default:
            return state
    }
}

export default playerReducer
