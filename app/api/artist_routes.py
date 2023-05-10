from flask import Blueprint
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
    artist = Artist.query.get(artistId)
    print(artist.to_dict(),"ARTIST BACKEND ROUTE")
    return artist.to_dict()
# artists_albums_relationship
# artists_albums_relationship
