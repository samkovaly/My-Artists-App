
export const SET_FETCHING_USER_STORAGE = 'SET_FETCHING_USER_STORAGE';
export const SET_USER_SAVED_ON_STORAGE = 'SET_USER_SAVED_ON_STORAGE';
// first enter the app, should always work as long as my backend is functioning
export const SET_APP_CREDENTIALS = 'SET_APP_CREDENTIALS';
export const SET_API_CREDENTIALS = 'SET_API_CREDENTIALS';

export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_BACKEND_AUTH_TOKEN = 'SET_BACKEND_AUTH_TOKEN';

export const LOGIN = 'LOGIN';


import { LOGOUT } from '../globalActions'

import { makeAction } from '../../utilities/actions';
import { fetchNewUserTokens, fetchUsername, fetchAccessToken } from './authenticationEffects/spotifyRequests';
import { fetchSpotifyAppCredentials, fetchAPICredentials, fetchSpotifyMusicProfile } from './authenticationEffects/backendRequests';
import { registerUserForAuthToken, LoginUserForAuthToken } from './authenticationEffects/backendRequests';
import { saveRefreshTokenStorage, saveUsernameStorage, saveBackendAuthTokenStorage, removeAllStorage, saveUserSavedOnStorage } from "./authenticationStorage";

import { getUsernameStorage, getRefreshTokenStorage, getBackendAuthTokenStorage } from "./authenticationStorage";




// first action called at the beginning of the app's lifecycle.
// fetches app credentials from backend and updates the state
export const getSpotifyAppCredentials = () => {
    return async (dispatch, getState) => {
        credentials = await fetchSpotifyAppCredentials()
        await dispatch(makeAction(SET_APP_CREDENTIALS, credentials))
    }
}
// same for this guy
export const getAPICredentials = () => {
    return async (dispatch, getState) => {
        credentials = await fetchAPICredentials();
        await dispatch(makeAction(SET_API_CREDENTIALS, credentials));
    }
}




// called by authLoadingScreen component
export const setAuthStateFromStorage = () => {
    return async (dispatch, getState) => {
        
        refreshToken = await getRefreshTokenStorage();
        await dispatch(setRefreshTokenAction(refreshToken));
        console.log('setAuthStateFromStorage')
        await dispatch(refreshAccessToken());

        username = await getUsernameStorage();
        await dispatch(setUsernameAction(username));

        backendAuthToken = await getBackendAuthTokenStorage();
        await dispatch(makeAction(SET_BACKEND_AUTH_TOKEN, backendAuthToken));

        //console.log('after auto login, auth state is:', getState().authentication)
    }
}


export const saveAuthStateToStorage = async (authentication) => {
    console.log('saving the stuff')
    await saveRefreshTokenStorage(authentication.refreshToken);
    await saveUsernameStorage(authentication.username)
    await saveBackendAuthTokenStorage(authentication.backendAuthToken)
    await saveUserSavedOnStorage(true)
}


export const registerWithRefreshToken = () => {
    return async (dispatch, getState) => {
        console.log('rwrt')
        // prompts for user to sign into spotify with their username / password

        console.log('registerWithRefreshToken')
        await dispatch(refreshAccessToken());
        await dispatch(getUsername());
        await dispatch(getBackendAuthToken());

        await saveAuthStateToStorage(getState().authentication)
        
    }
}


// gets refresh token from spotify (also gets initial access token but we ignore it to keep code architecture neat)
export const getRefreshToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        newUserTokens = await fetchNewUserTokens(auth.appCredentials);
        if(newUserTokens){
            await dispatch(setRefreshTokenAction(newUserTokens.refreshToken));
            return true;
        }else{
            // dispatches null if the user refused (or some other error)
            await dispatch(setRefreshTokenAction(null));
            return false;
        }
    }
}
// retrieves username with our access token
export const getUsername = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication
        username = await fetchUsername(auth.accessToken.token);
        await dispatch(setUsernameAction(username))
    }
}
// acquires initial access token after logging in / registering or when a new one is needed due to expiration.
export const refreshAccessToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication
        console.log('refreshAccessToken')
        if(needNewAccessToken(auth.accessToken.expireTime)){
            const newUserTokens = await fetchAccessToken(auth.appCredentials, auth.refreshToken)
            await dispatch(setAccessTokenAction(newUserTokens.accessToken, newUserTokens.expireTime))
        }
    }
}


// this auth token will allow the user to get their spotify music profile data
// from the backend.
export const getBackendAuthToken = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        //console.log("requesting backend user auth token with current auth state:", auth)
        // register user, does not if they are already registered
        console.log("registering with: refresh: ", auth.refreshToken)
        await registerUserForAuthToken(auth.username, auth.refreshToken, auth.accessToken.token)
        // login user and get auth token as return value
        backendAuthTokenResult = await LoginUserForAuthToken(auth.username, auth.refreshToken)
        console.log('\n', backendAuthTokenResult, '\n')
        await dispatch(makeAction(SET_BACKEND_AUTH_TOKEN, backendAuthTokenResult.token))
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
        await dispatch(makeAction(LOGOUT));
        // component calling this will have to redirect elsewhere (to start of app flow most likely)
    }
}


const needNewAccessToken = (expireTime) => {
    //console.log('need new access token?')
    const currentTime = new Date().getTime();
    //console.log('expireTime: ', expireTime, 'currentTime:', currentTime)
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


export const confirmUserBackend = async (username, refreshToken, backendAuthToken) => {
    const loginResult = await LoginUserForAuthToken(username, refreshToken);
    if(loginResult.status){
        return false;
    }else{
        if(backendAuthToken != loginResult.token){
            return false;
        }
    }
    return true;
}





export const loginIfReturning = () => {
    return async(dispatch, getState) => {
        const savedOnStorage = await getUserSavedOnStorage();
        if(savedOnStorage == null){
            // first time user / logged out user

        }else{
            // local storage has our login info

        }

    }
}



export const fetchUserStorage = () => {
    return async(dispatch, getState) => {
        await dispatch(setFetchingUserStorageAction(true));
        let savedOnStorage = await getUserSavedOnStorage();
        let userSaved = savedOnStorage != null;
        await dispatch(setUserSavedOnStorageAction(userSaved));
        await dispatch(setFetchingUserStorageAction(false));
    }
}