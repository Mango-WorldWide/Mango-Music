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


@song_routes.route('/new', methods=["POST"])
def add_song():
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        
        song = form.data["mp3"]
        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)
        
        if "url" not in upload:
            return upload["errors"]

        new_song = Song(
            title = form.data["title"],
            genre = form.data["genre"],
            mp3 = upload["url"],
            album_id = 1,
            artist_id = 1
        )
        
        db.session.add(new_song)
        db.session.commit()
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        print(form.errors)
        return "banana"

