import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Search from '../Search';
import { useSelector } from 'react-redux';

function Navigation(){
	const user = useSelector((state) => state.session.user);
	const playlists = user?.playlists;

	return (
		<ul className="nav-list">
			<div className="nav-list-top-wrapper">
				<li className="nav-list-item">
					<NavLink exact to="/" className="nav-list-item-nav-link"><img src={process.env.PUBLIC_URL + '/download.png'}/> <div>Music</div> </NavLink>
				</li>
			</div>
			<div className="nav-list-middle-wrapper">
				<li className="nav-list-item">
					<Search/>
				</li>
			</div>
			<div className="nav-list-bottom-wrapper">
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
				{playlists && playlists.map(playlist => (
					<li key={playlist.id} className="nav-list-item">
					<NavLink exact to={`/playlists/${playlist.id}`}>{playlist.title}</NavLink>
				</li>
				))}
		</ul>
	);
}

export default Navigation;
