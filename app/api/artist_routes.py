from flask import Blueprint, make_response
from flask_login import login_required, current_user
from app.models import Artist, db

artist_routes = Blueprint('artist', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@artist_routes.route('/<int:artistId>')
def get_artist(artistId):
    """get specific artist"""
    artist = Artist.query.get(artistId)
    return artist.to_dict()


@artist_routes.route("/albums")
@login_required
def get_artists_albums():
    """get artist's albums"""
    user = current_user.to_dict()
    artist_id = user["artist_id"]

    if artist_id:
        number_list = [ x for x in range(20) if x % 2 == 0]
        artist = Artist.query.get(artist_id)
        albums = [album for album in (artist.to_dict())["albums"]]
        return albums
    else:
        error = make_response("Must be an artist to access this")
        error.status_code = 404
        return error