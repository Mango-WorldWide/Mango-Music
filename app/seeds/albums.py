from app.models import db, environment, SCHEMA, Album, Artist
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        title = 'Greatest Hit',
        description = 'The first greatest hits album released by American boy band, the Backstreet Boys. The album features 15 songs by the group, as well as a new song, "Drowning".',
        cover = '/Music/Backstreet Boys- Greatest Hits/cover.png',
        genre ='Pop',
        year = 2001,
        artist_id=Artist.query.filter(Artist.name == 'Backstreet Boys').first().id
    )

    album2 = Album(
        title = 'Un Verano Sin Ti',
        description = 'The fourth solo studio album, and fifth overall, by Puerto Rican rapper and singer Bad Bunny.',
        cover = '/Music/Bad Bunny - Un Verano Sin Ti/cover.jpg',
        genre ='Spanish',
        year = 2022,
        artist_id=Artist.query.filter(Artist.name == 'Bad Bunny').first().id
    )

    album3 = Album(
        title = 'BORN PINK',
        description = 'Born Pink is the second studio album by South Korean girl group Blackpink, released on September 16, 2022, through YG Entertainment and Interscope Records.',
        cover = '/Music/BLACKPINK - BORN PINK/cover.jpg',
        genre ='K-Pop',
        year = 2022,
        artist_id=Artist.query.filter(Artist.name == 'BLACKPINK').first().id
    )

    album4 = Album(
        title = 'WASTELAND',
        description = 'Wasteland is the second studio album by American R&B singer Brent Faiyaz.',
        cover = '/Music/Brent Faiyaz - WASTELAND/cover.jpg',
        genre ='R&B',
        year = 2022,
        artist_id=Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id
    )

    album5 = Album(
        title = 'Alive',
        description = 'Alive is the sophomore studio album by American record producer and musician Gryffin.',
        cover = '/Music/Gryffin - Alive/cover.jpg',
        genre ='EDM',
        year = 2022,
        artist_id=Artist.query.filter(Artist.name == 'Gryffin').first().id
    )

    album6 = Album(
        title = 'Evolve',
        description = 'Evolve is the third studio album by American pop rock band Imagine Dragons, released on June 23, 2017, by Kidinakorner and Interscope Records.',
        cover = '/Music/Imagine Dragons - Evolve (Deluxe Edition)/Cover.jpg',
        genre ='Rock',
        year = 2017,
        artist_id=Artist.query.filter(Artist.name == 'Imagine Dragons').first().id
    )

    album7 = Album(
        title = 'Graduation',
        description = 'Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.',
        cover = '/Music/Kanye West - Graduation (2007)/cover.jpg',
        genre ='Hip Hop',
        year = 2007,
        artist_id=Artist.query.filter(Artist.name == 'Kanye West').first().id
    )


    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
