
// fetch concerts data using 3rd party APIs'


import { requestBackend, METHODS } from '../../../utilities/HTTPRequests'

import { getCurrentPositionAsync, Accuracy, reverseGeocodeAsync, getProviderStatusAsync } from 'expo-location';
import { userAllowsLocation, askLocationPermission } from '../../../utilities/permissions';

import { BACKEND_USERS } from '../../authentication/authenticationEffects/backendRequests'

const BACKEND_INTERESTED_CONCERTS = `${BACKEND_USERS}interested_concerts/`;

export const fetchLocationOrAskPermission = async() => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const permissionStatus = await userAllowsLocation();

    if (permissionStatus == 'granted') {
      return await fetchLocation();

    }else if(permissionStatus == 'undetermined'){
      const newPermissionStatus = await askLocationPermission();
      if(newPermissionStatus == 'granted'){
        return await fetchLocation();
      }
    }
    return 'denied';
}



export const fetchLocation = async() => {

  const locationDeviceEnable = await getProviderStatusAsync();
  console.log('location enabled on device:', locationDeviceEnable.locationServicesEnabled)
  if(locationDeviceEnable.locationServicesEnabled){

    const location = await getCurrentPositionAsync({ accuracy: Accuracy.Low }).then(async (location) => {
      const address = await reverseGeocodeAsync(location.coords);
      
      if (address == null || address[0] == null){
        return 'denied';
      }

      const city = address[0].city;
      const state = getStateAbbreviation(address[0].region);
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
    }).catch(e => {
      console.log(e)
      return 'denied'
    })

    return location;
  }else{
    return 'denied';
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


const getStateAbbreviation = (input) => {
  if(input.length == 2){
    return input;
  }
  var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
  ];
    input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    for(var i = 0; i < states.length; i++){
        if(states[i][0] == input){
            return(states[i][1]);
        }
    }    
}