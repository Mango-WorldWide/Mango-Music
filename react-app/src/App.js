import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import { loadLikesThunk } from "./store/like";
import Navigation from "./components/Navigation";
import AlbumsIndex from "./components/AlbumsIndex"
import AlbumById from "./components/AlbumById";
import CreateAlbum from "./components/CreateAlbum";
import PlaylistIndex from "./components/PlaylistIndex"
import UpdateAlbum from "./components/UpdateAlbum";
import AudioPlayer from "./components/AudioPlayer";
import SongForm from "./components/SongForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(loadLikesThunk())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/albums/new' component={CreateAlbum}/>
          <Route path='/albums/:albumId/edit' component={UpdateAlbum}/>
          <Route path='/albums/:albumId' component={AlbumById}/>
          <Route path='/albums' component={AlbumsIndex}/>
          <Route path='/playlists' component={PlaylistIndex}/>
          <Route path='/audio' component={AudioPlayer}/>
          <Route path='/songs/new' component={SongForm}/>
        </Switch>
      )}
    </>
  );
}

export default App;
