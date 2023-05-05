from .db import db, environment, SCHEMA

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    mp3 = db.Column(db.String(255), nullable=False)
    lyrics = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)

    songs_playlistsongs_relationship = db.relationship('Playlist_Song', back_populates='playlistsongs_songs_relationship')
    songs_likes_relationship = db.relationship('Like', back_populates='likes_songs_relationship')
    songs_artists_relationship = db.relationship('Artist', back_populates='artists_songs_relationship')
    songs_albums_relationship = db.relationship('Album', back_populates='albums_songs_relationship')
