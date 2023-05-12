import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import albumsReducer from './album';
import playlistsReducer from './playlist';
import likesReducer from './like';
import songsReducer from './song';
import artistReducer from './artist';
import playerReducer from './player';

const rootReducer = combineReducers({
  session,
  albums: albumsReducer,
  playlists: playlistsReducer,
  likes: likesReducer,
  songs: songsReducer,
  artist: artistReducer,
  player: playerReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
