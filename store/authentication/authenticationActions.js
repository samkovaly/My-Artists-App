
// first enter the app, should always work as long as my backend is functioning
export const SET_APP_CREDENTIALS = 'SET_APP_CREDENTIALS';
export const SET_CONCERTS_CREDENTIALS = 'SET_CREDENTIALS_CREDENTIALS';

export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_BACKEND_AUTH_TOKEN = 'SET_BACKEND_AUTH_TOKEN';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

import { makeAction } from '../../utilities/actions';
import { fetchNewUserTokens, fetchUsername, fetchAccessToken } from './authenticationEffects/spotifyRequests';
import { fetchSpotifyAppCredentials, fetchConcertsAPICredentials, fetchSpotifyMusicProfile } from './authenticationEffects/backendRequests';
import { registerUserForAuthToken, LoginUserForAuthToken } from './authenticationEffects/backendRequests';
import { saveRefreshTokenStorage, saveUsernameStorage, saveBackendAuthTokenStorage, removeAllStorage } from "./authenticationStorage";

import { getUsernameStorage, getRefreshTokenStorage, getBackendAuthTokenStorage } from "./authenticationStorage";




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




// called by authLoadingScreen component
export const loginWithUserAuthStorage = () => {
    return async (dispatch, getState) => {
        
        refreshToken = await getRefreshTokenStorage();
        await dispatch(setRefreshTokenAction(newUserTokens.refreshToken));

        await dispatch(refreshAccessToken());

        username = await getUsernameStorage();
        await dispatch(setUsernameAction(username));

        backendAuthToken = await getBackendAuthTokenStorage();
        await dispatch(makeAction(SET_BACKEND_AUTH_TOKEN, backendAuthToken));

        await dispatch(login());
    }
}

export const RegisterWithSpotifyFetch = () => {
    return async (dispatch, getState) => {
        // prompts for user to sign into spotify with their username / password
        await dispatch(getRefreshToken());

        await dispatch(refreshAccessToken());
        await dispatch(getUsername());
        await dispatch(getBackendAuthToken());

        await dispatch(login());
    }
}



// gets refresh token from spotify (also gets initial access token but we ignore it to keep code architecture neat)
export const getRefreshToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        newUserTokens = await fetchNewUserTokens(auth.appCredentials);
        await saveRefreshTokenStorage(newUserTokens.refreshToken);
        dispatch(setRefreshTokenAction(newUserTokens.refreshToken));
    }
}
// retrieves username with our access token
export const getUsername = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication
        username = await fetchUsername(auth.accessToken.token);
        await saveUsernameStorage(username)
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


// this auth token will allow the user to get their spotify music profile data
// from the backend.
export const getBackendAuthToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        console.log("requesting backend user auth token with current auth state:", auth)
        // register user, does not if they are already registered
        await registerUserForAuthToken(auth.username, auth.refreshToken)
        // login user and get auth token as return value
        backendAuthToken = await LoginUserForAuthToken(auth.username, auth.refreshToken)
        await saveBackendAuthTokenStorage(backendAuthToken)
        dispatch(makeAction(SET_BACKEND_AUTH_TOKEN, backendAuthToken))
    }
}




export const login = () => {
    return async(dispatch, getState) => {
        dispatch(makeAction(LOGIN))
    }
}
export const logout = () => {
    return async(dispatch, getState) => {
        // comprises deleting all local storage
        // and updating state to reflect a new app open
        await removeAllStorage();
        // logout action will reset the app state
        dispatch(makeAction(LOGOUT))
        // component calling this will have to redirect elsewhere (to start of app flow most likely)
    }
}


const needNewAccessToken = (expireTime) => {
    const currentTime = new Date().getTime();
    return currentTime >= expireTime;
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