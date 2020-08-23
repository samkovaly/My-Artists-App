
# My Artists Mobile App
My Artists is a React Native ios/android app that helps you find local concerts of your favorite artists by analyzing your Spotify data. It's the only app that automates this whole process in just one tap. After signing in with your Spotify account, concerts tailored just for you are immediately fetched and displayed.
<br/>
[Google Play Store](https://play.google.com/store/apps/details?id=xilernet.myartists)
<br/>
[Backend API of this project](https://github.com/samkovaly/SpotifyAPIMusicProfile)

## Screenshots
<p align="center">
<img src="/screenshots/login.PNG" width="160">
<img src="/screenshots/concerts-my.PNG" width="160">
<img src="/screenshots/concerts-detail-2.PNG" width="160">
<img src="/screenshots/artist-detail-upcoming.PNG" width="160">
<img src="/screenshots/artists-1.PNG" width="160">
</p>

## Navigation Screens
### Concerts
**My Concerts** Only shows concerts featuring your favorite artists in a city near you. **All Concerts** Shows all the concerts near you. **Favorites** shows concerts that you have saved for later. The top button brings up concert filters where you can change location, radius and how many months to look ahead. Tap a concert to see more details on it.

### Artists
See what artists you have been listening to recently, as well as long time favorites of yours. Search for specific artists and view them in more detail. You can see if they have upcoming concerts and what tracks you like from them.

### Discovery
Discovery lets you search for any concert or artist, even if you don't listen to them on Spotify.


## Technologies
This project uses:
* React Native
    * Expo
    * Entirely React Hooks
    * ES6
    * React Navigation 5
    * Redux with Thunk middleware
* APIs
    * Spotify
    * Seatgeek
    * Google Places Autocomplete

The [backend API of this project](https://github.com/samkovaly/SpotifyAPIMusicProfile) (which is currently hosted on Heroku) uses:
* Python (3.7)
* Django
    * Rest Framework
* Pandas
* asyncio & aiohttp
* Postgres
* Spotify API


## How it works
The first step is to login to the app via your Spotify credentials. This auth information (access token and refresh token) is then passed to a custom Django backend which verifies the user and then makes numerous calls to Spotify's API with the user's credentials. It collects the user's artists and uses Python Pandas to create a large dataframe of all these artists and tracks. The result is translated to JSON and returned. This data is then passed to the global Redux state which propagates the whole app.

The app retrieves concerts from the Seatgeek API. When it does so, it filters them by the user's Spotify artists, which results in the *My Artist* tab on the concerts screen. Location is received from the user's current location if they approve, or from the Google Places Autocomplete API in which users can use to search for any location. This location is included in the Seatgeek API query when requesting concerts data.

The components are purely React Hooks and hooks like `useState`, `useSelector`, `useNavigation` and `useEffect` are used frequently. Many custom components were designed instead of generic ones in order to achieve the exact functionality and UI that was needed for this app.

`/store` contains all the Redux logic where each subfolder has effects (async fetch of third-party data), actions (commands to update state) and reducers (the state).

`/screens` contains all the screens of the app and `/components` contains all the custom components.


## Setup
Find it on the ios/android app stores or run it locally with Expo:
1. Get NPM & Node.js (https://www.npmjs.com/get-npm) (tested on 12.16.1)
2. Get Expo: ```npm install -g expo-cli```
3. If you have an expo account: ```expo login```
4. This project uses Yarn (https://classic.yarnpkg.com/en/docs/install), run ```yarn install```
5. Create APIConfig.js in the main directory and export API_IP and API_MASTER_KEY that correlate to the backend.
6. Start with: ```expo start```

## Backend
This mobile app needs a backend API to run. Currently one is running at *my-artists-app.herokuapp.com* and the source code for it is [here](https://github.com/samkovaly/SpotifyAPIMusicProfile). The front end and backend need a matching key to work.

[MIT License](/license)
