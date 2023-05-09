from flask import Blueprint, redirect, request, send_from_directory,jsonify
from flask_login import login_required, current_user
from app.models import Song
import os
# from app.forms import SongForm

song_routes = Blueprint('songs', __name__)

@song_routes.route('/allSongs')
def songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/<int:song_id>')
def singleSong(song_id):
    song = Song.query.get(song_id)
    if song:
        return jsonify(song.to_dict())
    else:
        return {"error": "Song not found"}, 404


@song_routes.route('/mp3/<path:path>')
def serve_mp3(path):
    return send_from_directory('static', path)
