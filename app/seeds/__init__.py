from flask.cli import AppGroup
from .users import seed_users, undo_users
from .artists import seed_artists, undo_artists
from .albums import seed_albums, undo_albums
from .songs import seed_songs, undo_songs
from .playlists import seed_playlists, undo_playlists
from app.models.db import db, environment, SCHEMA
# from app import app

def create_seed_commands(app):
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
    seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
    @seed_commands.command('all')
    def seed():
    # with app.app_context():
            if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
                undo_songs()
                undo_playlists()
                undo_albums()
                undo_users()
                undo_artists()
            seed_artists()
            seed_users()
            seed_albums()
            seed_songs(app)
    seed_playlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
    @seed_commands.command('undo')
    def undo():
    # with app.app_context():
            undo_songs()
            undo_playlists()
            undo_albums()
            undo_users()
            undo_artists()
    # Add other undo functions here
    return seed_commands
# pipenv run flask db init
# pipenv run flask db migrate
# pipenv run flask db upgrade
# pipenv run flask seed all

# pipenv run flask seed undo
