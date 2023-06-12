# Mango Music

Please visit our website at:

[mango-music.onrender.com]

For more info about this project please check out our [wiki]!

## Home Page
![image](https://github.com/Mango-WorldWide/Mango-Music/assets/98733614/16c80c25-1701-48bd-8308-9877909f722a)

## Albums
<img width="1680" alt="Screen Shot 2023-05-13 at 1 00 04 PM" src="https://github.com/Mango-WorldWide/Mango-Music/assets/118857412/47b5e053-4f4b-4bf9-868a-388ded305dea">

## Individual Album
<img width="1680" alt="Screen Shot 2023-05-13 at 1 02 23 PM" src="https://github.com/Mango-WorldWide/Mango-Music/assets/118857412/386a3af0-57c7-4880-9aaa-7d1f18e1b2fa">

## Current User's Albums
<img width="1680" alt="Screen Shot 2023-05-13 at 1 32 01 PM" src="https://github.com/Mango-WorldWide/Mango-Music/assets/118857412/4eb473be-4695-4e2d-a8e9-ebbcc898b242">

## Individual Album Owned by User
<img width="1680" alt="Screen Shot 2023-05-13 at 1 30 09 PM" src="https://github.com/Mango-WorldWide/Mango-Music/assets/118857412/cc2626e6-1f3c-4826-bac8-f9366b7fca28">


## Current User's Playlists
<img width="1680" alt="Screen Shot 2023-05-13 at 1 00 36 PM" src="https://github.com/Mango-WorldWide/Mango-Music/assets/118857412/2e0c8835-8e82-412d-aeef-83294ee476a2">

## Individual Playlist
<img width="1680" alt="Screen Shot 2023-05-13 at 1 01 14 PM" src="https://github.com/Mango-WorldWide/Mango-Music/assets/118857412/3154da0d-4d2e-4aca-952d-944ef58a51a4">


# Routes

## Album Routes
<p style="color:#ffb13b">GET api/albums</p>
Returns all the albums from the database.

Successful Response Body:
```json
{
    "Albums": [
        {
        "id": 1,
        "title": "Greatest Hit" ,
        "description": "The first greatest hits album released by American boy band, the Backstreet Boys. The album   features 15 songs by the group, as well as a new song, 'Drowning'" ,
        "cover": "https://lastfm.freetls.fastly.net/i/u/ar0/9ad371267e3a4889a7cf9b436ba17297.jpg" ,
        "genre": "Pop",
        "year": 2001,
        "artist_id": 1,
        "artist": "Backstreet Boys",
        },
        {
        "id": 2,
        "title": "Un Verano Sin Ti" ,
        "description": "The fourth solo studio album, and fifth overall, by Puerto Rican rapper and singer Bad Bunny." ,
        "cover": "https://media.pitchfork.com/photos/627425dbc85171592b8a6e6a/1:1/w_600/Bad-Bunny-Un-Verano-Sin-Ti.jpg" ,
        "genre": "Reggaeton",
        "year": 2022,
        "artist_id": 2,
        "artist": "Bad Bunny",
        }
    ]
}
```

<p style="color:#ffb13b">GET api/albums/:albumId</p>
Returns one album and all of its songs from the database.

Successful Response Body:
```json
{
    "Album": {
        "artist": "Backstreet Boys",
        "artist_id": 4,
        "cover": "https://lastfm.freetls.fastly.net/i/u/ar0/9ad371267e3a4889a7cf9b436ba17297.jpg",
        "description": "The first greatest hits album released by American boy band, the Backstreet Boys. The album features 15 songs by the group, as well as a new song, \"Drowning\".",
        "genre": "Pop",
        "id": 1,
        "title": "Greatest Hit",
        "year": 2001
    },
    "Songs": [
        {
            "album_id": 1,
            "artist_id": 4,
            "duration": null,
            "genre": "Pop",
            "id": 24,
            "lyrics": null,
            "mp3": "",
            "title": "I Want It That Way"
        },
        {
            "album_id": 1,
            "artist_id": 4,
            "duration": null,
            "genre": "Pop",
            "id": 25,
            "lyrics": null,
            "mp3": "",
            "title": "Everybody (Backstreet's Back)"
        }
    ]
}
```

<p style="color:#ffb13b">GET api/albums/artist</p>
Returns all the albums for the logged in artist*

\* Login REQUIRED and User MUST be artist

Successful Response Body:
```json
[
    {
        "cover": "https://i.pinimg.com/originals/f6/28/59/f6285960dafff1ff62f24515459cdabe.jpg",
        "description": "Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.",
        "genre": "Hip Hop",
        "id": 7,
        "title": "Graduation",
        "year": 2007
    }
]
```
Error Response 403: Unauthorized

```json
{
    "message": "Must be an artist to access this page"
}
```

<p style="color:#ffb13b">PUT api/albums/:albumId/edit</p>
Returns all the albums for the logged in artist*

\* Login REQUIRED and User MUST be artist

Request:
* Headers:
    * Content-Type: application/json
* Body:

    ```json
    {
        "cover": "https://i.pinimg.com/originals/f6/28/59/f6285960dafff1ff62f24515459cdabe.jpg",
        "description": "Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.",
        "genre": "Hip Hop",
        "id": 7,
        "title": "Graduation",
        "year": 2007
    }
    ```

Request Body:


Successful Response Body:
```json
    {
        "cover": "https://i.pinimg.com/originals/f6/28/59/f6285960dafff1ff62f24515459cdabe.jpg",
        "description": "Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.",
        "genre": "Hip Hop",
        "id": 7,
        "title": "Graduation",
        "year": 2007
    }
```
Error Response 403: Unauthorized

```json
{
    "message": "Must be an artist and own album to access this page"
}
```


















[wiki]: https://github.com/Mango-WorldWide/Mango-Music/wiki
[mango-music.onrender.com]: https://mango-music.onrender.com/
