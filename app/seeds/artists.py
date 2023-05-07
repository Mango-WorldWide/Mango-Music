from app.models import db, Artist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_artists():
    no_artist = Artist(
        name = 'No Artist'
    )
    artist = Artist(
        name = 'Artist'
    )
    gryffin = Artist(
        name = 'Gryffin'
    )
    backstreet_boys = Artist(
        name = 'Backstreet Boys'
    )
    blackpink = Artist(
        name = 'BLACKPINK'
    )
    brent_faiyaz = Artist(
        name = 'Brent Faiyaz'
    )
    imagine_dragons = Artist(
        name = 'Imagine Dragons'
    )
    kanye_west = Artist(
        name = 'Kanye West'
    )
    bad_bunny = Artist(
        name = 'Bad Bunny'
    )
    all_artists = [no_artist, artist, gryffin, backstreet_boys, blackpink, brent_faiyaz, imagine_dragons, kanye_west, bad_bunny]
    for artist in all_artists:
        existing_artist = Artist.query.filter_by(name=artist.name).first()
        if not existing_artist:
            db.session.add(artist)
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))

    db.session.commit()
