from .db import db, environment, SCHEMA

class Playlist_Song(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id= db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'),  nullable=False)

    playlistsongs_songs_relationship = db.relationship('Song', back_populates='songs_playlistsongs_relationship')
    playlistsongs_playlists_relationship = db.relationship('Playlist', back_populates='playlists_playlistsongs_relationship')


    def to_dict(self):
        return {
            "playlist_song": self.playlistsongs_songs_relationship.to_dict()
        }