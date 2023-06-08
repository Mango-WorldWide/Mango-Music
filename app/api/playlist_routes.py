from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from app.models import db, Playlist, Playlist_Song
from app.forms import PlaylistForm


playlist_routes = Blueprint("playlist", __name__)


@playlist_routes.route("/current")
@login_required
def get_users_playlists():
    """get user's playlist"""
    user_id = current_user.get_id()
    user = current_user.to_dict()
    data = Playlist.query.filter(Playlist.user_id == user_id).all()
    all_playlists = []
    for playlist in data:
        playlist_dict = playlist.to_dict()
        all_playlists.append(playlist_dict)

    return all_playlists



@playlist_routes.route("/<int:playlistId>")
def get_single_playlist(playlistId):
    """get specific playlist by playlist id"""
    data = Playlist.query.get(playlistId)
    if data:
        single_playlist = data.to_dict()
        return single_playlist
    else:
        error = make_response("Playlist does not exist")
        error.status_code = 404
        return error


@playlist_routes.route("", methods=["POST"])
@login_required
def create_playlist():
    """create a playlist"""
    print("IN CREATE A PLAYLIST")
    user_id = current_user.get_id()
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = request.get_json()
        new_playlist = Playlist(
            title=data["title"],
            description=data["description"],
            cover=data["cover"],
            user_id=user_id,
        )
        db.session.add(new_playlist)
        db.session.commit()
        print("in backend =>", new_playlist.to_dict())
        return new_playlist.to_dict()
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error


@playlist_routes.route("/<int:playlistId>", methods=["PUT"])
@login_required
def edit_playlist(playlistId):
    """edit a playlist"""
    user_id = current_user.get_id()
    playlist = Playlist.query.get(playlistId)
    if playlist:
        form = PlaylistForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            new_values = request.get_json()
            playlist.id = int(playlistId)
            playlist.title = new_values["title"]
            playlist.description = new_values["description"]
            playlist.cover = new_values["cover"]
            db.session.commit()
            return playlist.to_dict()
        else:
            form_errors = {key: val[0] for (key, val) in form.errors.items()}
            error = make_response(form_errors)
            error.status_code = 400
            return error
    else:
        error = make_response("Playlist does not exist")
        error.status_code = 404
        return error

## delete a playlist
@playlist_routes.route("/<int:playlistId>", methods=["DELETE"])
@login_required
def delete_playlist(playlistId):
    print("WE UP IN HERE!!!!")
    user_id = current_user.get_id()
    playlist = Playlist.query.get(playlistId)
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return playlist.to_dict()
    else:
        error = make_response("Playlist does not exist")
        error.status_code = 404
        return error

@playlist_routes.route('/<int:playlistId>/song', methods=['POST'])
@login_required
def add_song_playlist(playlistId):
    print("WE ARE IN ADD SONG PLAYLIST")
    new_playlist_song = Playlist_Song(
        playlist_id = playlistId,
        song_id = request.json.get('song_id')
    )
    db.session.add(new_playlist_song)
    db.session.commit()
    return {'message': 'success'}
