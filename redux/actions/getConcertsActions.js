import { getAccessToken, BACKEND_API_URL} from './authSpotifyActions';
import { SET_CONCERTS, ADD_CONCERT} from './types';

const BACKEND_API_CONCERT_CREDENTIALS = `${BACKEND_API_URL}/concert-APIs-credentials`;

const eventfulURL = "http://eventful.com/"

let keyQuery = "?app_key="

// Would be foolish to store concerts locally since they are changing regularily
// fetches a user's JSON MusicProfile (defined by and from this app's backend)

export const fetchConcertAPICredentials = async() => {
  console.log('FETCHING ', BACKEND_API_CONCERT_CREDENTIALS)
  const response = await fetch(BACKEND_API_CONCERT_CREDENTIALS, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
      },
  });
  const responseJson = await response.json();
  if(responseJson.error){
    console.log("ERROR while fetching concert APIs:");
    console.log(responseJson);
    return null;
  }
  console.log('response', responseJson)
  keyQuery = keyQuery + responseJson.eventful.key
  return responseJson;
}


const fetchEventfulConcerts = async() => {
  URL = eventfulURL + "events?q=music&l=San+Francisco&within=10&units=miles" + keyQuery

  console.log('FETCHING ', URL)
  const response = await fetch(URL, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
      },
  });
  const responseJson = await response.json();
  if(responseJson.error){
    console.log("ERROR while fetching eventful API request:");
    console.log(responseJson);
    return null;
  }
  return responseJson;
}



const fetchUpcomingConcerts = async() => {
  eventfulJSON = await fetchEventfulConcerts()
  console.log('eventfulJSON', eventfulJSON)
  return undefined
}


export const setUpcomingConcerts = async (dispatch) => {
  console.log('setting upcoming concerts')
  await fetchUpcomingConcerts()



  //const artists = JSON.parse(musicProfileJSON.artists).slice(0,50)
  //const tracks = JSON.parse(musicProfileJSON.tracks).slice(0,50)


  
  //dispatch(createSetArtistsAction(artists))
  //dispatch(createSetTracksAction(tracks))
  //dispatch(createFetchingArtistsAction(false))


}


const createSetConcertsAction = (concerts) => {
    return {
        type: SET_CONCERTS,
        payload: concerts,
    }
}
