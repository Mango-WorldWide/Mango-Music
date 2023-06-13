const LOAD_LIKES = 'likes/LOAD_LIKES'
const CREATE_LIKE = 'likes/CREATE_LIKE'
const DELETE_LIKE = 'likes/DELETE_LIKE'

export const loadLikes = (likes) => {
    return {
        type:LOAD_LIKES,
        likes
    }
}

export const createLike = (like) => {
    return {
        type:CREATE_LIKE,
        like
    }
}

export const deleteLike = (like) => {
    return {
        type:DELETE_LIKE,
        like
    }
}
export const loadLikesThunk = () => async(dispatch) => {
    const response = await fetch('/api/likes/current')
    if (response.ok){
        const data = await response.json()
        dispatch(loadLikes(data))
    } else {
        return false
    }
}

export const createLikeThunk = (like) => async(dispatch) => {
    const response = await fetch(`/api/likes/create`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(like)
    })
    if(response.ok){
        dispatch(loadLikesThunk())
    } else {
        return false
    }
}

export const deleteLikeThunk = (likeId) => async(dispatch) => {
    const response = await fetch(`/api/likes/${likeId}`,{
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(loadLikesThunk())
    } else {
        return false
    }
}
const likesReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case LOAD_LIKES:
            newState = {}
            action.likes.Likes.forEach((like)=> {
                newState[like.id] = like;
            })
            return newState
        default:
            return state
    }
}

export default likesReducer
