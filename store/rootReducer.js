  
import { combineReducers } from 'redux';

import authenticationReducer from './authentication/authenticationReducer';
import musicProfileReducer from './musicProfile/musicProfileReducer';
import concertsReducer from './concerts/concertsReducer';


export default combineReducers({
  authentication: authenticationReducer,
  musicProfile: musicProfileReducer,
  concerts: concertsReducer,
});