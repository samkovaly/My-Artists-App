
// fetch concerts data using 3rd party APIs'


import { requestBackend, METHODS } from '../../../utilities/HTTPRequests'

import { getCurrentPositionAsync, Accuracy, reverseGeocodeAsync } from 'expo-location';
import { userAllowsLocation, askLocationPermission } from '../../../utilities/permissions';

import { BACKEND_USERS } from '../../authentication/authenticationEffects/backendRequests'

const BACKEND_INTERESTED_CONCERTS = `${BACKEND_USERS}interested_concerts/`;

export const fetchLocationOrAskPermission = async() => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const userAllows = await userAllowsLocation();
    console.log('userAllows:', userAllows)
    if (userAllows) {
      const location = await getCurrentPositionAsync({ accuracy: Accuracy.Low });
      console.log('user location: ', location)
      const address = await reverseGeocodeAsync(location.coords);

      const city = address[0].city;
      const state = address[0].region;
      let country = address[0].country;
      
      let displayString = city + ', ' + country;

      let USA = false;
      if(country == "United States"){
        USA = true;
        country = "USA";
        displayString = city + ', ' + state;
      }

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        city: address[0].city,
        state: address[0].region,
        country: country,
        USA: USA,
        displayString: displayString,
      }

    } else {
      return "denied";
    }
}


export const fetchInterestedConcerts = async(username, backendAuthToken) => {
  const headers = {
      'Authorization': `Token ${backendAuthToken}`,
      'Content-Type': 'application/json',
  };
  const getResult = await requestBackend(BACKEND_INTERESTED_CONCERTS + username, METHODS.GET, headers)
  return getResult.data;
}


export const postInterestedConcert = async(username, backendAuthToken, concertID) => {
  const headers = {
    'Authorization': `Token ${backendAuthToken}`,
    'Content-Type': 'application/json',
  };
  const body = {
    'concert_seatgeek_id': concertID,
  }
  const postResult = await requestBackend(BACKEND_INTERESTED_CONCERTS + username, METHODS.POST, headers, JSON.stringify(body))
  return postResult
}


export const deleteInterestedConcert = async(username, backendAuthToken, concertID) => {
  const headers = {
    'Authorization': `Token ${backendAuthToken}`,
    'Content-Type': 'application/json',
  };
  const url = BACKEND_INTERESTED_CONCERTS + username + "/" + concertID;
  const deleteResult = await requestBackend(url, METHODS.DELETE, headers)
  return deleteResult;
}