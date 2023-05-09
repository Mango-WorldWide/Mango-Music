import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(){
	return (
		<ul className="nav-list">
			<li className="nav-link">
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li className="nav-link">
				<NavLink exact to="/albums">Albums</NavLink>
			</li>
			<li className="nav-link">
				<NavLink exact to="/playlists">Playlists</NavLink>
			</li>

		</ul>
	);
}

export default Navigation;
