from flask import Blueprint
from app.models import Album

album_routes = Blueprint('albums', __name__)



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
    return album.to_dict()
