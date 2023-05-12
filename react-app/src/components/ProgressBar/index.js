import "./ProgressBar.css";

const formatTime = (timeInSecs) => {
    if (timeInSecs && !isNaN(timeInSecs)) {
        const minutes = Math.floor(timeInSecs / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(timeInSecs % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
}

const ProgressBar = ({ progressBarRef, audioPlayerRef, currentTime, duration}) => {
    const handleProgressChange = () => {
        audioPlayerRef.current.currentTime = progressBarRef.current.value;
        console.log(progressBarRef.current.value)
    };

    return (
      <div className="progress">
        <span className="time current">{formatTime(currentTime)}</span>
        <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    )
}

export default ProgressBar;
