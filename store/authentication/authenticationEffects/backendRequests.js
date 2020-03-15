
import { requestJSON, METHODS } from '../../../utilities/HTTPRequests'

// localDevIP will be replaced with a real backend URL once the backend is diployed
import { localDevIP } from '../../../localDevVariables';
export const BACKEND_API_URL = `http://${localDevIP}/musicprofiles`;

const BACKEND_CREDENTIALS_ENDPOINT = `${BACKEND_API_URL}/spotify-app-credentials`;
const BACKEND_SETUP_USER_ENDPOINT = `${BACKEND_API_URL}/spotify-music-profile`;
const BACKEND_REFRESH_DATA_ENDPOINT = `${BACKEND_API_URL}/refresh-spotify-music-profile`;

export const fetchSpotifyAppCredentials = async () => {
    const credentials = await requestJSON(BACKEND_CREDENTIALS_ENDPOINT, METHODS.GET)
    //console.log('fetched credentials: ', credentials)
    return credentials
};


export const registerUserBackend = async (accessToken, userID, refreshToken) => {
    console.log('Registering user at ', BACKEND_SETUP_USER_ENDPOINT)
    const headers = {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        'user-id': userID,
        'refresh-token': refreshToken,
    };
    const registerResult = await requestJSON(BACKEND_SETUP_USER_ENDPOINT, METHODS.GET, headers)
    return registerResult
}

export const refreshBackendSpotifyData = async(accessToken, userToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        'user-token': userToken,
    };
    const refreshResult = await requestJSON(BACKEND_REFRESH_DATA_ENDPOINT, METHODS.GET, headers)
    return refreshResult
}