from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from app.models import Song, db
from app.forms.song_form import SongForm
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def get_songs():
    songs = Song.query.all()
    return {'Songs': [song.to_dict() for song in songs]}


# @song_routes.route('/<int:song_id>')
# def get_single_song(song_id):
#     data = Song.query.get(song_id)
#     if data:
#         single_song = data.to_dict()
#         return single_song
#     else:
#         error = make_response("Song does not exist")
#         error.status_code = 404
#         return error


@song_routes.route('/new', methods=["POST"])
def add_song():
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("----->", form.data)
        data = request.get_json()
        print(f"data 👉 {data}")
        song = data["mp3"]
        print(f"song 👉 {song}")
        # song.filename = get_unique_filename(song.filename)
        # song = form["song"].filename
        new_song = Song(
            title = data["title"],
            genre = data["genre"],
            mp3 = data["mp3"],
            artist_id = 1,
            album_id = 1
        )
        # db.session.add(new_song)
        # db.session.commit()
        return "Successfully added new playlist!"
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error

