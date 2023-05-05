from .db import db, environment, SCHEMA


class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    cover = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    playlists_playlistsongs_relationship = db.relationship('Playlist_Song', back_populates='playlistsongs_playlists_relationship')
    playlists_users_relationship = db.relationship('User', back_populates='users_playlists_relationship')
