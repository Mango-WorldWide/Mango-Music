import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(){
	return (
		<ul className="nav-list">
			<div className="nav-list-top-wrapper">
				<li className="nav-list-item">
					<NavLink exact to="/">Home</NavLink>
				</li>
			</div>
			<div className="nav-list-bottom-wrapper">
				<li className="nav-list-item">
					<NavLink exact to="/albums">Albums</NavLink>
				</li>
				<li className="nav-list-item">
					<NavLink exact to="/playlists">Playlists</NavLink>
				</li>
				<li className="nav-list-item">
					<NavLink exact to="/audio">Audio</NavLink>
				</li>
			</div>

		</ul>
	);
}

export default Navigation;
