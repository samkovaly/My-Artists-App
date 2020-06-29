
import { SET_USER_LOCATION, SET_ALL_CONCERTS, SET_FILTERS } from './concertsActions'

import { LOGOUT } from '../globalActions'

const initialState = {
  //allConcerts: null,
  userLocation: null,
  //searchRadius: 30,
  filters: {
    radius: 5, // 2 - 20
    months: 6,
    location: {
      latitude: null,
      longitude: null,
      city: null,
      state: null,
      country: null,
      USA: null,
      displayString: "no location",
    }
  }
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
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      }
  

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}