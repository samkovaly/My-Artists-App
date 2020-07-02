

import { requestBackend, METHODS } from '../../utilities/HTTPRequests'
import { BACKEND_USERS } from '../authentication/authenticationEffects/backendRequests'

const BACKEND_MUSIC_PROFILE = `${BACKEND_USERS}music_profile/`;


// POST at this URL means that the backend with take a little bit to compile and compute
// a whole new music profile JSON to send back. backend requires access token for this
// new user to the app or a user is requesting to refresh their data
// backend takes some seconds to process a new music profile and then
// a new one is ready for getMusicProfile to be called to get it.

export const loadNewMusicProfile = async(username, backendAuthToken, accessToken) => {
    const headers = {
        'Authorization': `Token ${backendAuthToken}`,
        'Content-Type': 'application/json',
    };
    const body = {
        'access_token': accessToken,
    }
    const refreshStatus = await requestBackend(BACKEND_MUSIC_PROFILE + username, METHODS.POST, headers, JSON.stringify(body))
    return refreshStatus;
}

// GET at this URL means that it will retrive the music profile for this user
export const fetchMusicProfile = async(username, backendAuthToken) => {
    const headers = {
        'Authorization': `Token ${backendAuthToken}`,
        'Content-Type': 'application/json',
    };
    const getResult = await requestBackend(BACKEND_MUSIC_PROFILE + username, METHODS.GET, headers)
    return getResult
}

