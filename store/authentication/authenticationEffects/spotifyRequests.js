

import Base64 from 'Base64';
import { requestSpotify, METHODS } from '../../../utilities/HTTPRequests';
import * as WebBrowser from 'expo-web-browser';
import { parse } from 'search-params'


const ACCOUNTS_URL = 'https://accounts.spotify.com/';
const CODE_ENDPOINT = ACCOUNTS_URL + 'authorize';
const TOKEN_ENDPOINT = ACCOUNTS_URL + 'api/token';

const USER_PERMISSION_SCOPES = ['user-library-read','playlist-read-private',
  'playlist-read-collaborative','user-top-read', 'user-read-email', 'user-follow-read'];

const USER_PROFILE_URL = 'https://api.spotify.com/v1/me';


export const fetchUser = async (accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
  const userProfile = await requestSpotify(USER_PROFILE_URL, METHODS.GET, headers);

  let displayName = userProfile.display_name ? userProfile.display_name : userProfile.email

  return {
    username: userProfile.id,
    displayName: displayName,
    email: userProfile.email,
  };
}


// user login, fetch access token and expire time with refresh token
export const fetchAccessToken = async (appCredentials, refreshToken) => {
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    return await fetchUserTokens(appCredentials, body);
  }

// user registration - new refresh token, auth code is discared as it's not needed for future calls
// fetches access token and refresh token
export const fetchNewUserTokens = async (appCredentials) => {
    const authCode = await fetchUserAuthCode(appCredentials);
    if(!authCode) return null
    const body = `grant_type=authorization_code&code=${authCode}&redirect_uri=${appCredentials.redirectUri}`;
    return await fetchUserTokens(appCredentials, body);
}

// this function prompts the user with the spotify login
const fetchUserAuthCode = async (appCredentials) => {
  const scopes = USER_PERMISSION_SCOPES.join(' ');

  const authUrl = CODE_ENDPOINT +
  '?response_type=code' +
  '&client_id=' +
  appCredentials.clientId +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' +
  encodeURIComponent(appCredentials.redirectUri) +
  '&show_dialog=true'

  console.log(appCredentials.redirectUri);
  const result = await WebBrowser.openAuthSessionAsync(authUrl, appCredentials.redirectUri);
  console.log(result)

  if(result.type == "success"){
    const paramMap = parse(result.url);
    const code = paramMap.code;
    return code; 
  }else if(result.type == "cancel"){
    return null
  }else if(result.type == 'error'){
    console.log('User fetch auth error:', result)
    return null
  }
}
  
// used for new access tokens and for renewing old ones
const fetchUserTokens = async (appCredentials, body) =>{
    const appCredentialsB64 = Base64.btoa(`${appCredentials.clientId}:${appCredentials.clientSecret}`);

    const headers = {
        Authorization: `Basic ${appCredentialsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    const tokensData = await requestSpotify(TOKEN_ENDPOINT, METHODS.POST, headers, body)

    const expireTime = new Date().getTime() + tokensData.expires_in * 1000;
    const tokens = {
        accessToken: tokensData.access_token,
        refreshToken: tokensData.refresh_token,
        expireTime: expireTime,
      };
    return tokens;
}