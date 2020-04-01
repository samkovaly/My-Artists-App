export const SET_ARTISTS = 'SET_ARTISTS';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_ANALYZING_SPOTIFY = 'SET_ANALYZING_SPOTIFY';


import { makeAction } from '../../utilities/actions';
import { refreshSpotifyMusicProfile, fetchSpotifyMusicProfile } from './musicProfileEffects';


// new user to the app or a user is requesting to refresh their data
// backend takes some seconds to process a new music profile and then
// a new one is ready for getMusicProfile to be called to get it.
export const loadNewMusicProfile = () => {
    return async(dispatch, getState) => {
        auth = getState().authentication
        dispatch(setAnalyzingSpotifyAction(true))
        const refreshStatus = await refreshBackendSpotifyData(auth.username, auth.backendAuthToken, auth.accessToken.token)
        dispatch(setAnalyzingSpotifyAction(false))
    }
}
// open the app, app remembers who user is (storage), and then this is automatically
// called to populate the state (backend simply returns what is in the databse)
export const getMusicProfile = () => {
    return async(dispatch, getState) => {
        auth = getState().authentication
        const musicProfileJSON = await fetchSpotifyMusicProfile(auth.username, auth.backendAuthToken);

        const artists = JSON.parse(musicProfileJSON.artists).slice(0,50)
        const processedArtists = processArtists(artists)
        const tracks = JSON.parse(musicProfileJSON.tracks).slice(0,50)
        const processedTracks = processArtists(tracks)
        
        console.log('artists[0]', artists[0])
        console.log('tracks[0]', tracks[0])

        dispatch(setArtistsAction(processedArtists))
        dispatch(setArtistsAction(processedTracks))
    }
}


const processArtists = (artists) => {
    const processedArtists = Object.values(artists).map((artist) => {return {
        ...artist,
        showConcert: true
      }});
    return processedArtists;
}
const processTracks = (tracks) => {
    const processedTracks = Object.values(tracks).map((track) => {return {
        ...track,
        //showConcert: true
      }});
    return processedTracks;
}

  

const setArtistsAction = (artists) => {
    return makeAction(SET_ARTISTS, artists);
}
const setTracksAction = (tracks) => {
    return makeAction(SET_TRACKS, tracks);
}

const setAnalyzingSpotifyAction = (toValue) => {
    return makeAction(SET_ANALYZING_SPOTIFY, toValue);
}