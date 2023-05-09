from app.models import db, Song, Album, Artist, environment, SCHEMA
from sqlalchemy.sql import text
# from app import app
# from flask.cli import with_appcontext

def song_data():
    return [
                                    # BAD BUNNY ALBUM
    {
        "title": "Moscow Mule",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,  # Assuming Un Verano Sin Ti is the first album in the albums table
        "genre": "Reggaeton",
        "duration": 4.05,  # Replace
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,  # Assuming Bad Bunny is the first artist in the artists table
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Después de la Playa",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.50,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Me Porto Bonito",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 2.58,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Tití Me Preguntó",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 4.03,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Un Ratito",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 2.56,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Yo No Soy Celoso",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.50,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Tarot",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.57,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Neverita",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 2.53,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "La Corriente",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.18,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Efecto",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.33,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Party",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.47,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Aguacero",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.31,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Enséñame a Bailar",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 2.56,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Ojitos Lindos",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 4.18,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "El Apagón",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.21,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Otro Atardecer",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 4.04,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Un Coco",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.16,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Andrea",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 5.39,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Me Fui de Vacaciones",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 3.00,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Un Verano Sin Ti",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 2.28,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Agosto",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 2.19,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Callaita",
        "album_id": Album.query.filter(Album.title == 'Un Verano Sin Ti').first().id,
        "genre": "Reggaeton",
        "duration": 4.10,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Bad Bunny').first().id,
        "mp3": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "lyrics": "Lyrics",
    },

                                    # BACKSTREET BOYS ALBUM
    {
        "title": "I Want It That Way",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.35,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/01 Backstreet Boys - I Want It That Way.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Everybody (Backstreet's Back)",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.35,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/02 Backstreet Boys - Everybody (Backstreet's Back).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "As Long As You Love Me",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.35,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/03 Backstreet Boys - As Long As You Love Me.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Show Me The Meaning Of Being Lonely",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.35,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/04 Backstreet Boys - Show Me The Meaning Of Being Lonely.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Quit Playing Games (With My Heart)",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.54,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/05 Backstreet Boys - Quit Playing Games (With My Heart).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "All I Have To Give",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 4.38,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/06 Backstreet Boys - All I Have To Give.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Larger Than Life",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.54,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/07 Backstreet Boys - Larger Than Life.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "I'll Never Break Your Heart",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 4.50,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/08 Backstreet Boys - I'll Never Break Your Heart.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "The Call",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.25,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/09 Backstreet Boys - The Call.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Shape Of My Heart",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.52,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/10 Backstreet Boys - Shape Of My Heart.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Get Down (You're The One For Me)",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.52,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/11 Backstreet Boys - Get Down (You're The One For Me).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Anywhere For You",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 4.42,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/12 Backstreet Boys - Anywhere For You.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "The One",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.48,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/13 Backstreet Boys - The One.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "More Than That",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 3.43,  # Replace with the actual duration of the song
                "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/14 Backstreet Boys - More Than That.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Drowning",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 4.28,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/15 Backstreet Boys - Drowning.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "The Perfect Fan",
        "album_id": Album.query.filter(Album.title == 'Greatest Hit').first().id,
        "genre": "Pop",
        "duration": 4.13,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Backstreet Boys').first().id,
        "mp3": "/Music/Backstreet Boys- Greatest Hits/16 Backstreet Boys - The Perfect Fan.mp3",
        "lyrics": "Lyrics",
    },


                                    # BLACKPINK ALBUM

    {
        "title": "Pink Venom",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 3.07,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/01. Pink Venom.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Shut Down",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 2.55,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/02. Shut Down.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Typa Girl",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 2.59,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/03. Typa Girl.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Yeah Yeah Yeah",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 2.58,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/04. Yeah Yeah Yeah.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Hard to Love",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 2.42,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/05. Hard to Love.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "The Happiest Girl",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 3.42,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/06. The Happiest Girl",
        "lyrics": "Lyrics",
    },

    {
        "title": "07. Tally",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 3.04,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/07. Tally.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "08. Ready For Love",
        "album_id": Album.query.filter(Album.title == 'BORN PINK').first().id,
        "genre": "K-Pop",
        "duration": 3.04,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'BLACKPINK').first().id,
        "mp3": "/Music/BLACKPINK - BORN PINK/08. Ready For Love.mp3",
        "lyrics": "Lyrics",
    },



                                    # BRENT FAIYAZ ALBUM
    {
        "title": "VILLAIN'S THEME",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 2.21,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/01. VILLAIN'S THEME.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "LOOSE CHANGE",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.46,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/02. LOOSE CHANGE.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "GRAVITY (FEAT. TYLER, THE CREATOR)",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.34,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/03. GRAVITY (FEAT. TYLER, THE CREATOR).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "HEAL YOUR HEART (INTERLUDE)",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 1.15,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/04. HEAL YOUR HEART (INTERLUDE).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "SKIT EGOMANIAC",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 1.26,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/05. SKIT_ EGOMANIAC.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "ALL MINE",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.36,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/06. ALL MINE.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "PRICE OF FAME",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 6.19,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/07. PRICE OF FAME.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "GHETTO GATSBY (FEAT. ALICIA KEYS)",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.18,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/08. GHETTO GATSBY (FEAT. ALICIA KEYS).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "WASTING TIME (FEAT. DRAKE & THE NEPTUNES)",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 5.01,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/09. WASTING TIME (FEAT. DRAKE & THE NEPTUNES).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "ROLLING STONE",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 2.42,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/10. ROLLING STONE.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "FYTB (FEAT. JOONY)",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.18,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/11. FYTB (FEAT. JOONY).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "SKIT OBLIVION",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 2.46,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/12. SKIT_ OBLIVION.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "DEAD MAN WALKING",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 4.07,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/13. DEAD MAN WALKING.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "ADDICTIONS",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.12,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/14. ADDICTIONS.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "ROLE MODEL",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.14,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/15. ROLE MODEL.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "JACKIE BROWN",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 2.49,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/16. JACKIE BROWN.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "BAD LUCK",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 2.42,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/17. BAD LUCK.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "SKIT WAKE UP CALL",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 5.05,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/18. SKIT_ WAKE UP CALL.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "ANGEL",
        "album_id": Album.query.filter(Album.title == 'WASTELAND').first().id,
        "genre": "R&B",
        "duration": 3.39,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Brent Faiyaz').first().id,
        "mp3": "/Music/Brent Faiyaz - WASTELAND/19. ANGEL.mp3",
        "lyrics": "Lyrics",
    },

                                    # GRYFFIN ALBUM

    {
        "title": "Intro",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 1.35,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/01. Intro.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Alive",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.42,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/02. Alive.mp3",
        "lyrics": "Lyrics",
    },
        {
        "title": "Forever",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.07,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/03. Forever.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Lose Your Love",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.31,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/04. Lose Your Love.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Safe With Me",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.25,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/05. Safe With Me.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Woke Up in Love",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.36,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/06. Woke Up in Love.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Reckless",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 2.36,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/07. Reckless.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Glitch In The Simulation",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 2.31,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/08. Glitch In The Simulation.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Evergreen",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 4.07,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/09. Evergreen.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Scandalous",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 2.39,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/10. Scandalous.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Interlude",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 1.40,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/11. Interlude.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Colors",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.51,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/12. Colors.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "After You",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.44,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/13. After You.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Best Is Yet To Come",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.35,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/14. Best Is Yet To Come.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Sometimes You Know",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 2.15,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/15. Sometimes You Know.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Caught Up",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 2.53,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/16. Caught Up.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "17. You Were Loved",
        "genre": "EDM",
        "album_id": Album.query.filter(Album.title == 'Alive').first().id,
        "duration": 3.42,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Gryffin').first().id,
        "mp3": "/Music/Gryffin - Alive/17. You Were Loved.mp3",
        "lyrics": "Lyrics",
    },

                                    # IMAGINE DRAGONS ALBUM
    {
        "title": "I Don't Know Why",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.10,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/01 I Dont Know Why.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Whatever It Takes",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.21,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/02 Whatever It Takes.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Believer",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.24,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/03 Believer.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Walking The Wire",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.52,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/04 Walking The Wire.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Rise Up",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.51,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/05 Rise Up.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "I'll Make It Up To You",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 4.22,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/06 Ill Make It Up To You.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Yesterday",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.25,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/07 Yesterday.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Mouth Of The River",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.41,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/08 Mouth Of The River.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Thunder",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.07,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/09 Thunder.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "10 Start Over",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.06,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/10 Start Over.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Dancing In The Dark",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.55,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/11 Dancing In The Dark.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Levitate",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.18,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/12 Levitate.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Not Today",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 4.20,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/13 Not Today.mp3",
        "lyrics": "Lyrics",
    },

    {
        "title": "Believer (Kaskade Remix)",
        "album_id": Album.query.filter(Album.title == 'Evolve').first().id,
        "genre": "Rock",
        "duration": 3.10,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Imagine Dragons').first().id,
        "mp3": "/Music/Imagine Dragons - Evolve (Deluxe Edition)/14 Believer (Kaskade Remix).mp3",
        "lyrics": "Lyrics",
    },

                                    # YE ALBUM

    {
        "title": "Good Morning",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.15,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/01 Good Morning.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Champion",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 2.47,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/02 Champion.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Stronger",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 5.11,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/03 Stronger.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "I Wonder",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 4.03,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/04 I Wonder.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Good Life (feat T-Pain)",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.27,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/05 Good Life (feat T-Pain).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Can't Tell Me Nothing",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 4.31,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/06 Can't Tell Me Nothing.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Barry Bonds (feat Lil' Wayne)",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.24,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/07 Barry Bonds (feat Lil' Wayne).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Drunk and Hot Girls (feat Mos Def)",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 5.13,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/08 Drunk and Hot Girls (feat Mos Def).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Flashing Lights (feat Dwele)",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.57,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/09 Flashing Lights (feat Dwele).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Everything I Am (feat DJ Premier)",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.47,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/10 Everything I Am (feat DJ Premier).mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "The Glory",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.32,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/11 The Glory.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Homecoming",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 3.23,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/12 Homecoming.mp3",
        "lyrics": "Lyrics",
    },
    {
        "title": "Big Brother",
        "album_id": Album.query.filter(Album.title == 'Graduation').first().id,
        "genre": "Hip-Hop",
        "duration": 4.47,  # Replace with the actual duration of the song
        "artist_id": Artist.query.filter(Artist.name == 'Kanye West').first().id,
        "mp3": "/Music/Kanye West - Graduation (2007)/13 Big Brother.mp3",
        "lyrics": "Lyrics",
    },

]

# @with_appcontext
def seed_songs(app):
    with app.app_context():
        for data in song_data():
            song = Song(**data)
            db.session.add(song)

        db.session.commit()




# @with_appcontext
def undo_songs(app):
    with app.app_context():
        if environment == 'production':
            db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM songs"))

        db.session.commit()
