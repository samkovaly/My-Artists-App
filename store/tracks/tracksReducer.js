import { FETCH_TRACKS_DATA, SET_TRACKS, ADD_TRACK } from './tracksActions';

const initialState = {
  tracks: null,
  dataFetched: false,
}

/*tracks: [
    {
      name: ""
      id: "id"
      top_tracks_long_term: T/F
      top_tracks_medium_term: T/F
      top_tracks_short_term: T/F
      saved_tracks: T/F
      playlist: T/F
    }
  ] */

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCH_TRACKS_DATA:
      return {
        ...state,
        dataFetched: false,
      }

    case SET_TRACKS:
      return {
        tracks: action.payload || [],
        dataFetched: true
      }

    default:
      return state;
  }
}