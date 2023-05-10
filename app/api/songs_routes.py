from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from app.models import Song, User, db
from app.forms.song_form import SongForm
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def get_songs():
    songs = Song.query.all()
    return {'Songs': [song.to_dict() for song in songs]}


@song_routes.route('/<int:id>')
def get_song_by_id(id):
    song = Song.query.get(id)
    curr_id = current_user.get_id()
    print("CURR_ID.ARTIST_ID", curr_id)
    return song.to_dict(includeMP3 = True)


@song_routes.route('/new', methods=["POST"])
@login_required
def add_song():
    # only artist can add music
    artist = current_user.to_dict()
    curr = User.query.get(artist)

    if not artist['artist']:
        res =  make_response({"error": "Only artists can add songs"})
        res.status_code = 403
        return res

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
            artist_id = artist['artist_id']
        )

        db.session.add(new_song)
        db.session.commit()
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        print(form.errors)
        return "banana"


@song_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_song(id):
    song = Song.query.get(id)
    artist = current_user.to_dict()

    if not song:
        return jsonify({"error": "Song not found"}), 404

    # Check if the current user is the owner of the song
    if song.artist_id != artist['artist_id']:
        return jsonify({"error": "You are not the artist"}), 403

    # Update the song's title, genre, and album post data
    title = request.json.get('title')
    genre = request.json.get('genre')
    album = request.json.get('album')

    if title:
        song.title = title

    if genre:
        song.genre = genre

    if album:
        song.album = album

    db.session.commit()

    return jsonify(song.to_dict())


@song_routes.route('<int:id>', methods=["DELETE"])
@login_required
def delete_song(id):
    song = Song.query.get(id)
    artist = current_user.to_dict()

    if not song:
        return jsonify({"error": "Song not found"}), 404

    if song.artist_id != artist['artist_id']:
        return jsonify({"error": "You don't own this song and cannot delete it"}), 403


    db.session.delete(song)
    db.commit()

    return jsonify("Song Deleted"), 200
