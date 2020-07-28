
# My Artists Mobile App
Open source code for the ios and android app My Artists. My artists lets users login with their Spotify accounts and finds concerts featuring their favorite artists (found on their Spotify) at venues near them. You can also browse all the concerts in a city, change cities, view details on your Spotify artists and discover new artists.




## Screenshots
<p align="center">
<img src="/screenshots/login.PNG" width="200">
<img src="/screenshots/analyzing-spotify.PNG" width="200">
<img src="/screenshots/concerts-my.PNG" width="200">
<img src="/screenshots/concerts-all.PNG" width="200">
<img src="/screenshots/concerts-favorites.PNG" width="200">
<img src="/screenshots/concerts-filters.PNG" width="200">
<img src="/screenshots/concerts-detail-2.PNG" width="200">
<img src="/screenshots/artist-detail-upcoming.PNG" width="200">
<img src="/screenshots/discovery-artist-top.PNG" width="200">
<img src="/screenshots/artists-search.PNG" width="200">
<img src="/screenshots/artists-1.PNG" width="200">
<img src="/screenshots/discovery-search-all.PNG" width="200">
<img src="/screenshots/discovery-artist-bottom.PNG" width="200">
<img src="/screenshots/settings.PNG" width="200">
</p>


## Technologies
This project uses:
* Expo
* React Native
* Purely React Hooks
* Redux & Thunk middleware
* React Navigation 5
* Spotify API
* Seatgeek API
* Google Places Autocomplete API

The [backend API of this project](https://github.com/samkovaly/SpotifyAPIMusicProfile) (which is currently hosted on Heroku) uses:
* Python (tested on 3.7.6)
* Django
* Django Rest Framework
* Pandas
* asyncio & aiohttp
* Spotify API


## How it works
The user first logs into their Spotify account with via the login page. This auth information (access token and refresh token) is then passed to a custom Django backend when verifies the user and then makes numerous calls to Spotify's API with the user's credentials. It collects all the user's artists and uses Python Pandas to create a large dataframe of all the artists and tracks. The result is translated to JSON and returned. This data is then passed to the global Redux state which propagates the whole app.

The app retrieves concerts from the Seatgeek API. When it does so, it filers them by the user's Spotify artists, which results in the "my artist" tab on the concerts screen. Location is received from the user's current location if they approve, or from the Google Places Autocomplete API which user can use to search for any location. This location, along with time parameters and a radius, is passed to the Seatgeek API query when requesting concerts data.

## Setup
Instead of finding it on the ios and google play stores, you can run it locally:
1. Get NPM & Node.js (https://www.npmjs.com/get-npm) (tested on 12.16.1)
2. Get Expo: ```npm install -g expo-cli```
3. If you have an expo account: ```expo login```
4. This project uses Yarn (https://classic.yarnpkg.com/en/docs/install), run ```yarn install```
5. Create APIConfig.js in the main directory and export API_IP and API_MASTER_KEY that correlate to the backend.
6. Start with: ```expo start```

## Backend
This mobile app needs a backend API to run. Currently one is running at 'my-artists-app.herokuapp.com' and the source code for it is here: https://github.com/samkovaly/SpotifyAPIMusicProfile. The front end and backend need a matching key to work.

[MIT License](/license)