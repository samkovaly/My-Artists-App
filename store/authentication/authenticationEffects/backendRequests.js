
import { requestJSON, METHODS } from '../../../utilities/HTTPRequests'

// localDevIP will be replaced with a real backend URL once the backend is diployed
import { localDevIP, APIMasterKey } from '../../../localDevVariables';

const BACKEND_URL = `http://${localDevIP}/`

const BAKEND_LOGIN = `${BACKEND_URL}auth/`
export const BACKEND_API_URL = `${BACKEND_URL}api/`;

const BACKEND_CREDENTIALS_ENDPOINT = `${BACKEND_API_URL}spotify-app-credentials/`;
const BACKEND_CONCERTS_ENDPOINT = `${BACKEND_API_URL}concerts-APIs-credentials/`;

const BACKEND_USERS = `${BACKEND_API_URL}users/`;
const BACKEND_MUSIC_PROFILE = `${BACKEND_USERS}music_profile/`;

const AUTH_MASTER_KEY_HEADER = {
    'Authorization': `Token ${APIMasterKey}`,
    'Content-Type': 'application/json',
}

export const fetchSpotifyAppCredentials = async () => {
    const credentials = await requestJSON(BACKEND_CREDENTIALS_ENDPOINT, METHODS.GET, AUTH_MASTER_KEY_HEADER)
    console.log('fetched app credentials: ', credentials)
    return credentials
};


export const fetchConcertsAPICredentials = async () => {
    const credentials = await requestJSON(BACKEND_CONCERTS_ENDPOINT, METHODS.GET, AUTH_MASTER_KEY_HEADER)
    console.log('fetched concerts credentials: ', credentials)
    return credentials
};


export const registerUserBackend = async (userID, refreshToken) => {
    console.log('Registering user at ', BACKEND_USERS)
    
    const body = {
        'username': userID,
        'password': getPasswordFromToken(refreshToken), // [0:15]
        'refresh_token': refreshToken,
    }
    const registerResult = await requestJSON(BACKEND_USERS, METHODS.POST, AUTH_MASTER_KEY_HEADER, JSON.stringify(body))
    return registerResult
}


export const LoginUserBackend = async (userID, refreshToken) => {
    console.log('Loggin in user at ', BACKEND_USERS)
    
    const body = {
        'username': userID,
        'password': getPasswordFromToken(refreshToken), // [0:15]
    }
    const registerResult = await requestJSON(BAKEND_LOGIN, METHODS.POST, null, JSON.stringify(body))
    return registerResult
}


export const getSpotifyMusicProfile = async(userID, userToken) => {
    const headers = {
        'Authorization': `Token ${userToken}`,
        'Content-Type': 'application/json',
    };
    const getResult = await requestJSON(BACKEND_MUSIC_PROFILE + userID, METHODS.GET, headers)
    return getResult
}

export const refreshSpotifyMusicProfile = async(userID, accessToken, userToken) => {
    const headers = {
        'Authorization': `Token ${userToken}`,
        'Content-Type': 'application/json',
    };
    const body = {
        'access_token': accessToken,
    }
    const refreshResult = await requestJSON(BACKEND_MUSIC_PROFILE + userID, METHODS.POST, headers, body = body)
    return refreshResult
}



const getPasswordFromToken = (token) => {
    return token.substring(0, 15)
}