
export const SET_USER_LOCATION = "SET_LOCATION";
export const SET_ALL_CONCERTS = "SET_ALL_CONCERTS";
export const SET_FILTERS = 'SET_FILTERS';

import { LOGOUT } from '../globalActions'
import { makeAction } from '../../utilities/actions';
import { fetchLocationOrAskPermission, fetchAddress } from './effects/concertsEffects'

import * as seatgeekEffects from './effects/seatgeekEffects'


/*
export const getAllConcerts = () => {
    return async (dispatch, getState) => {
        // fetch concerts data using our auth state
        // fetch...
        const userLocation = getState().concerts.userLocation;
        const radius = getState().concerts.searchRadius;
        
        const seatgeekClientId = getState().authentication.APICredentials.seatgeek.client_id;

        const months = 6;
        const concerts = await seatgeekEffects.fetchAllConcertsAtLocation(seatgeekClientId, months, userLocation.latitude, userLocation.longitude, radius)
        //console.log(concerts)

        // await dispatch the result
        dispatch(setAllConcertsAction(concerts));
    }
}
*/

export const getUserLocation = () => {
    return async (dispatch, getState) => {
        const userLocation = await fetchLocationOrAskPermission();
        await dispatch(setUserLocationsAction(userLocation));
    }
}

//export const setFilters = (filters) => {
 //   dispatch(setUserLocationsAction(userLocation));
//}

const setAllConcertsAction = (concerts) => {
    return makeAction(SET_ALL_CONCERTS, concerts)
}
const setUserLocationsAction = (userLocation) => {
    return makeAction(SET_USER_LOCATION, userLocation);
}
const setUserAddressAction = (userAddress) => {
    return makeAction(SET_USER_ADDRESS, userAddress);
}
export const setFiltersAction = (filters) => {
    return makeAction(SET_FILTERS, filters);
}