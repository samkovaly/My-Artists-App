  
import { combineReducers } from 'redux';

import authenticationReducer from './authentication/authenticationReducer';

import artistsReducer from './artists/artistsReducer';
import tracksReducer from './tracks/tracksReducer';
import concertsReducer from './concerts/concertsReducer';

export default combineReducers({
  authentication: authenticationReducer,
  artists: ArtistsReducer,
  tracks: TracksReducer,
  concerts: ConcertsReducer,
});