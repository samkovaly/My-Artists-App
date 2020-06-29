
import { SET_ARTISTS, SET_TRACKS, 
        SET_ANALYZING_SPOTIFY, REFRESH_SPOTIFY_ERROR, 
        SET_LAST_REFRESHED
    } from './musicProfileActions';

import { LOGOUT } from '../globalActions'

const initialState = {
    artistSlugMap: null,
    trackIDMap: null,
    analyzingSpotify: false,
    refreshSpotifyError: false,
    lastRefreshed: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case REFRESH_SPOTIFY_ERROR:
        return {
            ...state,
            refreshSpotifyError: action.payload,
        }
    case SET_ANALYZING_SPOTIFY:
        return {
            ...state,
            analyzingSpotify: action.payload,
        }
    case SET_ARTISTS:
        return {
            ...state,
            artistSlugMap: action.payload || [],
        }
    case SET_TRACKS:
        return {
            ...state,
            trackIDMap: action.payload || [],
        }
    case SET_LAST_REFRESHED:
        return {
            ...state,
            lastRefreshed: action.payload,
        }
    
    case LOGOUT:
        return initialState;

    default:
      return state;
  }
}

/*artists: [
      {
      "followed_artist": false,
      "id": "0r371dCcixw9isainQEkD6",
      "image": "https://i.scdn.co/image/ab67616d0000b2738d3ae370b3ee10754ee0a87e",
      "name": "Verbal",
      "name_ascii" : "Verbal",
      "tracks" : [id, id, ...],
      "showConcert": true,
      "top_artists_long_term": false,
      "top_artists_medium_term": false,
      "top_artists_short_term": false,
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