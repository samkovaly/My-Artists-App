

import * as SecureStore from 'expo-secure-store';

// Basic user refreshToken that goes into django backend and allows us to save their data.module-name
// Also allows instant login when using the app
const REFRESH_TOKEN = 'USER_REFRESH_TOKEN';
// returns: true, false
export const saveUserRefreshTokenStorage = async (token) => {
    try{
      await SecureStore.setItemAsync(REFRESH_TOKEN, token);
      return true;
    }catch(e){
      console.log(`Error while saving user authentication code to SecureStorage`);
      return false;
    }
  }
// returns: code or null
export const getUserRefreshTokenStorage = async() => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN);
}
// returns: true, false 
export const removeUserRefreshTokenStorage = async() => {
    try {
        await SecureStore.deleteItemAsync(REFRESH_TOKEN);
        return true;
    }
    catch(e) {
        return false;
    }
}






const MUSIC_PROFILE_SAVED = "MUSIC_PROFILE_SAVED"
const ARTIST_IDS = 'ARTIST_IDS';
const TRACK_IDS = 'TRACK_IDS';


/*
const addArtistStorage = async (artist) => {
    let currentNoConcertsArtists = await getNoConcertsArtistsStorage();
    const newNoConcertArtists = currentNoConcertsArtists ?
    [
        ...currentNoConcertsArtists,
        artistId,
    ] : 
    [
        artistId,
    ];
    await saveNoConcertsArtistsStorage(JSON.stringify(newNoConcertArtists));
}


const addArtistStorage = async (artist) => {
    let currentNoConcertsArtists = await getNoConcertsArtistsStorage();
    const newNoConcertArtists = currentNoConcertsArtists ?
    [
        ...currentNoConcertsArtists,
        ...artistIds,
    ] : 
    [
        ...artistIds,
    ];

    await saveNoConcertsArtistsStorage(JSON.stringify(newNoConcertArtists));
}
*/

export const checkMusicProfileSaved = async () => {
    profileSaved = await SecureStore.getItemAsync(MUSIC_PROFILE_SAVED)
    if(profileSaved != null){
        
        return true
    }else{
        return false
    }
}

export const setMusicProfileSaved = async(setTo) => {
    console.log('setting music profile storage to ', setTo)
    try{
        await SecureStore.setItemAsync(MUSIC_PROFILE_SAVED, JSON.stringify(setTo))
        return true
    }catch(e){
        console.log(`Error in localStorage.setMusicProfileSaved()`);
        console.log(e);
        return false;
    }
}

// a string of all artist IDs are saved and individual artists are saved under their ID
export const saveArtistsStorage = async (artists) => {
    console.log('saveArtistsStorage()')
    artistIDs = Object.values(artists).map((artist) => artist.id)
    await saveArtistIDsStorage(artistIDs)
    
    for(i = 0; i < artists.length; i++){
        await saveArtistStorage(artists[i])
    }
    return true;
}


// a string of all track IDs are saved and individual tracks are saved under their ID
export const saveTracksStorage = async (tracks) => {
    console.log('saveTracksStorage()')
    trackIDs = Object.values(tracks).map((track) => track.id)
    await saveTrackIDsStorage(trackIDs)

    for(i = 0; i < tracks.length; i++){
        await saveTrackStorage(tracks[i])
    }
    return true;
}

// no point in saving the artist/track ID in storage with the rest of the oject because the storage key is the id.
const filterOutParemeters = (name, val) => {
    if(name == "id"){
        return undefined // removes it from result
    }
    return val
}

// save one artist object under it's ID
const saveArtistStorage = async(artist) => {
    //console.log('saveArtistStorage()')
    try{
        artistJSON = JSON.stringify(artist, filterOutParemeters)
        await SecureStore.setItemAsync(artist.id, artistJSON)
    }catch(e){
        console.log(`Error in localStorage.saveArtistStorage()`);
        console.log(e);
        return false;
    }
}


// save one track object under it's ID
const saveTrackStorage = async(track) => {
    //console.log('saveTackStorage()')
    try{
        trackJSON = JSON.stringify(track, filterOutParemeters)
        await SecureStore.setItemAsync(track.id, trackJSON)
    }catch(e){
        console.log(`Error in localStorage.saveTackStorage()`);
        console.log(e);
        return false;
    }
}

// save all artist IDs under ARTIST_IDS
const saveArtistIDsStorage = async(artistIDs) => {
    //console.log('saveArtistIDsStorage()');
    try{
        artistIDsJSON = JSON.stringify(artistIDs)
        await SecureStore.setItemAsync(ARTIST_IDS, artistIDsJSON)
    }catch(e){
        console.log(`Error in localStorage.saveArtistIDsStorage()`);
        console.log(e);
        return false;
    }
}

