import { useState } from 'react';
import './DummyAudioPlayerIndex.css';

const DummyAudioPlayer = () => {
  const [isPlaying ] = useState(false);

  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <button
          disabled
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '10px',
            cursor: isPlaying ? 'pointer' : 'not-allowed',
          }}
          className="audio-player-shuffle disabled-mouse"
        >
          <i className="fa-solid fa-shuffle" style={{ color: 'rgba(238, 238, 238, 0.2)', cursor: "not-allowed" }}></i>
        </button>
        <button
          disabled
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '10px',
            cursor: isPlaying ? 'pointer' : 'not-allowed',
          }}
          className="audio-player-back disabled-mouse"
        >
          <i className="fa-solid fa-backward" style={{ color: 'rgba(238, 238, 238, 0.2)', cursor: "not-allowed" }}></i>
        </button>
        <button
          disabled
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '10px',
            cursor: isPlaying ? 'pointer' : 'not-allowed',
          }}
          className="audio-player-play-pause disabled-mouse"
        >
          <i className="fa fa-play" aria-hidden="true" style={{ color: 'rgba(238, 238, 238, 0.2)', cursor: "not-allowed" }}></i>
        </button>
        <button
          disabled
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '10px',
            cursor: isPlaying ? 'pointer' : 'not-allowed',
          }}
          className="audio-player-forward disabled-mouse"
        >
          <i className="fa-solid fa-forward" style={{ color: 'rgba(238, 238, 238, 0.2)', cursor: "not-allowed" }}></i>
        </button>
        <button
          disabled
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '10px',
            cursor: isPlaying ? 'pointer' : 'not-allowed',
          }}
          className="audio-player-loop disabled-mouse"
        >
          <i className="fa-solid fa-repeat" style={{ color: 'rgba(238, 238, 238, 0.2)', cursor: "not-allowed" }}></i>
        </button>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img
            className="musicCover audio-player-img"
            src={process.env.PUBLIC_URL + '/mango-holder.gif'}
            alt="mango icon"
          />
          <div className="audio-player-text">
            <h3 className="title">Mango Music</h3>
            <p className="subTitle">By Dorian, Kevin, Alan N., Alan E.</p>
          </div>
        </div>
      </div>
      <div className="audio-player-volume-controls">
        <p className="audio-player-mute-button">
          <i className="fa-solid fa-volume-high" style={{ color: 'rgba(238, 238, 238, 0.2)' }}></i>
        </p>
        <input type="range" min={0} max={100} value={50} readOnly className="dummy-volume-bar" />
      </div>
    </div>
  );
};

export default DummyAudioPlayer;
