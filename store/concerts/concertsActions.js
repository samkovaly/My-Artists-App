
export const SET_USER_LOCATION = "SET_LOCATION";
export const SET_ALL_CONCERTS = "SET_ALL_CONCERTS";
export const SET_FILTERS = 'SET_FILTERS';
export const SET_INTERESTED_CONCERTS = 'SET_INTERESTED_CONCERTS'
export const ADD_INTERESTED_CONCERT = 'ADD_INTERESTED_CONCERT'
export const REMOVE_INTERESTED_CONCERT = 'REMOVE_INTERESTED_CONCERT'


import { makeAction } from '../../utilities/actions';
import { deleteInterestedConcert, fetchInterestedConcerts, fetchLocationOrAskPermission, postInterestedConcert } from './effects/concertsEffects';
import { fetchConcertByID, fetchConcertsByID } from './effects/seatgeekEffects';




export const getUserLocation = () => {
    return async (dispatch, getState) => {
        const userLocation = await fetchLocationOrAskPermission();
        await dispatch(setUserLocationsAction(userLocation));
    }
}
const setUserLocationsAction = (userLocation) => {
    return makeAction(SET_USER_LOCATION, userLocation);
}

export const setFiltersAction = (filters) => {
    return makeAction(SET_FILTERS, filters);
}

export const setInterestedConcerts = () => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        const clientID = auth.APICredentials.seatgeek.client_id;
        const interestedConcerts = await fetchInterestedConcerts(auth.user.username, auth.backendAuthToken);
        const concertIDs = interestedConcerts.map((idObject) => {
            return idObject.concert_seatgeek_id;
        });
        const concerts = await fetchConcertsByID(concertIDs, clientID);

        await dispatch(makeAction(SET_INTERESTED_CONCERTS, concerts));
    }
}

export const addInterestedConcert = (concertID) => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        const clientID = auth.APICredentials.seatgeek.client_id;
        const result = await postInterestedConcert(auth.user.username, auth.backendAuthToken, concertID);
        if(result){
            const concert = await fetchConcertByID(concertID, clientID);
            await dispatch(makeAction(ADD_INTERESTED_CONCERT, concert));
        }
    }
    
}

export const removeInterestedConcert = (concertID) => {
    return async (dispatch, getState) => {
        const auth = getState().authentication;
        const result = await deleteInterestedConcert(auth.user.username, auth.backendAuthToken, concertID);
        if(result){
            await dispatch(makeAction(REMOVE_INTERESTED_CONCERT, concertID));
        }
    }
}