# Mango Music

Please visit our website at:

[mango-music-4c4k.onrender.com]

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

## \~Users~

### POST api/auth/signup
Sign up and automatically log in user.

Request:
* Headers:
    * Content-Type: application/json
* Body ("artist" field not required):

    ```json
    {
        "email": "mango1@music.io",
        "password": "password",
        "username": "DemoUser1",
        "first_name": "Demo",
        "last_name": "User",
        "artist": true
    }
    ```

Successful Response Body:
```json
{
    "artist": true,
    "artist_id": 1,
    "email": "mango1@music.io",
    "first_name": "Demo",
    "id": 1,
    "last_name": "User",
    "playlists": [],
    "username": "DemoUser1"
}
```
________________
### POST api/auth/login
Log in a user.

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "email": "mango1@music.io",
        "password": "password"
    }
    ```

Successful Response Body:
```json
{
    "artist": true,
    "artist_id": 1,
    "email": "mango1@music.io",
    "first_name": "Demo",
    "id": 1,
    "last_name": "User",
    "playlists": [
        {
            "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
            "description": "Gym Music",
            "id": 1,
            "title": "DemoUser1 Jammy Jams",
            "user_id": 1
        }
    ],
    "username": "DemoUser1"
}
```
________________
### GET api/auth/logout
Log out user.

Successful Response Body:
```json
{
    "message": "User logged out",
}
```
________________
## \~Albums~


### GET api/albums
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

________________
### GET api/albums/:albumId
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

________________
### GET api/albums/artist
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

________________
### POST api/albums
Create an album*

\* Login REQUIRED and User MUST be artist

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "cover": "https://i.pinimg.com/originals/f6/28/59/f6285960dafff1ff62f24515459cdabe.jpg",
        "description": "Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.",
        "genre": "Hip Hop",
        "title": "Graduation",
        "year": 2007,
        "artist_id": 1
    }
    ```

Successful Response Body:
```json
    {
        "cover": "https://i.pinimg.com/originals/f6/28/59/f6285960dafff1ff62f24515459cdabe.jpg",
        "description": "Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.",
        "genre": "Hip Hop",
        "id": 7,
        "title": "Graduation",
        "year": 2007,
        "artist_id": 1
    }
```
Error Response 403: Unauthorized

```json
{
    "message": "Must be an artist"
}
```

________________
### PUT api/albums/:albumId/edit
Update an album*

\* Login REQUIRED and User MUST be artist who owns the album

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "cover": "https://i.pinimg.com/originals/f6/28/59/f6285960dafff1ff62f24515459cdabe.jpg",
        "description": "Graduation is the third studio album by American rapper and producer Kanye West, released on September 11, 2007, through Def Jam Recordings and Roc-A-Fella Records.",
        "genre": "Hip Hop",
        "title": "Graduation",
        "year": 2007
    }
    ```

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

________________
### DELETE api/albums/:albumId
Deletes an album*

\* Login REQUIRED and User MUST be artist who owns the album

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
________________
## \~Playlists~


________________
### GET api/playlists/current
Returns all the playlists for the user*

\* Login REQUIRED

Successful Response Body:
```json
[
    {
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Gym Music",
        "id": 1,
        "num_songs": 1,
        "songs": [
            {
                "id": 1,
                "songs": {
                    "album_id": 2,
                    "album_title": "Un Verano Sin Ti",
                    "artist_id": 9,
                    "artist_name": "Bad Bunny",
                    "cover": "https://media.pitchfork.com/photos/627425dbc85171592b8a6e6a/1:1/w_600/Bad-Bunny-Un-Verano-Sin-Ti.jpg",
                    "duration": null,
                    "genre": "Reggaeton",
                    "id": 1,
                    "lyrics": null,
                    "mp3": "",
                    "title": "Moscow Mule"
                }
            }
        ],
        "title": "DemoUser Jammy Jams",
        "user_id": 1
    }
]
```
Error Response 403: Unauthorized

```json
{
    "message": "Must be logged in to access this page"
}
```

________________
### GET api/playlist/:playlistId
Returns a single playlist from the database.

Successful Response Body:
```json
{
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Gym Music",
        "id": 1,
        "num_songs": 1,
        "songs": [
            {
                "id": 1,
                "songs": {
                    "album_id": 2,
                    "album_title": "Un Verano Sin Ti",
                    "artist_id": 9,
                    "artist_name": "Bad Bunny",
                    "cover": "https://media.pitchfork.com/photos/627425dbc85171592b8a6e6a/1:1/w_600/Bad-Bunny-Un-Verano-Sin-Ti.jpg",
                    "duration": null,
                    "genre": "Reggaeton",
                    "id": 1,
                    "lyrics": null,
                    "mp3": "",
                    "title": "Moscow Mule"
                }
            }
        ],
        "title": "DemoUser Jammy Jams",
        "user_id": 1
}
```

________________
### POST api/playlists
Create a playlist*

\* Login REQUIRED

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Coding Music",
        "title": "DemoUser Jammy Jams 2",
    }
    ```

Successful Response Body:
```json
    {
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Coding Music",
        "title": "DemoUser Jammy Jams 2",
        "id": 2
    }
```
Error Response 403: Unauthorized

```json
{
    "message": "Must be logged in to access this page"
}
```

________________
### PUT api/playlist/:playlistId/edit
Update a playlist*

\* Login REQUIRED and User MUST own the playlist

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Coding Music",
        "title": "DemoUser Jammy Jams 2",
    }
    ```

Successful Response Body:
```json
    {
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Coding Music",
        "title": "DemoUser Jammy Jams 2",
        "id": 2
    }
```
Error Response 403: Unauthorized

```json
{
    "message": "Must own playlist to access this page"
}
```

________________
### POST api/playlist/:playlistId/song
Add song to a playlist*

\* Login REQUIRED and User MUST own the playlist

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "song_id": 1
    }
    ```

Successful Response Body:
```json
    {
        "message": "success"
    }
```
Error Response 403: Unauthorized

```json
{
    "message": "Must own playlist to access this page"
}
```

________________
### DELETE api/playlists/:playlistId
Deletes a playlist*

\* Login REQUIRED and User MUST own the playlist

Successful Response Body:
```json
    {
        "cover": "https://filmdaily.co/wp-content/uploads/2020/08/fitness-2.jpg",
        "description": "Coding Music",
        "title": "DemoUser Jammy Jams 2",
        "id": 2
    }
```






[wiki]: https://github.com/Mango-WorldWide/Mango-Music/wiki
[mango-music-4c4k.onrender.com]: https://mango-music-4c4k.onrender.com/
