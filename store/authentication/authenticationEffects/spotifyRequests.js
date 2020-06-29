
import { AuthSession } from 'expo';
import Base64 from 'Base64';
import { requestJSON, METHODS } from '../../../utilities/HTTPRequests';


const ACCOUNTS_URL = 'https://accounts.spotify.com/';
const CODE_ENDPOINT = ACCOUNTS_URL + 'authorize';
const TOKEN_ENDPOINT = ACCOUNTS_URL + 'api/token';

const USER_PERMISSION_SCOPES = ['user-library-read','playlist-read-private',
  'playlist-read-collaborative','user-top-read', 'user-follow-read'];

const USER_PROFILE_URL = 'https://api.spotify.com/v1/me';


export const fetchUsername = async (accessToken) => {
  //console.log(`fetchUsername(${accessToken})`)
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
  const userProfile = await requestJSON(USER_PROFILE_URL, METHODS.GET, headers);
  //console.log('userProfile:', userProfile)
  return userProfile.id
}


// user login, fetch access token and expire time with refresh token
export const fetchAccessToken = async (appCredentials, refreshToken) => {
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    return await fetchUserTokens(appCredentials, body);
  }

// user registration - new refresh token, auth code is discared as it's not needed for future calls
// fetches access token and refresh token
export const fetchNewUserTokens = async (appCredentials) => {
    //console.log(`fetchNewUserTokens(${appCredentials})`)
    const authCode = await fetchUserAuthCode(appCredentials);
    if(!authCode) return null
    //console.log('autocode', authCode)
    const body = `grant_type=authorization_code&code=${authCode}&redirect_uri=${appCredentials.redirectUri}`;
    return await fetchUserTokens(appCredentials, body);
}

// this function prompts the user with the spotify login
const fetchUserAuthCode = async (appCredentials) => {
  const scopes = USER_PERMISSION_SCOPES.join(' ');
  //this is something like https://auth.expo.io/@your-username/your-app-slug
  const redirectUrl = AuthSession.getRedirectUrl();
  const result = await AuthSession.startAsync({
    authUrl:
      CODE_ENDPOINT +
      '?response_type=code' +
      '&client_id=' +
      appCredentials.clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectUrl),
  })
  if(result.type == "success"){
    return result.params.code; 
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
    const tokensData = await requestJSON(TOKEN_ENDPOINT, METHODS.POST, headers, body)

    const expireTime = new Date().getTime() + tokensData.expires_in * 1000;
    const tokens = {
        accessToken: tokensData.access_token,
        refreshToken: tokensData.refresh_token,
        expireTime: expireTime,
      };
    return tokens;
}