
# My Artists App
Open source code for the ios and android app My Artists (link to ios) (link to android). My artists let's users login with their Spotify accounts and finds concerts featuring their favorite artists (found on their Spotify) in venues near them. You can also browse all the concerts in a city, change cities, view details on your Spotify artists, discover new artists and much more.




## Screenshots
<p align="center">
<img src="/screenshots/concerts-my.PNG" width="250">
<img src="/screenshots/concerts-all.PNG" width="250">
<img src="/screenshots/concerts-favorites.PNG" width="250">
<img src="/screenshots/discovery-artist-top.PNG" width="250">
<img src="/screenshots/artists-search.PNG" width="250">
<img src="/screenshots/concerts-detail-2.PNG" width="250">
<img src="/screenshots/artist-detail-upcoming.PNG" width="250">
<img src="/screenshots/artists-1.PNG" width="250">
<img src="/screenshots/discovery-search-all.PNG" width="250">
<img src="/screenshots/discovery-artist-bottom.PNG" width="250">
<img src="/screenshots/settings.PNG" width="250">
</p>


## Technologies
This project uses:
* React Native
* Expo
* Redux
* Spotify API
* Seatfeek API
* Google Places Autocomplete

The [backend API of this project](https://github.com/samkovaly/SpotifyAPIMusicProfile) uses:
* Django
* Django Rest Framework
* Pandas
* Spotfy API

## How it works
The user first logs into their Spotify account with this front end. This auth information (access token and refresh token) is then passed to a custom Django backend when verifies the user and then makes numerous calls to Spotify's API with the user's credentials. It collects all the user's artists and usees Pandas to create a large dataframe of all the artists and tracks. The result is translated to JSON and returned. This date is then passed to the global Redux state which propagates the whole app. When the app requests concerts from Seatgeek, it filers them by the user's Spotify artists, which results in the "my artist" tab on the concerts screen. Google's places autocomplete is used to search for locations to query for seatgeek's concerts.

## Setup
Instead of finding it on the ios and google play stores, you can run it locally:
1. Get NPM & Node.js (https://www.npmjs.com/get-npm) (tested on 12.16.1)
2. Get Expo: 
```bash
npm install -g expo-cli
```
3. If you have an expo account:
```bash
expo login
```
4. This project uses Yarn (https://classic.yarnpkg.com/en/docs/install)
```bash
yarn install
```
5. Create APIConfig.js in the main directory and export API_IP and API_MASTER_KEY that correlate to the backend.
6. Start with:
```bash
expo start
```

## Backend
This movile app needs a backend API to run. Currently one is running at 'my-artists-app.herokuapp.com' and the source code for it is here: https://github.com/samkovaly/SpotifyAPIMusicProfile. The front end and backend need a matchine key to work.

## License
[MIT License](/license)
