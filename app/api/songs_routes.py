from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from app.models import Song, User, db, Playlist_Song
from app.forms.song_form import SongForm
from ..api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
import os

song_routes = Blueprint('songs', __name__)
#---------------------------------------------------------------------#
def write_file(data):
    file_path = "app/seeds/songs_seeds.txt"
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "a") as file:
            file.write(str(data) + ",\n")
        print("😺😺😺, File written successfully")
        return "File written successfully"
    except Exception as e:
        print("😿😿😿", str(e))
        return f"Error writing file: {str(e)}"
#---------------------------------------------------------------------#

@song_routes.route('/')
def get_songs():
    songs = Song.query.all()
    return {'Songs': [song.to_dict() for song in songs]}


@song_routes.route('/<int:songId>')
def get_song_by_id(songId):
    print("SONGID ----------------", songId)

    # song = Song.query.get(id)
    song = Song.query.get(songId)
    # return song.to_dict(includeMP3 = True)
    return song.to_dict_no_item(includeMP3 = True)


@song_routes.route("/new", methods=["POST"])
@login_required
def add_song():
    # only artist can add music
    artist = current_user.to_dict()
    # curr = User.query.get(artist)

    if not artist["artist"]:
        res = make_response({"error": "Only artists can add songs"})
        res.status_code = 403
        return res
    print("WHEREERERE ADD SONG BACKEND")
    form = SongForm()
    print("this is after form")
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("form validated?")
        song = form.data["mp3"]
        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)

        if "url" not in upload:
            return upload["errors"]

        new_song = Song(
            title=form.data["title"],
            genre=form.data["genre"],
            mp3=upload["url"],
            album_id=form.data["album_id"],
            artist_id=artist["artist_id"],
        )

        db.session.add(new_song)
        db.session.commit()

        ## Leave this commented out unless adding songs to the songs_seeds.txt
        #-------------------------------------------------------------------#
        if "id" in new_song.to_dict():
            song_to_fs = {
                "title": form.data["title"],
                "album_id": form.data["album_id"],
                "genre": form.data["genre"],
                "artist_id": artist["artist_id"],
                "mp3": upload["url"],
            }

            write_file(song_to_fs)
        #-------------------------------------------------------------------#
        return new_song.to_dict()
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        print(form.errors)
        return form.errors


@song_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_song(id):
    print("ARE WE IN UPDATE ROUTE BACKEND??")
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


@song_routes.route('/<int:songId>', methods=["DELETE"])
@login_required
def delete_song(songId):
    song = Song.query.get(songId)
    artist = current_user.to_dict()
    deleted_song = song.to_dict()
    poke = True
    print("current user artists id 👉👉👉", artist["artist_id"])
    print("current songs artists id 👉👉👉", song.to_dict_no_item(includeMP3 = True)["artist_id"])
    print("original conditional  VVVVVVVVVVVVVV")
    print(" is this the owner? 👉👉👉", artist["artist_id"] == song.to_dict_no_item(includeMP3 = True)["artist_id"])
    if poke:
        # print(" song url 👉👉👉", song.to_dict_no_item(includeMP3 = True)["mp3"])
        test = remove_file_from_s3('http://mango-music.s3.amazonaws.com/04b6550c621641c8bd3f1a14418e90bd.mp3')
        print(f"test 👉👉👉 {test}")
        db.session.delete(song)
        db.session.commit()
        return (f"Successfully deleted song #: {deleted_song['id']}")


@song_routes.route('/<int:songId>/playlist', methods=["DELETE"])
@login_required
def delete_song_playlist(songId):
    print('inside delete playlist backend song', songId)
    song = Playlist_Song.query.get(songId)
    delete_song = song.to_dict()
    db.session.delete(song)
    db.session.commit()
    return delete_song
