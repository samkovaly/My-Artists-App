

export const SET_ARTIST_IDS = 'SET_ARTIST_IDS';
export const SET_ARTISTS = 'SET_ARTISTS';
export const FETCH_ARTISTS_DATA = 'FETCH_ARTISTS_DATA'
//export const ADD_ARTIST = 'ADD_ARTIST';


//import { removeUserRefreshTokenStorage, saveArtistsStorage, saveTracksStorage, removeArtistsStorage, 
//  removeTracksStorage, setMusicProfileSaved, getArtistsStorage, getTracksStorage } from './localStorage';
import { makeAction } from '../../utilities/actions';

import { fetchArtistIds } from './artistsEffects';




export const getArtistIds = () => {
  return async (dispatch, getState) => {
    const artistIds = fetchArtistIds() // pass oauth token to my backend?
    
    dispatch(makeAction(SET_ARTIST_IDS, artistIds))
  }
}












// fetches a user's JSON MusicProfile (defined by and from this app's backend)
const fetchMusicProfile = async(accessToken) => {
    console.log('FETCHING ', BACKEND_MUSIC_PROFILE)
    const response = await fetch(BACKEND_MUSIC_PROFILE, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
        },
    });
    const responseJson = await response.json();
    if(responseJson.error){
      console.log("ERROR while fetching music profile:");
      console.log(responseJson);
      return null;
    }
    return responseJson;
  }



export const setMusicProfileFromStorage = async (dispatch) => {
  console.log('setting music profile from storage')
  const artists = await getArtistsStorage()
  const tracks = await getTracksStorage()

  dispatch(createSetArtistsAction(artists))
  dispatch(createSetTracksAction(tracks))
}

export const setMusicProfileFromAPI = async (userAuth, dispatch) => {
  console.log('setting music profile from API')
    dispatch(createFetchingArtistsAction(true))
    
    const newUserAuth = await getAccessToken(userAuth, dispatch);
    const musicProfileJSON = await fetchMusicProfile(newUserAuth.accessToken);

    const artists = JSON.parse(musicProfileJSON.artists).slice(0,50)
    const tracks = JSON.parse(musicProfileJSON.tracks).slice(0,50)
    console.log('artists', artists[0])
    console.log('tracks', tracks[0])

    // don't need to await since the rest of the function does not depend on these.
    saveMusicProfileToStorage(artists, tracks)
    setMusicProfileSaved(true)

    dispatch(createSetArtistsAction(artists))
    dispatch(createSetTracksAction(tracks))
    dispatch(createFetchingArtistsAction(false))
}

const createFetchingArtistsAction = (setTo) => {
    return {
        type: SET_FETCHING_ACTIONS,
        payload: setTo,
    }
}

const createSetArtistsAction = (artists) => {
    const artistsPayload = Object.values(artists).map((artist) => {return {
        ...artist,
        showConcert: true
      }});
    return {
        type: SET_ARTISTS,
        payload: artistsPayload,
    }
}

const createSetTracksAction = (tracks) => {
    return {
        type: SET_TRACKS,
        payload: tracks,
    }
}

const saveMusicProfileToStorage = async (artists, tracks) => {
    //await removeArtistsStorage();
    //await removeTracksStorage();
  
    await saveArtistsStorage(artists);
    await saveTracksStorage(tracks);
  }