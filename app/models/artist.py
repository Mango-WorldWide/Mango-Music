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


    def to_dict(self):
        return {
        'id': self.id,
        'name': self.name,
        'albums': [album.to_dict_relationship() for album in self.artists_albums_relationship],
        'songs': [song.to_dict_no_item() for song in self.artists_songs_relationship]
    }

    def to_dict_relationship(self):
        return {
            'name': self.name
    }
