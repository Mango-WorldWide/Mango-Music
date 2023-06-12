import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import Search from "../Search";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const playlists = user?.playlists;

  return (
    <div className="nav-sidebar">
      <div className="nav-list">
        <div className="nav-list-top-wrapper">
          <div className="nav-list-item">
            <NavLink exact to="/" className="nav-list-item-nav-link">
              <img src={process.env.PUBLIC_URL + "/download.png"} /> <div>Music</div>{" "}
            </NavLink>
          </div>
        </div>
        <div className="nav-list-middle-wrapper">
          <div className="nav-list-item">
            <Search />
          </div>
        </div>
        <div className="nav-list-bottom-wrapper">
          <div className="nav-list-item">
            <i className="fas fa-record-vinyl" style={{ color: "rgba(238, 238, 238, 1)" }}></i>
            <NavLink exact to="/albums">
              Albums
            </NavLink>
          </div>
          {user && user.artist_id > 1 && (
            <>
              <div className="nav-list-item">
                <i className="fas fa-plus-square" style={{ color: "rgba(238, 238, 238, 1)" }}></i>
                <NavLink exact to="/albums/new">
                  Create Album
                </NavLink>
              </div>
              <div className="nav-list-item">
                <i className="fas fa-th" style={{ color: "rgba(238, 238, 238, 1)" }}></i>
                <NavLink exact to="/albums/artist">
                  My Albums
                </NavLink>
              </div>
            </>
          )}
        </div>
        <div
          className={!user ? "nav-list-playlist-wrapper without-user" : "nav-list-playlist-wrapper"}
        >
          <div className="nav-list-item">
            <i className="fas fa-th" style={{ color: "rgba(238, 238, 238, 1)" }}></i>
            <NavLink exact to="/playlists">
              My Playlists
            </NavLink>
          </div>
          {playlists &&
            playlists.map((playlist) => (
              <div key={playlist.id} className="nav-list-item">
                <i className="fas fa-music" style={{ color: "rgba(238, 238, 238, 1)" }}></i>
                <NavLink exact to={`/playlists/${playlist.id}`}>
                  {playlist.title}
                </NavLink>
              </div>
            ))}
        </div>
      </div>
      <div className="nav-list-creators">
        <div className="nav-list-mangoes">
          <div className="nav-list-mango-member">
            <div className="mango-member-name">
              <p>Alan</p>
              <p>Echenique</p>
            </div>
            <div className="nav-list-profile-links">
              <a href="https://github.com/Alancittoo" target="_blank">
                <i class="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/alan-echenique" target="_blank">
                <i class="fa-brands fa-linkedin" />
              </a>
              <a href="https://wellfound.com/u/alan-echenique-1" target="_blank">
                <i class="fa-brands fa-angellist" />
              </a>
            </div>
          </div>
          <div className="vertical-rule" />
          <div className="nav-list-mango-member">
            <div className="mango-member-name">
              <p>Alan</p>
              <p>Nguyen</p>
            </div>
            <div className="nav-list-profile-links">
              <a href="https://github.com/Alan-Ngn" target="_blank">
                <i class="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/alannguyen21" target="_blank">
                <i class="fa-brands fa-linkedin" />
              </a>
              <a href="https://wellfound.com/u/alan-nguyen-31" target="_blank">
                <i class="fa-brands fa-angellist" />
              </a>
            </div>
          </div>
          <div className="vertical-rule" />
          <div className="nav-list-mango-member">
            <div className="mango-member-name">
              <p>Dorian</p>
              <p>Macias</p>
            </div>
            <div className="nav-list-profile-links">
              <a href="https://github.com/dorianinc" target="_blank">
                <i class="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/dorian-macias" target="_blank">
                <i class="fa-brands fa-linkedin" />
              </a>
              <a href="https://wellfound.com/u/dorian-macias" target="_blank">
                <i class="fa-brands fa-angellist" />
              </a>
            </div>
          </div>
          <div className="vertical-rule" />
          <div className="nav-list-mango-member">
            <div className="mango-member-name">
              <p>Kevin</p>
              <p>Mejia</p>
            </div>
            <div className="nav-list-profile-links">
              <a href="https://github.com/Nemurs" target="_blank">
                <i class="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/kevin-octavio-mejia" target="_blank">
                <i class="fa-brands fa-linkedin" />
              </a>
              <a href="https://wellfound.com/u/kevin-mejia-13" target="_blank">
                <i class="fa-brands fa-angellist" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
