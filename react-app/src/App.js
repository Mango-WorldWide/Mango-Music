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
import ProfileButton from "./components/Navigation/ProfileButton.js";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(loadLikesThunk())
  }, [dispatch]);

  return (
    <>
      <div className="site-wrapper">
        <div className="nav-list-wrapper">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div className="site-wrapper-right">
          <div className="site-wrapper-right-top">
            <div className="audio-player-wrapper">
              <button>TODO: Replace with audio player component</button>
            </div>
            <div className="profile-button-wrapper">
              {isLoaded && (
                <ProfileButton />
              )}
            </div>
          </div>
          <div className="main-component">
            {isLoaded && (
              <Switch>
                <Route path="/login" >
                  <LoginFormPage />
                </Route>
                <Route path="/signup">
                  <SignupFormPage />
                </Route>
                <Route path='/albums/new' component={CreateAlbum} />
                <Route path='/albums/:albumId/edit' component={UpdateAlbum} />
                <Route path='/albums/:albumId' component={AlbumById} />
                <Route path='/albums' component={AlbumsIndex} />
                <Route path='/playlists' component={PlaylistIndex} />
                <Route path='/audio' component={AudioPlayer}/>
                <Route path='/songs/new' component={SongForm}/>
                <Route path='/'>
                  <h1>Welcome to Mango Music</h1>
                </Route>
        </Switch>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