// save all track IDs under TRACK_IDS
const saveTrackIDsStorage = async(trackIDs) => {
    console.log('saveTrackIDsStorage()');
    try{
        trackIDsJSON = JSON.stringify(trackIDs)
        await SecureStore.setItemAsync(TRACK_IDS, trackIDsJSON)
    }catch(e){
        console.log(`Error in localStorage.saveTrackIDsStorage()`);
        console.log(e);
        return false;
    }
}



// get string of all artist IDs, and get all artist objects using their IDs as the key in storage
export const getArtistsStorage = async() => {
    console.log('getArtistsStorage()');
    try{
        const allArtistIDs = await getArtistIDsStorage();
        let artists = [];
        for(i = 0; i < allArtistIDs.length; i++){
            artist = await getArtistStorage(allArtistIDs[i]);
            artists.push(artist)
        }
        return artists;
    }catch(e){
        console.log(`Error in localStorage.getArtistsStorage()`);
        console.log(e);
        return null;
      }
}

// get string of all track IDs, and get all track objects using their IDs as the key in storage
export const getTracksStorage = async() => {
    console.log('getTracksStorage()');
    try{
        const allTrackIDs = await getTrackIDsStorage();
        let tracks = [];
        for(i = 0; i < allTrackIDs.length; i++){
            track = await getTrackStorage(allTrackIDs[i]);
            tracks.push(track)
        }
        return tracks;
    }catch(e){
        console.log(`Error in localStorage.getTracksStorage()`);
        console.log(e);
        return null;
      }
}


// gets a long string of all the artist IDs in storage
const getArtistIDsStorage = async() => {
    try{
        const artistIDsJSON = await SecureStore.getItemAsync(ARTIST_IDS)
        const artistIDs = await JSON.parse(artistIDsJSON);
        return artistIDs;
    }catch(e){
        console.log(`Error in localStorage.getArtistIDsStorage()`);
        console.log(e);
        return null;
      }
}


// gets a long string of all the track IDs in storage
const getTrackIDsStorage = async() => {
    try{
        const trackIDsJSON = await SecureStore.getItemAsync(TRACK_IDS)
        const trackIDs = await JSON.parse(trackIDsJSON);
        return trackIDs;
    }catch(e){
        console.log(`Error in localStorage.getTrackIDsStorage()`);
        console.log(e);
        return null;
      }
}


// get artist object from storage using it's ID as key
// object returned does not have it's id as a property so it must be added
const getArtistStorage = async(artistID) => {
    try{
        const artistJSON = await SecureStore.getItemAsync(artistID);
        let artist = await JSON.parse(artistJSON);
        artist.id = artistID;
        return artist;
    }catch(e){
        console.log(`Error in localStorage.getArtistStorage()`);
        console.log(e);
        return null;
      }
}



// get track object from storage using it's ID as key
// object returned does not have it's id as a property so it must be added
const getTrackStorage = async(trackID) => {
    try{
        const trackJSON = await SecureStore.getItemAsync(trackID);
        let track = await JSON.parse(trackJSON);
        track.id = trackID;
        return track;
    }catch(e){
        console.log(`Error in localStorage.getTrackStorage()`);
        console.log(e);
        return null;
      }
}



// must first loop through all the artist IDs in storage and delete the
// artists one by one, via their ID key
// then the long string of ARTIST_IDS can be deleted
export const removeArtistsStorage = async () => {
    console.log('removeArtistsStorage()');
    try {
        const allArtistIDs = await getArtistIDsStorage();
        for(i = 0; i < allArtistIDs.length; i++){
            await SecureStore.deleteItemAsync(allArtistIDs[i]);
        }
        await SecureStore.deleteItemAsync(ARTIST_IDS);
        return true;
    }
    catch(e) {
        console.log(`Error in localStorage.removeArtistsStorage()`);
        console.log(e);
        return false;
    }
}
export const removeTracksStorage = async () => {
    console.log('removeTracksStorage()');
    try {
        const allTrackIDs = await getTrackIDsStorage();
        for(i = 0; i < allTrackIDs.length; i++){
            await SecureStore.deleteItemAsync(allTrackIDs[i]);
        }
        await SecureStore.deleteItemAsync(TRACK_IDS);
        return true;
    }
    catch(e) {
        console.log(`Error in localStorage.removeTracksStorage()`);
        console.log(e);
        return false;
    }
}

