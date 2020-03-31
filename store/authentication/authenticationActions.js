
// first enter the app, should always work as long as my backend is functioning
export const SET_APP_CREDENTIALS = 'SET_APP_CREDENTIALS';
export const SET_CONCERTS_CREDENTIALS = 'SET_CREDENTIALS_CREDENTIALS';

export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USERNAME = 'SET_USERNAME';


import { makeAction } from '../../utilities/actions';
import { fetchNewUserTokens, fetchUsername, fetchAccessToken } from './authenticationEffects/spotifyRequests';
import { fetchSpotifyAppCredentials, fetchConcertsAPICredentials } from './authenticationEffects/backendRequests';
import { saveRefreshToken, saveUsername } from "./authenticationStorage"

/*
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ANALYZING_SPOTIFY = 'SET_ANALYZING_SPOTIFY';
*/


import { refreshAccessToken } from  './authenticationEffects/spotifyRequests';
import { registerUserBackend } from './authenticationEffects/backendRequests';



// first action called at the beginning of the app's lifecycle.
// fetches app credentials from backend and updates the state
export const getSpotifyAppCredentials = () => {
    return async (dispatch, getState) => {
        credentials = await fetchSpotifyAppCredentials()
        dispatch(makeAction(SET_APP_CREDENTIALS, credentials))
    }
}
// same for this guy
export const getConcertsAPICredentials = () => {
    return async (dispatch, getState) => {
        credentials = await fetchConcertsAPICredentials();
        dispatch(makeAction(SET_CONCERTS_CREDENTIALS, credentials));
    }
}
// gets refresh token from spotify (also gets initial access token but we ignore it to keep code architecture neat)
export const getRefreshToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        newUserTokens = await fetchNewUserTokens(auth.appCredentials);
        await saveRefreshToken(newUserTokens.refreshToken);
        dispatch(setRefreshTokenAction(newUserTokens.refreshToken));
    }
}
// retrieves username with our access token
export const getUsername = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication
        username = await fetchUsername(auth.accessToken.token);
        await saveUsername(username)
        dispatch(setUsernameAction(username))
    }
}
// acquires initial access token after logging in / registering or when a new one is needed due to expiration.
export const refreshAccessToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication
        if(needNewAccessToken(auth.accessToken.expireTime)){
            const newUserTokens = await fetchAccessToken(auth.appCredentials, auth.refreshToken)
            dispatch(setAccessTokenAction(newUserTokens.accessToken, newUserTokens.expireTime))
        }
    }
}



export const registerUser = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        console.log("requesting back end with auth:", auth)
        const registerResult = await registerUserBackend(auth.userAccessToken.token, 
            auth.userCredentials.userID, auth.userCredentials.refreshToken);
        // assuming it goes right for now:
        console.log("logging in / registerUser")
        console.log('result:', registerResult)
        dispatch(makeAction(LOGIN))
    }
}



export const logoutSpotify = () => {
    return async(dispatch, getState) => {
        
        // must update state as well as remove storage
    removeUserRefreshTokenStorage()
        dispatch(makeAction(LOGOUT))
    }
}



export const refreshSpotifyData = () => {
    return async(dispatch, getState) => {
        dispatch(makeAction(SET_ANALYZING_SPOTIFY, true))
        dispatch(updateAccessToken())
        const refreshData = await refreshBackendSpotifyData(getState().authentication.accessToken.token)
        // just need to now update the state with the new data (namely artistIds and later, concerts)
        
        dispatch(makeAction(SET_ANALYZING_SPOTIFY, false))
    }
}



const needNewAccessToken = (expireTime) => {
    const currentTime = new Date().getTime();
    return currentTime >= expireTime;
}


const setUserCredentialsAction = (userID, refreshToken) => {
    return makeAction(SET_USER_CREDENTIALS, {userID, refreshToken})
}




const setRefreshTokenAction = (refreshToken) => {
    return makeAction(SET_REFRESH_TOKEN, refreshToken);
}
const setAccessTokenAction = (accessToken, expireTime) => {
    return makeAction(SET_ACCESS_TOKEN,
    {
        token: accessToken,
        expireTime: expireTime,
    })
}
const setUsernameAction = (username) => {
    return makeAction(SET_USERNAME, username);
}
