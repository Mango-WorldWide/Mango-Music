from app.models import db, User, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    user1_likes = [Like(
            user_id = User.query.filter(User.username == 'DemoUser').first().id,
            song_id = i
        ) for i in range(1, 23)]

    user2_likes = [Like(
            user_id = User.query.filter(User.username == 'DemoArtist').first().id,
            song_id = i
        ) for i in range(24, 39)]

    user3_likes = [Like(
            user_id = User.query.filter(User.username == 'imabird').first().id,
            song_id = i
        ) for i in range(30, 39)]

    user4_likes = [Like(
            user_id = User.query.filter(User.username == 'nicky').first().id,
            song_id = i
        ) for i in range(40, 20, -1)]

    user5_likes = [Like(
            user_id = User.query.filter(User.username == 'fluffybunny').first().id,
            song_id = i
        ) for i in range(60, 80)]

    user6_likes = [Like(
            user_id = User.query.filter(User.username == 'jenniiiiie').first().id,
            song_id = i
        ) for i in range(81, 100)]

    user7_likes = [Like(
            user_id = User.query.filter(User.username == 'jisoo').first().id,
            song_id = i
        ) for i in range(81, 100)]

    user8_likes = [Like(
            user_id = User.query.filter(User.username == 'imadragon').first().id,
            song_id = i
        ) for i in range(50, 70)]

    user9_likes = [Like(
            user_id = User.query.filter(User.username == 'Ye').first().id,
            song_id = i
        ) for i in range(97, 110)]

    all_likes = [*user1_likes, *user2_likes, *user3_likes, *user4_likes, *user5_likes, *user6_likes, *user7_likes, *user8_likes, *user9_likes]
    add_likes = [db.session.add(like) for like in all_likes]
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
