const LOAD_SONGS = 'albums/LOAD_SONGS'
const ADD_SONG = 'song/ADD_SONG'

export const loadSongs = (songs) => {
    return {
        type:LOAD_SONGS,
        songs
    }
}

// export const addSong = () => {
//     return {
//         type:ADD_SONG,
//         songs
//     }
// }

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

export const addSongThunk = (song) => async(dispatch) => {
    console.log("song from thunk 👉", song)

    const res = await fetch("/api/songs/new", {
        "method" : "POST",
        "body" : song
    })
    if(res.ok){
        const data = await res.json()
        return data
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
