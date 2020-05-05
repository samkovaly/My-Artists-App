
import { SET_APP_CREDENTIALS, SET_API_CREDENTIALS, 
  SET_REFRESH_TOKEN, SET_ACCESS_TOKEN, SET_USERNAME, SET_BACKEND_AUTH_TOKEN, 
  SET_ANALYZING_SPOTIFY, LOGIN, LOGOUT } from './authenticationActions'

const initialState = {
  loggedIn: false,
  
  appCredentials: {
    clientId: null,
    clientSecret: null,
    redirectUri: null,
  },
  APICredentials: {
    seatgeek: {
      client_id: null
    },
  },
  
  accessToken: {
    token: null,
    expireTime: 0,
  },
  // these 3 are saved to local storage for automatica login upon app start
  refreshToken: null,
  username: null,
  backendAuthToken: null,

}

export default function(state = initialState, action) {
  switch (action.type) {
      
    case SET_APP_CREDENTIALS:
      return {
        ...state,
        appCredentials: action.payload
      }
    case SET_API_CREDENTIALS:
      return {
        ...state,
        APICredentials: action.payload
      }

    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload
      }
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      }
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case SET_BACKEND_AUTH_TOKEN:
      return {
        ...state,
        backendAuthToken: action.payload
      };
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}