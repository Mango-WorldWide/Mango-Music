from flask import Blueprint, request
from app.models import Song, db

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def get_songs():
    songs = Song.query.all()
    return {'Songs': [song.to_dict() for song in songs]}


@song_routes.route('/<int:song_id>')
def get_single_song(song_id):
    data = Song.query.get(song_id)
    if data:
        single_song = data.to_dict()
        return single_song
    else:
        error = make_response("Song does not exist")
        error.status_code = 404
        return error
