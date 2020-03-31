

import { requestJSON, METHODS } from '../../utilities/HTTPRequests'

import { BACKEND_API_URL } from '../authentication/authenticationEffects/backendRequests'

const BACKEND_ARTIST_IDS = `${BACKEND_API_URL}/spotify-music-profile`;




export const fetchArtistIds = async () => {
    const headers = 'auth stuff';
    const result = requestJSON(BACKEND_ARTIST_IDS, METHODS.GET, headers);
    return result;
}