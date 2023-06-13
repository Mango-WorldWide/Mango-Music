const LOAD_ARTIST = 'artist/LOAD_ARTIST'

export const loadArtist = (artist) => {
    return {
        type:LOAD_ARTIST,
        artist
    }
}

export const loadArtistThunk = (artistId) => async(dispatch) => {
    const response = await fetch(`/api/artist/${artistId}`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadArtist(data))
    } else {
        return false
    }
}

const artistReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_ARTIST:
            newState = {}
            newState = {...action.artist}
            return newState
        default:
            return state
    }
}

export default artistReducer
