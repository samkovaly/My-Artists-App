
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
      "followed_artist": false,
      "id": "0r371dCcixw9isainQEkD6",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2738d3ae370b3ee10754ee0a87e",
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