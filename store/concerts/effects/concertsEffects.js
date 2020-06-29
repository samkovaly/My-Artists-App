
// fetch concerts data using 3rd party APIs'


import { requestJSON, METHODS } from '../../../utilities/HTTPRequests'

import { getCurrentPositionAsync, Accuracy, reverseGeocodeAsync } from 'expo-location';
import { userAllowsLocation, askLocationPermission } from '../../../utilities/permissions';



export const fetchLocationOrAskPermission = async() => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const userAllows = await userAllowsLocation();
    if (userAllows) {
      const location = await getCurrentPositionAsync({ accuracy: Accuracy.Low });
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
      return null;
    }
  }
