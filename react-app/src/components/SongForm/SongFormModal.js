function SongFormModal({ isSending }) {
  return (
    <>
      {isSending && (
        <div className="overlay">
        <div className="modal">
          <div className="modal-content">
            <h2>File is Sending</h2>
            <img src={process.env.PUBLIC_URL + '/loading.gif'}></img>
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default SongFormModal;
