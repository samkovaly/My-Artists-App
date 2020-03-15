import { SET_ARTIST_IDS, SET_ARTISTS } from './artistsActions'


const initialState = {
  artists: null,
  dataFetched: false,
}

/*artists: [
      {
        name: "" (necesary) (name to fetch concert API date)
        id: "" (necesary)   ( and id to fetch futher backend data (tracks, long_term, etc))
        top_artists_long_term: T/F
        top_artists_medium_term: T/F
        top_artists_short_term: T/F
        followed_artist: T/F
        tracks: [ "...", "...", ...]
      }
    ]*/

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCH_ARTISTS_DATA:
      return {
        ...state,
        dataFetched: false,
      }

    case SET_ARTISTS:
      return {
        artists: action.payload || [],
        dataFetched: true
      }
    /*
    case ADD_ARTIST:
      return {
        ...state,
        artists: [
          ...state.artists || [],
          action.payload,
        ]
      };
      */

    default:
      return state;
  }
}