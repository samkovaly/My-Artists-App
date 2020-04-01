

import { requestJSON, METHODS } from '../../utilities/HTTPRequests'
import { BACKEND_USERS } from '../authentication/authenticationEffects/backendRequests'

const BACKEND_MUSIC_PROFILE = `${BACKEND_USERS}music_profile/`;




// POST at this URL means that the backend with take a little bit to compile and compute
// a whole new music profile JSON to send back. backend requires access token for this
export const refreshSpotifyMusicProfile = async(username, backendAuthToken, accessToken) => {
    const headers = {
        'Authorization': `Token ${backendAuthToken}`,
        'Content-Type': 'application/json',
    };
    const body = {
        'access_token': accessToken,
    }
    const refreshStatus = await requestJSON(BACKEND_MUSIC_PROFILE + username, METHODS.POST, headers, body = body)
    return refreshStatus;
}


// GET at this URL means that it will retrive the music profile for this user
export const fetchSpotifyMusicProfile = async(username, backendAuthToken) => {
    const headers = {
        'Authorization': `Token ${backendAuthToken}`,
        'Content-Type': 'application/json',
    };
    const getResult = await requestJSON(BACKEND_MUSIC_PROFILE + username, METHODS.GET, headers)
    return getResult
}

