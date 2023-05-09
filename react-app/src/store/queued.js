const PLAY_CURRENT = 'PLAY_CURRENT'

export const playNow = (song) => (
    {
        type: PLAY_CURRENT,
        payload: song
    }
)


export const thunkPlayNow = (song) => async (dispatch) => {
    dispatch(playNow(song))
    return
}


const initialState = {
    queued: [{}]
}

const queuedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PLAY_CURRENT':
            return {
                ...state,
                queued: [{ ...action.payload}]
            }
        default:
            return state
    }
}

export default queuedReducer
