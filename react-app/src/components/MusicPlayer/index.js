import ReactAudioPlayer from "react-audio-player";
import x from "../../static/Music/Bad Bunny - Un Verano Sin Ti/08. Neverita.mp3"
// import fs = require('fs')

const MusicPlayer = () => {

  // fs.readdir('./someDir', (err, files) => {
  //  files.forEach(file => {
  //   const module = import('./' + file).then(m =>
  //     m.callSomeMethod();
  //   );
  //   // or const module = await import('file')
  //   });
  // });

  return (
    <>
    <ReactAudioPlayer
      src={x}
      controls
      autoPlay={true}
      loop={true}
    />
    {/* <button onClick={goBack}>back</button>
    <button onClick={goForward}>forward</button> */}
    </>
  );
};


export default MusicPlayer
