const LOAD_ONE_ALBUM_PLAYER = 'albums/LOAD_ONE_ALBUM_PLAYER'

export const loadOneAlbumPlayer = (album) => {
    return {
        type:LOAD_ONE_ALBUM_PLAYER,
        album
    }
}


export const thunkLoadOneAlbumPlayer = (albumId) => async(dispatch) => {
    // console.log('inside the thunk the player thunk', albumId)
    const response = await fetch(`/api/albums/${albumId}`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadOneAlbumPlayer(data))
    } else {
        // console.log('thunk fail ALBUMID', albumId)
        return false
    }
}



const playerReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_ONE_ALBUM_PLAYER:
            newState = {}
            newState = {...action.album}
            return newState
        default:
            return state
    }
}

export default playerReducer
