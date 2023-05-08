from flask import Blueprint, redirect, request, send_from_directory
from flask_login import login_required, current_user
from app.models import Song
from app.forms import SongForm

song_routes = Blueprint('songs', __name__)

@song_routes.route('/allSongs')
def songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/allSongs/<int:song_id>')
def singleSong():
    pass
