
export const SET_APP_CREDENTIALS = 'SET_APP_CREDENTIALS';
export const SET_USER_CREDENTIALS = 'SET_USER_CREDENTIALS';

export const SET_USER_ACCESS_TOKEN = 'SET_USER_ACCESS_TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ANALYZING_SPOTIFY = 'SET_ANALYZING_SPOTIFY'

export const SET_CONCERT_API_KEYS = 'SET_CONCERT_API_KEYS';

import { saveUserRefreshToken, getUserRefreshToken, removeUserRefreshToken } from './authenticationStorage';

import { refreshAccessToken, getNewUserTokens, fetchUserID } from  './authenticationEffects/spotifyRequests';
import { fetchSpotifyAppCredentials, registerUserBackend } from './authenticationEffects/backendRequests';
import { makeAction } from '../../utilities/actions'



// first action called at the beginning of the app's lifecycle.
export const getSpotifyAppCredentials = () => {
    return async (dispatch, getState) => {
        credentials = await fetchSpotifyAppCredentials()
        dispatch(makeAction(SET_APP_CREDENTIALS, credentials))
    }
}


// monolithic action function used to login into the app
// used for both new and returning users
// is userID and refreshToken are passed, then the user is returning
// otherwise, it's a new user
export const getAccessTokenInitial = (userID = null, refreshToken = null) => {
    return async (dispatch, getState) => {
        const auth = getState.authentication
        // if userID and refreshToken are passed as constants..
        let newUserID = userID
        let newRefreshToken = refreshToken
        let newUserTokens = null

        if(!userID || !refreshToken){
            // if no userID in local storage - then must be new user
            // need user id & refresh token
            newUserTokens = await getNewUserTokens(auth.appCredentials)
            newUserID = fetchUserID()
            newRefreshToken = newUserTokens.refreshToken
        }else{
            // must be returning user (refresh token was saved on the local device)
            newUserTokens = await refreshAccessToken(auth.appCredentials, auth.userCredentials.refreshToken)
        }
        // update user credentials (userID, refreshToken)
        dispatch(setUserCredentialsAction(newUserID, newRefreshToken))
        // update access token and expireTime for access token
        dispatch(setUserAccessTokenAction(newUserTokens))
    }
}

// used when fetching from spotify afte the initial login,
// access tokens expire within minutes so they need to be cheked before every spotify request
export const updateAccessToken = () => {
    return async (dispatch, getState) => {
        const auth = getState.authentication
        if(needNewAccessToken(auth.userAccessToken.expireTime)){
            const newUserTokens = await refreshAccessToken(auth.appCredentials, auth.userCredentials.refreshToken)
            dispatch(setUserAccessTokenAction(newUserTokens))
        }
    }
}
const setUserAccessTokenAction = (newUserTokens) => {
    return makeAction(SET_USER_ACCESS_TOKEN,
    {
        token: newUserTokens.accessToken,
        expireTime: newUserTokens.expireTime,
    })
}


const setUserCredentialsAction = (userID, refreshToken) => {
    return makeAction(SET_USER_CREDENTIALS, {userID, refreshToken})
}


const needNewAccessToken = (expireTime) => {
    const currentTime = new Date().getTime();
    return currentTime >= expireTime;
}


export const registerUser = () => {
    return async (dispatch, getState) => {
        const auth = getState.authentication;
        const registerResult = await registerUserBackend(auth.userAccessToken.token, 
            auth.userCredentials.userID, auth.userCredentials.refreshToken);
        // assuming it goes right for now:
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
        const refreshData = await refreshBackendSpotifyData(getState.authentication.accessToken.token)
        // just need to now update the state with the new data (namely artistIds and later, concerts)
        
        dispatch(makeAction(SET_ANALYZING_SPOTIFY, false))
    }
}