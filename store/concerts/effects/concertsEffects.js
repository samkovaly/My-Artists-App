
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







// third party API keys for the client app to use
const concerts_events_API_credentials_BLANK = {
    // https://api.eventful.com/
    "eventful": {
        "key" : "-",
    },
    // https://edmtrain.com/api-documentation.html
    "edmtrain": {
        "key": "-",
    },
    // https://developer-acct.ticketmaster.com/user/20138/apps
    // https://developer.ticketmaster.com/
    // https://developer.ticketmaster.com/products-and-docs/apis/getting-started/    
    "ticketmaster": {
        "key": "-",
        "secret": "-",
    },
    // https://www.eventbrite.com/platform/api-keys?internal_ref=login
    // https://www.eventbrite.com/platform/api?internal_ref=login
    "eventbrite": {
        "token": "-",
        "userID": "-",
        "appKey": "-",
    }
}