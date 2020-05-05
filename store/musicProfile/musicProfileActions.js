export const SET_ARTISTS = 'SET_ARTISTS';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_ANALYZING_SPOTIFY = 'SET_ANALYZING_SPOTIFY';


import { makeAction } from '../../utilities/actions';
import { loadNewMusicProfile, fetchMusicProfile } from './musicProfileEffects';


export const refreshAndGetMusicProfile = () => {
    return async(dispatch, getState) => {
        console.log("analyzing spotify...");
        const auth = getState().authentication;
        
        const refreshStatus = await loadNewMusicProfile(auth.username, auth.backendAuthToken, auth.accessToken.token);
        if(refreshStatus == null){
            console.log('music profile refresh status of null, dispatching nothing');
            return;
        }
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
        const processedArtists = addConcertToArtists(artists)


        const tracks = JSON.parse(musicProfileJSON.tracks)
        const tracksMap = makeTracksIntoMap(tracks)

        console.log('dispatching new music profile to redux state...')
        await dispatch(setArtistsAction(processedArtists))
        await dispatch(setTracksAction(tracksMap))
    }
}


const addConcertToArtists = (artists) => {
    const processedArtists = Object.values(artists).map((artist) => {
        let slug = artist.name.trim()
        slug = slug.replace(/&| & | /g,"-")
        return {
            ...artist,
            slug: slug,
            showConcert: true
        }
    });
    return processedArtists;
}

const makeTracksIntoMap = (tracks) => {
    let tracksMap = new Map();
    for(var track of tracks){
        tracksMap.set(track.id, track);
    }

    return tracksMap;
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