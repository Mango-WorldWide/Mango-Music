from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask import url_for

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Float(5), nullable=False)
    mp3 = db.Column(db.String(255), nullable=False)
    lyrics = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('artists.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)

    songs_playlistsongs_relationship = db.relationship('Playlist_Song', back_populates='playlistsongs_songs_relationship')
    songs_likes_relationship = db.relationship('Like', back_populates='likes_songs_relationship')
    songs_artists_relationship = db.relationship('Artist', back_populates='artists_songs_relationship')
    songs_albums_relationship = db.relationship('Album', back_populates='albums_songs_relationship')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'duration': self.duration,
            'mp3': url_for('static/music', filename = self.mp3),
            'lyrics': self.lyrics,
            'artist': self.songs_artists_relationship.to_dict(),  # Include artist data
            'album': self.songs_albums_relationship.to_dict(),    # Include album data
        }

    def to_dict_no_item(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "duration": self.duration,
            "mp3": self.mp3,
            "lyrics": self.lyrics,
            "artist_id": self.artist_id,
            "album_id": self.album_id
        }
