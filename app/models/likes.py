from .db import db, environment, SCHEMA

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'),  nullable=False)

    likes_users_relationship = db.relationship('User', back_populates='users_likes_relationship')
    likes_songs_relationship = db.relationship('Song', back_populates='songs_likes_relationship')
