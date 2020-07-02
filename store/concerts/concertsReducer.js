
import { SET_USER_LOCATION, SET_ALL_CONCERTS, SET_FILTERS } from './concertsActions'
import { SET_INTERESTED_CONCERTS, ADD_INTERESTED_CONCERT, REMOVE_INTERESTED_CONCERT } from './concertsActions'

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
      displayString: null,
    }
  },
  interestedConcerts: null,
}

const sortByDate = (concerts) => {
  concerts.sort((a, b) => (a.datetime_utc > b.datetime_utc) ? 1 : -1)
  return concerts;
}

export default function(state = initialState, action) {
  let sortedConcerts = null;

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
  
    case SET_INTERESTED_CONCERTS:
      sortedConcerts = sortByDate(action.payload);
      return {
        ...state,
        interestedConcerts: sortedConcerts,
      }
        
    case ADD_INTERESTED_CONCERT:
      let concerts = [...state.interestedConcerts, action.payload];
      sortedConcerts = sortByDate(concerts);
      return {
        ...state,
        interestedConcerts: sortedConcerts,
      }

    case REMOVE_INTERESTED_CONCERT:
      // payload is different here, just needs to be the ID
      let concertID = action.payload;
      let interestedConcerts = state.interestedConcerts.filter((concert) => {
        if(concert.id == concertID){
          return false;
        }else{
          return true;
        }
      })

      sortedConcerts = sortByDate(interestedConcerts);
      return {
        ...state,
        interestedConcerts: interestedConcerts,
      }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}