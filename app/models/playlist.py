from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask import url_for



class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    cover = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlists_playlistsongs_relationship = db.relationship(
        "Playlist_Song", back_populates="playlistsongs_playlists_relationship", cascade="all, delete-orphan"
    )
    playlists_users_relationship = db.relationship(
        "User", back_populates="users_playlists_relationship"
    )

    def to_dict(self):
        
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "cover": self.cover,
            "songs": [song.to_dict() for song in self.playlists_playlistsongs_relationship],
            "num_songs": len(self.playlists_playlistsongs_relationship),
            "user_id": self.user_id,
        }

    def to_dict_no_item(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "cover": self.cover,
            "user_id": self.user_id,
        }