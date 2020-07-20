
import { API_IP, API_MASTER_KEY } from '../../../APIConfig';
import { METHODS, requestBackend } from '../../../utilities/HTTPRequests';


const BACKEND_URL = `http://${API_IP}/`
const BACKEND_API_URL = `${BACKEND_URL}api/`;

const BACKEND_APP_CREDENTIALS_ENDPOINT =    `${BACKEND_API_URL}spotify-app-credentials/`;
const BACKEND_API_CREDENTIALS_ENDPOINT =       `${BACKEND_API_URL}API-credentials/`;

export const BACKEND_USERS =            `${BACKEND_API_URL}users/`;
export const BACKEND_REGISTER =         `${BACKEND_API_URL}register/`;
const BAKEND_LOGIN =                    `${BACKEND_API_URL}login/`



const AUTH_MASTER_KEY_HEADER = {
    'Authorization': `Token ${API_MASTER_KEY}`,
    'Content-Type': 'application/json',
}
export const fetchSpotifyAppCredentials = async () => {
    const credentials = await requestBackend(BACKEND_APP_CREDENTIALS_ENDPOINT, METHODS.GET, AUTH_MASTER_KEY_HEADER)
    return credentials
};
export const fetchAPICredentials = async () => {
    const credentials = await requestBackend(BACKEND_API_CREDENTIALS_ENDPOINT, METHODS.GET, AUTH_MASTER_KEY_HEADER)
    return credentials
};


export const registerUserForAuthToken = async (username, email, refreshToken, accessToken) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        'username': username,
        'email': email,
        'refresh_token': refreshToken,
        'access_token': accessToken,
    }
    const registerResult = await requestBackend(BACKEND_REGISTER, METHODS.POST, headers, JSON.stringify(body))
    return registerResult
}


export const LoginUserForAuthToken = async (username, refreshToken) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        'username': username,
        'refresh_token': refreshToken,
    }
    const loginResult = await requestBackend(BAKEND_LOGIN, METHODS.POST, headers, JSON.stringify(body))
    return loginResult
}
