
import { SET_CONCERTS} from './concertsActions'

const initialState = {
  concerts: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONCERTS:
      return {
        concerts: action.payload || [],
      }

    default:
      return state;
  }
}