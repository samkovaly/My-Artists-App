
import { SET_ARTISTS, SET_TRACKS, SET_ANALYZING_SPOTIFY } from './musicProfileActions';

const initialState = {
    artists: null,
    tracks: null,
    analyzingSpotify: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ANALYZING_SPOTIFY:
        return {
            ...state,
            analyzingSpotify: action.payload
        }
    case SET_ARTISTS:
        return {
            ...state,
            artists: action.payload || [],
        }
    case SET_TRACKS:
        return {
            ...state,
            tracks: action.payload || [],
        }

    default:
      return state;
  }
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