import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Search from '../Search';
import { useSelector } from 'react-redux';

function Navigation(){
	const user = useSelector((state) => state.session.user);

	return (
		<ul className="nav-list">
			<div className="nav-list-top-wrapper">
				<li className="nav-list-item">
					<NavLink exact to="/">Home</NavLink>
				</li>
			</div>
			<div className="nav-list-bottom-wrapper">
				<li className="nav-list-item">
					<Search/>
				</li>
				<li className="nav-list-item">
					<NavLink exact to="/albums">Albums</NavLink>
				</li>
				{user && user.artist_id > 1 && (
				<li className='nav-list-item'>
				<NavLink exact to='/albums/new'>Create Album</NavLink>
				</li>
				)}
				<li className="nav-list-item">
					<NavLink exact to="/playlists">Playlists</NavLink>
				</li>

			</div>

		</ul>
	);
}

export default Navigation;
