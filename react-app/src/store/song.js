// VARIABLE HERE

const ALL_SONGS = 'ALL_SONGS'

// ACTIONS HERE

export const allSongsAction = (songs) => {
    return {
        type: ALL_SONGS, songs
    }
}

const normalizeAllSongs = (songs) => {
    let normalize = {};
    songs.forEach(song => {
      normalize[song.id] = song;
    })
    return normalize;
  }



// THUNKS HERE

export const thunkAllSongs = () => async (dispatch) => {
    const res = await fetch('/api/songs/allSongs')

    if (res.ok) {
        const allSongs = await res.json()
        const normalized = normalizeAllSongs(allSongs.songs);
        dispatch(allSongsAction(allSongs))
        return
    }

}


const initialState = {
    allSongs: {}
}

const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SONGS:
            return { ...state, allSongs: { ...action.songs}}
        default: return { ...state}
    }
}



export default songsReducer;
