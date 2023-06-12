from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask import url_for
class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Float(5), nullable=True)
    mp3 = db.Column(db.String(255), nullable=False)
    lyrics = db.Column(db.Text, nullable=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('artists.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)

    songs_playlistsongs_relationship = db.relationship('Playlist_Song', back_populates='playlistsongs_songs_relationship', cascade="all, delete-orphan")
    songs_likes_relationship = db.relationship('Like', back_populates='likes_songs_relationship', cascade="all, delete-orphan")
    songs_artists_relationship = db.relationship('Artist', back_populates='artists_songs_relationship')
    songs_albums_relationship = db.relationship('Album', back_populates='albums_songs_relationship')

    def to_dict(self, includeMP3=False):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'duration': self.duration,
            'mp3': self.mp3 if includeMP3 else '',
            'lyrics': self.lyrics,
            'artist_id': self.artist_id,
            'album_id': self.album_id,
            "artist_name":self.songs_artists_relationship.to_dict_relationship()["name"],
            "cover": self.songs_albums_relationship.to_dict_relationship()["cover"],
            'artist': self.songs_artists_relationship.to_dict(),
            'album': self.songs_albums_relationship.to_dict(),
        }

    def to_dict_no_item(self, includeMP3=False):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "duration": self.duration,
            'mp3': self.mp3 if includeMP3 else '',
            "lyrics": self.lyrics,
            "artist_id": self.artist_id,
            "album_id": self.album_id,
            "album_title": self.songs_albums_relationship.to_dict_relationship()["title"],
            "artist_name":self.songs_artists_relationship.to_dict_relationship()["name"],
            "cover": self.songs_albums_relationship.to_dict_relationship()["cover"]
        }

    def to_like(self, includeMP3=False):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'duration': self.duration,
            'mp3': self.mp3 if includeMP3 else '',
            'lyrics': self.lyrics,
            'artist_id': self.artist_id,
            'album_id': self.album_id,
            'like': [like.to_dict() for like in self.songs_likes_relationship]

        }
