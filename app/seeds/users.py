from app.models import db, User, Artist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_user = User(
        username='DemoUser',
        email='demo@aa.io',
        password='password',
        artist=False,
        first_name='Demo',
        last_name='User',
        artist_id=Artist.query.filter(Artist.name == 'No Artist').first().id
    )
    demo_artist = User(
        username='DemoArtist',
        email='artist@aa.io',
        password='password',
        artist=True,
        first_name='Demo',
        last_name='Artist',
        artist_id=Artist.query.filter(Artist.name == 'Artist').first().id
    )
    gryffin = User(
        username='imabird',
        email='dangriffith@user.io',
        password='password',
        artist=True,
        first_name='Dan',
        last_name='Griffith',
        artist_id=Artist.query.filter(Artist.name == 'Gryffin').first().id
    )
    backstreet_boys = User(
        username='nicky',
        email='nickcarter@user.io',
        password='password',
        artist=True,
        first_name='Nick',
        last_name='Carter',
        artist_id=Artist.query.filter(Artist.name == 'Backstreet Boys').first().id
    )
    bad_bunny = User(
        username='fluffybunny',
        email='benito@user.io',
        password='password',
        artist=True,
        first_name='Benito',
        last_name='Ocasio',
        artist_id=Artist.query.filter(Artist.name == 'Bad Bunny').first().id
    )
    blackpink1 = User(
        username='jenniiiiie',
        email='jenny@user.io',
        password='password',
        artist=True,
        first_name='Jennie',
        last_name='Kim',
        artist_id=Artist.query.filter(Artist.name == 'BLACKPINK').first().id
    )

    blackpink2 = User(
        username='jisoo',
        email='kimjisoo@user.io',
        password='password',
        artist=True,
        first_name='Kim',
        last_name='Ji-soo',
        artist_id=Artist.query.filter(Artist.name == 'BLACKPINK').first().id
    )
    imagine_dragon = User(
        username='imadragon',
        email='danreynolds@user.io',
        password='password',
        artist=True,
        first_name='Dan',
        last_name='Reynolds',
        artist_id=Artist.query.filter(Artist.name == 'Imagine Dragons').first().id
    )
    kanye_west = User(
        username='Ye',
        email='kanyewest@user.io',
        password='password',
        artist=True,
        first_name='Kanye',
        last_name='West',
        artist_id=Artist.query.filter(Artist.name == 'Kanye West').first().id
    )
    brent_faiyaz = User(
        username='Faiyaz',
        email='brentfaiyaz@user.io',
        password='password',
        artist=True,
        first_name='Brent',
        last_name='Faiyaz',
        artist_id=Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id
    )
    drake = User(
        username='loverboy',
        email='drake@user.io',
        password='password',
        artist=True,
        first_name='Drake',
        last_name='Graham',
        artist_id=Artist.query.filter(Artist.name == 'Drake').first().id
    )

    all_users = [demo_user, demo_artist, gryffin, backstreet_boys, blackpink1, blackpink2, brent_faiyaz, imagine_dragon, kanye_west, bad_bunny, drake]
    for user in all_users:
        existing_user = User.query.filter_by(username=user.username).first()
        if not existing_user:
            db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
