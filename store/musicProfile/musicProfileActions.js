export const SET_ARTISTS = 'SET_ARTISTS';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_ANALYZING_SPOTIFY = 'SET_ANALYZING_SPOTIFY';


import { makeAction } from '../../utilities/actions';
import { loadNewMusicProfile, fetchMusicProfile } from './musicProfileEffects';


export const refreshAndGetMusicProfile = () => {
    return async(dispatch, getState) => {
        console.log("analyzing spotify...");
        const auth = getState().authentication;
        
        await loadNewMusicProfile(auth.username, auth.backendAuthToken, auth.accessToken.token);
        await dispatch(getMusicProfile());
    }
}



// open the app, app remembers who user is (storage), and then this is automatically
// called to populate the state (backend simply returns what is in the databse)
export const getMusicProfile = () => {
    return async(dispatch, getState) => {
        auth = getState().authentication
        
        const musicProfile = await fetchMusicProfile(auth.username, auth.backendAuthToken);

        const musicProfileJSON = JSON.parse(musicProfile.music_profile_JSON)
        const lastRefreshed = musicProfile.last_refreshed

        const artists = JSON.parse(musicProfileJSON.artists)
        const processedArtists = processArtists(artists)

        const tracks = JSON.parse(musicProfileJSON.tracks)
        const processedTracks = processArtists(tracks)

        //console.log('\n',processedArtists.slice(0,10) ,'\n')
        console.log('dispatching new music profile to redux state...')
        await dispatch(setArtistsAction(processedArtists))
        await dispatch(setTracksAction(processedTracks))
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

export const setAnalyzingSpotifyAction = (toValue) => {
    return makeAction(SET_ANALYZING_SPOTIFY, toValue);
}