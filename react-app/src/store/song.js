const LOAD_SONGS = 'albums/LOAD_SONGS'

export const loadSongs = (songs) => {
    return {
        type:LOAD_SONGS,
        songs
    }
}

export const loadSongsThunk = () => async(dispatch) => {
    console.log('inside songs thunk')
    const response = await fetch('/api/songs')
    if(response.ok){
        const data = await response.json()
        dispatch(loadSongs(data))
    } else {
        return false
    }
}

const songsReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_SONGS:
            newState = {}
            action.songs.Songs.forEach((song)=> {
                newState[song.id] = song;
            })
            return newState
        default:
            return state
    }
}

export default songsReducer
