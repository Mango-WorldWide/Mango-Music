from flask import Blueprint, request
from app.models import Album, db
from app.forms import AlbumForm
album_routes = Blueprint('albums', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@album_routes.route('')
def albums():
    """get all albums"""
    print('inside albums flask route')
    albums = Album.query.all()
    return {'Albums': [album.to_dict() for album in albums]}

@album_routes.route("/<int:albumId>")
def oneAlbums(albumId):
    """get one album"""
    print('inside one album flask route')
    album = Album.query.get(albumId)
    songs_albums = album.albums_songs_relationship
    song=[songs.to_dict() for songs in songs_albums]
    print({"Album": album.to_dict(), "Songs":song})
    return {"Album": album.to_dict(), "Songs":song}

@album_routes.route('', methods=['POST'])
def create_album():
    """create album"""
    print('inside album create route flask')
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('validations create flask works')
        new_album = Album(
            title = form.data['title'],
            description = form.data['description'],
            cover = form.data['cover'],
            genre = form.data['genre'],
            year = form.data['year'],
            artist_id = form.data['artist_id']
        )
        db.session.add(new_album)
        db.session.commit()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@album_routes.route("/<int:albumId>", methods=['DELETE'])
def delete_album(albumId):
    album = Album.query.get(albumId)
    db.session.delete(album)
    db.session.commit()
    return album
