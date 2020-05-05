
// fetch concerts data using 3rd party APIs'


import { requestJSON, METHODS } from '../../../utilities/HTTPRequests'

import { getCurrentPositionAsync, Accuracy } from 'expo-location';
import { userAllowsLocation, askLocationPermission } from '../../../utilities/permissions';



export const fetchLocationOrAskPermission = async() => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const userAllows = await userAllowsLocation();
    if (userAllows) {
      return getCurrentPositionAsync({ accuracy: Accuracy.Low });
    } else {
      return null;
    }
  }