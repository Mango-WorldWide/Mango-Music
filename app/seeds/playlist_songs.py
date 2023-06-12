from app.models import db, Playlist_Song, environment, SCHEMA
from sqlalchemy.sql import text

# from app import app
# from flask.cli import with_appcontext


def playlist_songs_data():
    return [
        # playlist 1
        {
            "playlist_id": 1,
            "song_id": 1
        },
        {
            "playlist_id": 1,
            "song_id": 20
        },
        {
            "playlist_id": 1,
            "song_id": 50
        },
        {
            "playlist_id": 1,
            "song_id": 15
        },
        {
            "playlist_id": 1,
            "song_id": 99
        },
        {
            "playlist_id": 1,
            "song_id": 62
        },
        {
            "playlist_id": 1,
            "song_id": 80
        },
        {
            "playlist_id": 1,
            "song_id": 90
        },
        {
            "playlist_id": 1,
            "song_id": 44
        },
        # playlist 2
        {
            "playlist_id": 2,
            "song_id": 5
        },
        {
            "playlist_id": 2,
            "song_id": 7
        },
        {
            "playlist_id": 2,
            "song_id": 10
        },
        {
            "playlist_id": 2,
            "song_id": 100
        },
        {
            "playlist_id": 2,
            "song_id": 99
        },
        {
            "playlist_id": 2,
            "song_id": 58
        },
        {
            "playlist_id": 2,
            "song_id": 69
        },
        {
            "playlist_id": 2,
            "song_id": 68
        },
        {
            "playlist_id": 2,
            "song_id": 88
        },
    ]


# @with_appcontext
def seed_playlist_songs(app):
    with app.app_context():
        for data in playlist_songs_data():
            playlist_song = Playlist_Song(**data)
            db.session.add(playlist_song)

        db.session.commit()


# @with_appcontext
def undo_playlist_songs(app):
    with app.app_context():
        if environment == "production":
            db.session.execute(
                f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;"
            )
        else:
            db.session.execute(text("DELETE FROM playlist_songs"))

        db.session.commit()
