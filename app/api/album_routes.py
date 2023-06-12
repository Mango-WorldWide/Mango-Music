from flask import Blueprint, request, make_response
from app.models import Album, Artist, db
from app.forms import AlbumForm
from flask_login import current_user, login_required
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



def add_artist(albums):
    for album in albums:
        album.artist = album.albums_artists_relationship.to_dict()["name"]
    return albums


@album_routes.route('')
def albums():
    """get all albums"""
    print('inside albums flask route')
    albums = Album.query.all()
    # add_artist(albums)
    # print([album.to_dict() for album in albums],'albums testing')
    return {'Albums': [album.to_dict() for album in albums]}

@album_routes.route("/artist")
@login_required
def get_artists_albums():
    """get artist's albums"""
    user = current_user.to_dict()
    artist_id = user["artist_id"]

    if artist_id:
        artist = Artist.query.get(artist_id)
        albums = [album for album in (artist.to_dict())["albums"]]
        return albums
    else:
        error = make_response("Must be an artist to access this page")
        error.status_code = 404
        return error

@album_routes.route("/<int:albumId>/edit", methods=['PUT'])
def update_album(albumId):
    """update album"""
    print('inside album update route flask')
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print('👉👉👉👉 validations update flask works')

        album = Album.query.get(albumId)
        # print(f"album 👉👺👺 {album.to_dict()}")
        album.title = form.data['title']
        album.description = form.data['description']
        album.cover = form.data['cover']
        album.genre = form.data['genre']
        album.year = form.data['year']
        # print(album, ' 👺👺👺👺👺 new ALBUM UPDATE ROUTE')
        db.session.add(album)
        db.session.commit()
        # print(album.to_dict(), ' 👺👺👺👺👺 new ALBUM UPDATE ROUTE')
        return album.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@album_routes.route("/<int:albumId>")
def oneAlbums(albumId):
    """get one album"""
    print('inside one album flask route')
    album = Album.query.get(albumId)
    songs_albums = album.albums_songs_relationship
    song=[songs.to_dict_no_item() for songs in songs_albums]
    print({"Album": album.to_dict(), "Songs":song})
    return {"Album": album.to_dict(), "Songs":song}

@album_routes.route('', methods=['POST'])
def create_album():
    """create album"""
    print('inside album create route flask')
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('WHAT IS THE DATA', form.data)
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
        return new_album.to_dict(), 201

    print('WORK PLEASE', form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@album_routes.route("/<int:albumId>", methods=['DELETE'])
def delete_album(albumId):
    album = Album.query.get(albumId)
    db.session.delete(album)
    db.session.commit()
    return album
