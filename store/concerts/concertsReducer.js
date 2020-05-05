
import { SET_USER_LOCATION, SET_ALL_CONCERTS } from './concertsActions'


const initialState = {
  allConcerts: null,
  userLocation: null,
  searchRadius: 30,
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case SET_ALL_CONCERTS:
      return {
        ...state,
        allConcerts: action.payload || [],
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