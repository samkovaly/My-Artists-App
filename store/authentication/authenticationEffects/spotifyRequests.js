
import { AuthSession } from 'expo';
import Base64 from 'Base64';
import { requestJSON, METHODS } from '../../../utilities/HTTPRequests';

const ACCOUNTS_URL = 'https://accounts.spotify.com/';
const CODE_ENDPOINT = ACCOUNTS_URL + 'authorize';
const TOKEN_ENDPOINT = ACCOUNTS_URL + 'api/token';

const USER_PERMISSION_SCOPES = ['user-read-currently-playing', 'user-library-read','playlist-read-private',
  'playlist-read-collaborative','user-read-recently-played','user-top-read', 'user-follow-read'];



export const fetchUserID = async() => {
  return 'lol, user ID here'
}
  
// user login, fetch access token and expire time with refresh token
export const refreshAccessToken = async (appCredentials, refreshToken) => {
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    return await fetchUserTokens(appCredentials, body);
  }

// user registration - new refresh token, auth code is discared as it's not needed for future calls
// gets access token and refresh token
export const getNewUserTokens = async (appCredentials) => {
    const authCode = await fetchUserAuthCode(appCredentials);
    const body = `grant_type=authorization_code&code=${authCode}&redirect_uri=${appCredentials.redirectUri}`;
    return await fetchUserTokens(appCredentials, body);
}

// this function prompts the user with the spotify login
const fetchUserAuthCode = async (appCredentials) => {
  const scopes = USER_PERMISSION_SCOPES.join(' ');
  try {
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
    return result.params.code;
  } catch (err) {
    console.error(err)
  }
}
  
// used for new access tokens and for renewing old ones
const fetchUserTokens = async (appCredentials, body) =>{
    const appCredentialsB64 = Base64.btoa(`${appCredentials.clientId}:${appCredentials.clientSecret}`);
    const headers = {
        Authorization: `Basic ${appCredentialsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    const tokensData = await requestJSON(SPOTIFY_TOKEN_ENDPOINT, METHODS.POST, headers, body)

    const expireTime = new Date().getTime() + tokensData.expires_in * 1000;
    const tokens = {
        accessToken: tokensData.access_token,
        refreshToken: tokensData.refresh_token,
        expireTime: expireTime,
      };
    return tokens;
}