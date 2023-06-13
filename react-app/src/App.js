import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import { loadLikesThunk } from "./store/like";
import Navigation from "./components/Navigation";
import AlbumsIndex from "./components/AlbumsIndex";
import AlbumById from "./components/AlbumById";
import CreateAlbum from "./components/CreateAlbum";
import PlaylistIndex from "./components/PlaylistIndex";
import PlaylistById from "./components/PlaylistById";
import UpdateAlbum from "./components/UpdateAlbum";
import AudioPlayer from "./components/AudioPlayer";
import DummyAudioPlayer from "./components/DummyAudioPlayer";
import SongForm from "./components/SongForm";
import NewPlaylistForm from "./components/CreatePlaylist";
import UpdatePlaylistForm from "./components/UpdatePlaylist/UpdatePlaylistForm";
import ProfileButton from "./components/Navigation/ProfileButton.js";
import SplashPage from "./components/SplashPage";
import "./index.css";
import ArtistById from "./components/ArtistById";
import SearchIndex from "./components/SearchIndex";
import MobileViewMessage from "./components/MobileMessage";
import { usePlayer } from "./context/PlayerContext";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { queue } = usePlayer();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    // console.log(user)
    if (user) {
      dispatch(loadLikesThunk());
    }
  }, [isLoaded, user, dispatch]);

  return (
    <>
      <MobileViewMessage />
      <div className="site-wrapper">
        <div className="nav-list-wrapper">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div className="site-wrapper-right">
          <div className="site-wrapper-right-top">
            <div className="audio-player-wrapper">
              {queue.length > 0 ? <AudioPlayer /> : <DummyAudioPlayer />}
              <div className="profile-button-wrapper">{isLoaded && <ProfileButton />}</div>
            </div>
          </div>
          <div className="main-component">
            {isLoaded && (
              <Switch>
                <Route path="/login">
                  <LoginFormPage />
                </Route>
                <Route path="/signup">
                  <SignupFormPage />
                </Route>
                <Route path="/artist/:artistId" component={ArtistById} />
                <Route path="/albums/new" component={CreateAlbum} />
                <Route path="/albums/:albumId/edit" component={UpdateAlbum} />
                <Route path="/albums/artist" component={AlbumsIndex} />
                <Route path="/albums/:albumId" component={AlbumById} />
                <Route path="/albums" component={AlbumsIndex} />
                <Route path="/playlists/new" component={NewPlaylistForm} />
                <Route path="/playlists/:playlistId/edit" component={UpdatePlaylistForm} />
                <Route path="/playlists/:playlistId" component={PlaylistById} />
                <Route path="/playlists" component={PlaylistIndex} />
                <Route path="/audio" component={AudioPlayer} />
                <Route path="/songs/new" component={SongForm} />
                <Route path="/search" component={SearchIndex} />
                <Route path="/" component={SplashPage}></Route>
              </Switch>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
