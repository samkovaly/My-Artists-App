export const SET_ARTISTS = 'SET_ARTISTS';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_ANALYZING_SPOTIFY = 'SET_ANALYZING_SPOTIFY';
export const REFRESH_SPOTIFY_ERROR = 'REFRESH_SPOTIFY_ERROR';



import { makeAction } from '../../utilities/actions';
import { loadNewMusicProfile, fetchMusicProfile } from './musicProfileEffects';
import { refreshAccessToken } from '../authentication/authenticationActions'


export const refreshAndGetMusicProfile = () => {
    return async(dispatch, getState) => {
        console.log("analyzing spotify...");

        await dispatch(refreshAccessToken());

        const auth = getState().authentication;
        
        const refreshStatus = await loadNewMusicProfile(auth.username, auth.backendAuthToken, auth.accessToken.token);

        if(refreshStatus == null || refreshStatus.error){
            console.log('music profile refresh status of null, dispatchig a refresh spotify error');
            await dispatch(setRefreshSpotifyError(true));
        }else{
            await dispatch(getMusicProfile());
        }
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
        const artistsMap = makeArtistsIntoSlugMap(artists)

        const tracks = JSON.parse(musicProfileJSON.tracks)
        const tracksMap = makeTracksIntoMap(tracks)

        console.log('dispatching new music profile to redux state...')
        await dispatch(setArtistsAction(artistsMap))
        await dispatch(setTracksAction(tracksMap))
    }
}


const makeArtistsIntoSlugMap = (artists) => {

    // first sort alphabetically
    let sortedArtists = artists.sort((a, b) => (a.name > b.name) ? 1 : -1);
    
    // now add to map in sorted order using slug as key
    let artistsMap = new Map();
    for(var artist of sortedArtists){
        let slug = artist.name.trim()
        slug = slug.replace(/&| & | /g,"-")
        slug = slug.toLowerCase();
        artistsMap.set(slug, artist);
    }
    return artistsMap;
}


const makeTracksIntoMap = (tracks) => {
    let tracksMap = new Map();
    for(var track of tracks){
        tracksMap.set(track.id, track);
    }

    return tracksMap;
}



export const setRefreshSpotifyError = (val) => {
    return makeAction(REFRESH_SPOTIFY_ERROR, val);
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

export const getTracks = (trackIDs, allTracks) => {
    const tracks = trackIDs.map((id) => allTracks.get(id));
    return tracks
}