from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist_Song(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')),  nullable=False)

    playlistsongs_songs_relationship = db.relationship('Song', back_populates='songs_playlistsongs_relationship')
    playlistsongs_playlists_relationship = db.relationship('Playlist', back_populates='playlists_playlistsongs_relationship')


    def to_dict(self):
        return {
            'id': self.id,
            "songs": self.playlistsongs_songs_relationship.to_dict()
        }
    def to_dict_no_item(self):
        return {
            'id': self.id,
            "songs": self.playlistsongs_songs_relationship.to_dict_no_item()
        }
