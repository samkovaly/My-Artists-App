
import { requestBackend, METHODS } from '../../../utilities/HTTPRequests'

// localDevIP will be replaced with a real backend URL once the backend is diployed
import { localDevIP, APIMasterKey } from '../../../localDevVariables';

const BACKEND_URL = `http://${localDevIP}/`
const BACKEND_API_URL = `${BACKEND_URL}api/`;

const BACKEND_APP_CREDENTIALS_ENDPOINT =    `${BACKEND_API_URL}spotify-app-credentials/`;
const BACKEND_API_CREDENTIALS_ENDPOINT =       `${BACKEND_API_URL}API-credentials/`;

export const BACKEND_USERS =            `${BACKEND_API_URL}users/`;
export const BACKEND_REGISTER =         `${BACKEND_API_URL}register/`;
const BAKEND_LOGIN =                    `${BACKEND_API_URL}login/`



const AUTH_MASTER_KEY_HEADER = {
    'Authorization': `Token ${APIMasterKey}`,
    'Content-Type': 'application/json',
}
export const fetchSpotifyAppCredentials = async () => {
    const credentials = await requestBackend(BACKEND_APP_CREDENTIALS_ENDPOINT, METHODS.GET, AUTH_MASTER_KEY_HEADER)
    //console.log(credentials)
    return credentials
};
export const fetchAPICredentials = async () => {
    const credentials = await requestBackend(BACKEND_API_CREDENTIALS_ENDPOINT, METHODS.GET, AUTH_MASTER_KEY_HEADER)
    //console.log(credentials)
    return credentials
};


export const registerUserForAuthToken = async (username, refreshToken, accessToken) => {
    //console.log('Registering user at ', BACKEND_REGISTER)
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        'username': username,
        'refresh_token': refreshToken,
        'access_token': accessToken,
    }
    //console.log('register body:', body)
    const registerResult = await requestBackend(BACKEND_REGISTER, METHODS.POST, headers, JSON.stringify(body))
    //console.log('\n1 Register result:', registerResult, '\n')
    return registerResult
}


export const LoginUserForAuthToken = async (username, refreshToken) => {
    //console.log('Loggin in user at ', BAKEND_LOGIN)
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        'username': username,
        'refresh_token': refreshToken,
    }
    const loginResult = await requestBackend(BAKEND_LOGIN, METHODS.POST, headers, JSON.stringify(body))
    //console.log('\n1 Login result:', loginResult, '\n')
    return loginResult
}
