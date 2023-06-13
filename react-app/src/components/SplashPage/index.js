import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRandomSongThunk, loadSongsThunk } from '../../store/song';
import './SplashPage.css';
import { Link, useHistory } from "react-router-dom"
// import {rock}from '../../images'
const SplashPage = () => {
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.songs));
    console.log('SONGS', songs);
    const [index, setIndex] = useState(0);
    const history = useHistory()
    const [genreIndex, setGenreIndex] = useState(0);
    const [selectedSongIndex, setSongIndex] = useState(0);


    function shuffleArray(array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }


    useEffect(() => {
        dispatch(loadRandomSongThunk());
    }, [dispatch]);

    // genre stuff.. needa find more
    const genres = [
        { name: "Reggaeton", image: "https://is4-ssl.mzstatic.com/image/thumb/Features125/v4/a7/2a/d6/a72ad6ff-1366-2979-4b9d-80030e7f6190/U0MtTVMtV1ctRXNzZW50aWFsX1JlZ2dhZXRvbi1BREFNX0lEPTEzNDc0MTE3ODgucG5n.png/305x305SC.CAESS02.webp?l=en-US" },
        { name: "Rock", image: "/Rock.png" },
        { name: "Country", image: "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/9a/72/8c/9a728cdb-cb26-5176-e594-dcefba6a82cd/9df5f4a3-d980-4fe7-963b-c35f8cc13d70.png/305x305SC.DN01.webp?l=en-US" },
        { name: "R&B", image: "/R&B.jpg" },
        { name: "Hip-Hop", image: "/HipHop.png" },
        { name: "Pop", image: "/Pop.png" },
        { name: "K-Pop", image: "/KPop.jpg" },
        { name: "EDM", image: "/EDM.png" },
        {name: 'Classical', image: 'https://is2-ssl.mzstatic.com/image/thumb/Features114/v4/91/24/1d/91241d46-7606-11ae-bcac-1039d8a90911/QkwtTVMtV1ctQ2xhc3NpY2FsLUFEQU1fSUQ9MTE0MjY1MjYxOCAoMTgpLnBuZw.png/110x110bb.webp'}
    ];

    const nextGenre = () => {
        setGenreIndex((prevIndex) => (prevIndex + 3) % genres.length);
    };

    const prevGenre = () => {
        setGenreIndex((prevIndex) => (prevIndex - 3 + genres.length) % genres.length);
    };

    // next and prev for songs
    const nextSong = () => {
        setSongIndex((prevIndex) => Math.min(prevIndex + 15, songs.length - 1));
    };

    const prevSong = () => {
        setSongIndex((prevIndex) => Math.max(prevIndex - 15, 0));
    };

    const handleGenreClick = () => {
        history.push('/search');
    };
    const shuffledSongs = shuffleArray([...songs].slice(0, 150));

    if(!songs.length || !songs[0].album_name) return null
    return (
        <div className="splash-page">
            <h2 className='splash-genre-title'>Browse Genres</h2>
            <div className="genre-carousel">
                <button classname='splash-genre-left'  onClick={prevGenre}><i class="fa-solid fa-angles-left"></i></button>
                {genres.slice(genreIndex, genreIndex + 3).map((genre) => (
                    <div className="genre-tile" key={genre.name} onClick={handleGenreClick}>
                        <img classname='splash-genre-cover' src={genre.image} alt={genre.name} />
                        <h2>{genre.name}</h2>
                    </div>
                ))}
                <button classname='splash-genre-right' onClick={nextGenre}><i class="fa-solid fa-angles-right"></i></button>
            </div>
            <div className="song-container">
            <h2 className='splash-song-list-title'>Random Songs You Might Like</h2>


  <div className="splash-song-list">

    {songs.map((song) => (

      <div className="splash-song" key={song.id}>
        <Link to={`/albums/${song.album_id}`}>
        <img className="splash-song-cover" src={song.album_cover} alt={song.title} /></Link>
        <div className="splash-song-info">
          <h4 >{song.title}</h4>
          <Link to={`/artist/${song.artist_id}`}><h5>{song.artist_name}</h5></Link>
          <h5>{song.genre}</h5>
        </div>

      </div>

    ))}

  </div>
  <p classname='splash-song-right' onClick={nextSong}><i class="fa-solid fa-angles-right"></i></p>

</div>
        </div>
    );
};

export default SplashPage;
