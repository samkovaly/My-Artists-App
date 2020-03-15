


import { getAccessToken, BACKEND_API_URL} from './authSpotifyActions';

import { SET_ARTISTS, ADD_ARTIST, SET_TRACKS, ADD_TRACK, SET_FETCHING_ACTIONS } from './types';


import { removeUserRefreshTokenStorage, saveArtistsStorage, saveTracksStorage, removeArtistsStorage, 
  removeTracksStorage, setMusicProfileSaved, getArtistsStorage, getTracksStorage } from './localStorage';





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