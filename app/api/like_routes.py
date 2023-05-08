from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Like, db

like_routes = Blueprint('likes', __name__)

#Get current user likes
@like_routes.route('/current')
@login_required
def likes():
    """
    Query for all of logged in users' likes and returns them in a list.
    For example-
    {
        Likes: [
            {
                "id": 1,
                "user_id": 1,
                "song_id": 1
            },
            {
                "id": 2,
                "user_id": 2,
                "song_id": 2
            }
        ]
    }
    """
    id = current_user.id
    likes = Like.query.filter(Like.user_id == id).all()
    return {"Likes": [like.to_dict() for like in likes]}

#CREATE a like
@like_routes.route('/create', methods=['POST'])
@login_required
def create_like():
    """
    Create a like from a json request.
    Request example-
    {
        "song_id": 1
    }
    Return created like on success
    Return example-
    {
        "id": 1,
        "user_id": 1,
        "song_id": 1
    }
    """
    req = request.get_json()
    user_id = current_user.id
    song_id = req["song_id"]
    like = Like( user_id = user_id, song_id = song_id)
    db.session.add(like)
    db.session.commit()
    query = Like.query.filter(Like.user_id == user_id, Like.song_id == song_id).first()
    return query.to_dict()

#DELETE a like
@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def del_like(id):
    """
    Delete a like given it's id. Return message on success/error
    """
    like = Like.query.get(id)
    if like and like.user_id == current_user.id:
        db.session.delete(like)
        db.session.commit()
        return {"message": "Successfully Deleted Like"}
    return {'errors': ['Like not found']}, 400
