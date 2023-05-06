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
    add_artists = [db.session.add(artist) for artist in all_artists]
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))

    db.session.commit()
