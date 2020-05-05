
export const SET_USER_LOCATION = "SET_LOCATION";
export const SET_ALL_CONCERTS = "SET_ALL_CONCERTS";

import { makeAction } from '../../utilities/actions';
import { fetchLocationOrAskPermission } from './effects/concertsEffects'

import * as seatgeekEffects from './effects/seatgeekEffects'

    
export const getAllConcerts = () => {
    return async (dispatch, getState) => {
        // fetch concerts data using our auth state
        // fetch...
        const userLocation = getState().concerts.userLocation.coords;
        const radius = getState().concerts.searchRadius;
        const artists = getState().musicProfile.artists;
        
        const seatgeekClientId = getState().authentication.APICredentials.seatgeek.client_id;

        //const concerts = await seatgeekEffects.fetchConcertsForManyArtists(artists.slice(100), seatgeekClientId, userLocation.latitude, userLocation.longitude, radius);
        const concerts = await seatgeekEffects.fetchAllConcertsAtLocation(seatgeekClientId, userLocation.latitude, userLocation.longitude, radius)

        // await dispatch the result
        dispatch(setAllConcertsAction(concerts));
    }
}


export const getUserLocation = () => {
    return async (dispatch, getState) => {
        const userLocation = await fetchLocationOrAskPermission();
        await dispatch(setUserLocationsAction(userLocation));
    }
}

const setAllConcertsAction = (concerts) => {
    return makeAction(SET_ALL_CONCERTS, concerts)
}
const setUserLocationsAction = (userLocation) => {
    return makeAction(SET_USER_LOCATION, userLocation);
}