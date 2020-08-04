  
import { combineReducers } from 'redux';

import authenticationReducer from './authentication/authenticationReducer';
import musicProfileReducer from './musicProfile/musicProfileReducer';
import concertsReducer from './concerts/concertsReducer';
import deviceReducer from './device/deviceReducer';


export default combineReducers({
  authentication: authenticationReducer,
  musicProfile: musicProfileReducer,
  concerts: concertsReducer,
  device: deviceReducer,
});