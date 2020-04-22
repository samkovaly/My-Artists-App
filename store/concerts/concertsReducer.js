
import { SET_USER_LOCATION, SET_CONCERTS_AT_LOCATION } from './concertsActions'


const initialState = {
  concertsAtLocation: null,
  userLocation: null,
  searchRadius: 200,
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case SET_CONCERTS_AT_LOCATION:
      return {
        ...state,
        concertsAtLocation: action.payload || [],
      }

    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      }

    default:
      return state;
  }
}