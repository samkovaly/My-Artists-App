
import { SET_APP_CREDENTIALS, SET_USER_CREDENTIALS, SET_ANALYZING_SPOTIFY,
   SET_USER_ACCESS_TOKEN, LOGIN, LOGOUT, SET_CONCERTS_CREDENTIALS } from './authenticationActions'

const initialState = {
  appCredentials: {
    clientId: null,
    clientSecret: null,
    redirectUri: null,
  },
  concertsCredentials: {
    eventful: {
      key: null
    },
  },
  
  refreshToken: null,
  accessToken: {
    token: null,
    expireTime: 0,
  },
  username: null,

  backendUserAuthToken: null,
  loggedIn: false,
  analyzingSpotify: false,
  concertAPIKeys: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case SET_APP_CREDENTIALS:
      return {
        ...state,
        appCredentials: action.payload
      }
    
    case SET_CONCERTS_CREDENTIALS:
      return {
        ...state,
        concertsCredentials: action.payload
      }
    
    case SET_USER_CREDENTIALS:
      return {
        ...state,
        userCredentials: action.payload
      };

    case SET_USER_ACCESS_TOKEN:
      return {
        ...state,
        userAccessToken: action.payload
      };
    
    case SET_ANALYZING_SPOTIFY:
      return {
        ...state,
        analyzingSpotify: action.payload
      }

    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      }
      
    case SET_CONCERT_API_KEYS:
      return {
        ...state,
        concertAPIKeys: action.payload
      }
      
    default:
      return state;
  }
}