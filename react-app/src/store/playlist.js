const LOAD_PLAYLISTS = 'playlists/LOAD_PLAYLISTS'
const LOAD_ONE_PLAYLIST = 'playlists/LOAD_ONE_PLAYLIST'
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST'
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'

export const loadPlaylists = (playlists) => {
    return {
        type:LOAD_PLAYLISTS,
        playlists
    }
}

export const loadOnePlaylist = (playlist) => {
    return {
        type:LOAD_ONE_PLAYLIST,
        playlist
    }
}

export const createPlaylist = (playlist) => {
    return {
        type:CREATE_PLAYLIST,
        playlist
    }
}

export const deletePlaylist = (playlist) => {
    return {
        type:DELETE_PLAYLIST,
        playlist
    }
}
export const loadPlaylistsThunk = () => async(dispatch) => {
    const response = await fetch('/api/playlists')
    if (response.ok){
        const data = await response.json()
        dispatch(loadPlaylists(data))
    } else {
        return false
    }
}

export const loadOnePlaylistThunk = (playlistId) => async(dispatch) => {
    console.log('inside the thunk', playlistId)
    const response = await fetch(`/api/playlists/${playlistId}`)
    if (response.ok){
        const data = await response.json()
        dispatch(loadOnePlaylist(data))
    } else {
        console.log(response,'thunk fail')
        return false
    }
}

export const createPlaylistThunk = (playlist) => async(dispatch) => {
    console.log('inside the thunk', playlist)
    const response = await fetch(`/api/playlists`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(playlist)
    })
}

export const deletePlaylistThunk = (playlistId) => async(dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`,{
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(loadPlaylistsThunk())
    } else {
        return false
    }
}
const playlistsReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_PLAYLISTS:
            newState = {}
            action.playlists.forEach((playlist)=> {
                newState[playlist.id] = playlist;
            })
            return newState
        case LOAD_ONE_PLAYLIST:
            newState = {}
            newState = {...action.playlist}
            console.log(action.playlist,'inside the reducer')
            return newState
        default:
            return state
    }
}

export default playlistsReducer
