from .db import db, environment, SCHEMA, UniqueConstraint


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = (UniqueConstraint('title', 'artist_id', name='_title_artist_uc'),
                          {'schema': SCHEMA})
    else:
        __table_args__ = (UniqueConstraint('title', 'artist_id', name='_title_artist_uc'),)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    cover = db.Column(db.String(255), nullable=True)
    genre = db.Column(db.String(20), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)

    __table_args__ = (UniqueConstraint('title', 'artist_id', name='_title_artist_uc'),)

    albums_artists_relationship = db.relationship('Artist', back_populates='artists_albums_relationship')
    albums_songs_relationship = db.relationship('Song', back_populates='songs_albums_relationship')
