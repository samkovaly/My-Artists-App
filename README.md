# My Artists App
This Expo.io app automatically connects to user’s Spotify accounts and utilizes my custom backend API (in another repository) to retrieves all the user's favorite artists. It then displays local concerts/clubs featuring these artists.
Technologies include: React Native, Expo and Redux


## Backend
Needs the backend running. Currently one is running at 'my-artists-app.herokuapp.com'
Backend source code is here: https://github.com/samkovaly/SpotifyAPIMusicProfile
Need a consistent master key to connect the app to it's backend.

## Setup
1. Pull from git hub
2. Get NPM & Node.js (https://www.npmjs.com/get-npm) (tested on 12.16.1)
3. npm install -g expo-cli
4. "expo login" if you have an expo account
5. Get yarn if you don't have it (https://classic.yarnpkg.com/en/docs/install/#windows-stable)
6. run "yarn install"
7. make file 'APIConfig.js' in the main directory and export API_IP and API_MASTER_KEY that correlate to the backend.
8. expo run
9. run via expo app on your device.