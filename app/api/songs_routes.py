from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from app.models import Song, User, Album, db, Playlist_Song
from app.forms.song_form import SongForm
from ..api.aws_helpers import (get_unique_filename,upload_file_to_s3,remove_file_from_s3)
import os
import random

song_routes = Blueprint("songs", __name__)


# ---------------------------------------------------------------------#
def write_file(data):
    file_path = "app/seeds/songs_seeds.txt"
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "a") as file:
            file.write(str(data) + ",\n")
        return "File written successfully"
    except Exception as e:
        return f"Error writing file: {str(e)}"


# ---------------------------------------------------------------------#


@song_routes.route("")
def get_songs():
    """Get all songs"""
    songs = Song.query.all()
    return {"Songs": [song.to_dict() for song in songs]}



@song_routes.route('/<int:songId>')
@song_routes.route("/<int:songId>")
def get_song_by_id(songId):
    """Get single song"""
    song = Song.query.get(songId)
    return song.to_dict_no_item(includeMP3=True)

@song_routes.route('/random')
def get_random_songs():
    songs = Song.query.all()
    randomSongs = random.choices([song.to_dict() for song in songs], k=15)

    return {'Songs': randomSongs}

@song_routes.route("/new", methods=["POST"])
@login_required
def add_song():
    """Add song to album"""
    artist = current_user.to_dict()

    if not artist["artist"]:
        res = make_response({"error": "Only artists can add songs"})
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
            title=form.data["title"],
            genre=form.data["genre"],
            mp3=upload["url"],
            album_id=form.data["album_id"],
            artist_id=artist["artist_id"],
        )

        db.session.add(new_song)
        db.session.commit()

        ## Leave this commented out unless adding songs to the songs_seeds.txt
        # -------------------------------------------------------------------#
        # if "id" in new_song.to_dict():
        #     song_to_fs = {
        #         "title": form.data["title"],
        #         "album_id": form.data["album_id"],
        #         "genre": form.data["genre"],
        #         "artist_id": artist["artist_id"],
        #         "mp3": upload["url"],
        #     }

        #     write_file(song_to_fs)
        #-------------------------------------------------------------------#

        # -------------------------------------------------------------------#

        return new_song.to_dict()
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return form.errors


@song_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_song(id):
    """Update song details"""
    song = Song.query.get(id)
    artist = current_user.to_dict()

    if not song:
        return jsonify({"error": "Song not found"}), 404

    # Check if the current user is the owner of the song
    if song.artist_id != artist["artist_id"]:
        return jsonify({"error": "You are not the artist"}), 403

    # Update the song's title, genre, and album post data
    title = request.json.get("title")
    genre = request.json.get("genre")
    album = request.json.get("album")

    if title:
        song.title = title

    if genre:
        song.genre = genre

    if album:
        song.album = album

    db.session.commit()

    return jsonify(song.to_dict())


@song_routes.route("/<int:songId>", methods=["DELETE"])
@login_required
def delete_song(songId):
    """Delete song from album"""
    song = Song.query.get(songId)
    artist = current_user.to_dict()
    deleted_song = song.to_dict()
    if artist["artist_id"] == song.to_dict_no_item(includeMP3=True)["artist_id"]:
        # remove_file_from_s3(song["mp3"])
        db.session.delete(song)
        db.session.commit()
        return deleted_song
    else: 
        return jsonify({"error": "You are not the artist"}), 403


@song_routes.route("/<int:songId>/playlist", methods=["DELETE"])
@login_required
def delete_song_playlist(songId):
    """Delete song from playlist"""
    song = Playlist_Song.query.get(songId)
    delete_song = song.to_dict()
    db.session.delete(song)
    db.session.commit()
    return delete_song
