
export const SET_USER_LOCATION = "SET_LOCATION";
export const SET_CONCERTS_AT_LOCATION = "SET_CONCERTS_AT_LOCATION";

import { makeAction } from '../../utilities/actions';
import { fetchLocationOrAskPermission } from './effects/concertsEffects'

//import * as ticketmasterEffects from './effects/ticketmasterEffects'
//import * as eventfulEffects from './effects/eventfulEffects'
import * as seatgeekEffects from './effects/seatgeekEffects'

// seatgeek
// eventful
// last.fm
// ticketmaster
// songkick
// RA adviser
// 

    
export const getConcertsAtLocation = () => {
    return async (dispatch, getState) => {
        // fetch concerts data using our auth state
        // fetch...
        const userLocation = getState().concerts.userLocation.coords;
        const radius = getState().concerts.searchRadius;
        const artists = getState().musicProfile.artists;
        //const ticketmasterApiKey = getState().authentication.concertsCredentials.ticketmaster.key;
        //const eventfulApiKey = getState().authentication.concertsCredentials.eventful.key;
        const seatgeekClientId = getState().authentication.concertsCredentials.seatgeek.client_id;

        const concerts = await seatgeekEffects.fetchConcertsForManyArtists(artists.slice(100), seatgeekClientId, userLocation.latitude, userLocation.longitude, radius);

        // await dispatch the result
        dispatch(setConcertsAtLocationAction(concerts));
    }
}



export const getUserLocation = () => {
    return async (dispatch, getState) => {
        const userLocation = await fetchLocationOrAskPermission();
        await dispatch(setUserLocationsAction(userLocation));
    }
}

const setConcertsAtLocationAction = (concerts) => {
    return makeAction(SET_CONCERTS_AT_LOCATION, concerts)
}
const setUserLocationsAction = (userLocation) => {
    return makeAction(SET_USER_LOCATION, userLocation);
}