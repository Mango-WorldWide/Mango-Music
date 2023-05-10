from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from app.models import db, Playlist
from app.forms.playlist_form import PlaylistForm


playlist_routes = Blueprint("playlist", __name__)


## get all playlists
@playlist_routes.route("")
def get_all_playlists():
    if current_user:
        user_id = current_user.get_id()
        data = Playlist.query.filter(Playlist.user_id == user_id)
        all_playlist = []
        for playlist in data:
            playlist_dict = playlist.to_dict()
            del playlist_dict["playlist_songs"]
            all_playlist.append(playlist_dict)

        return all_playlist
    else:
        return {"playlists" : []}

## get specific playlist by playlist id
@playlist_routes.route("/<int:playlistId>")
def get_single_playlist(playlistId):
    data = Playlist.query.get(playlistId)
    if data:
        single_playlist = data.to_dict()
        return single_playlist
    else:
        error = make_response("Playlist does not exist")
        error.status_code = 404
        return error


## create a playlist
@playlist_routes.route("", methods=["POST"])
def create_playlist():
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = request.get_json()
        new_playlist = Playlist(
            title = data["title"],
            description = data["description"],
            cover = data["cover"],
            user_id = 1
        )
        db.session.add(new_playlist)
        db.session.commit()
        return "Successfully added new playlist!"
    else:
        form_errors = {key: val[0] for (key, val) in form.errors.items()}
        error = make_response(form_errors)
        error.status_code = 400
        return error


## edit a playlist
@playlist_routes.route("/<int:playlistId>", methods=["PUT"])
def edit_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    if playlist:
        form = PlaylistForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            new_values = request.get_json()
            playlist.title = new_values["title"]
            playlist.description = new_values["description"]
            playlist.cover = new_values["cover"]
            db.session.commit()
            return "Successfully updated playlist!"
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
def delete_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return "Successfully deleted playlist!"
    else:
        error = make_response("Playlist does not exist")
        error.status_code = 404
        return error
