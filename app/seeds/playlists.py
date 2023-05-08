from app.models import db, User, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        title = 'DemoUser Jammy Jams',
        description = 'Gym Music',
        cover = 'https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg',
        user_id = User.query.filter(User.username == 'DemoUser').first().id
    )
    playlist2 = Playlist(
        title = 'DemoArtist Mixed Beats',
        description = 'Coding Music',
        cover = 'https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/works-doesnt-work.jpg',
        user_id = User.query.filter(User.username == 'DemoArtist').first().id
    )

    all_playlists = [playlist1, playlist2]
    add_playlists = [db.session.add(playlist) for playlist in all_playlists]
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
