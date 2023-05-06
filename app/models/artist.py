from .db import db, environment, SCHEMA


class Artist(db.Model):
    __tablename__ = 'artists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    artists_users_relationship = db.relationship('User', back_populates='users_artists_relationship')
    artists_songs_relationship = db.relationship('Song', back_populates='songs_artists_relationship')
    artists_albums_relationship = db.relationship('Album', back_populates='albums_artists_relationship')
