
import { FETCH_CONCERTS_DATA, SET_CONCERTS} from './concertsActions'

const initialState = {
  concerts: null,
  dataFetched: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case FETCH_CONCERTS_DATA:
      return {
        ...state,
        dataFetched: false,
      }

    case SET_CONCERTS:
      return {
        concerts: action.payload || [],
        dataFetched: true
      }

    default:
      return state;
  }
}