
import { requestJSON, METHODS } from './HTTPRequests';

// https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
export const getArtist = async (accessToken, artistID) => {
    // used to get artist's biggest image
    const url = "https://api.spotify.com/v1/artists/" + artistID;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    
    const artistJSON = await requestJSON(url, METHODS.GET, headers);
    return artistJSON;
} 


// https://developer.spotify.com/console/get-artist-related-artists
export const getRelatedArtists = async (accessToken, artistID) => {
  // used to get artist's biggest image
  const url = `https://api.spotify.com/v1/artists/${artistID}/related-artists`;
  const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  
  const artistJSON = await requestJSON(url, METHODS.GET, headers);
  return artistJSON.artists;
} 

// https://developer.spotify.com/documentation/web-api/reference/search/search/
export const getArtistID = async (accessToken, name) => {
  const url = `https://api.spotify.com/v1/search?q=${name}&type=artist`
  const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  const artistJSON = await requestJSON(url, METHODS.GET, headers);
  // take first
  return artistJSON.artists.items[0].id;
}



export const getArtists = async(artists, userArtists, accessToken) => {
  const url = `https://api.spotify.com/v1/search?type=artist&limit=1`
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  const artistNames = artists.map((artist) => {
    return artist.name
  })

  let calls = [];
  let callUrl = null;

  for(var name of artistNames){
    calls.push( new Promise( (resolve, reject) => {
      callUrl = url + "&q=" + name
      return resolve(requestJSON(callUrl, METHODS.GET, headers));
    } ));
  }

  // execute and wait
  try {
      var spotifyArtists = await Promise.all(calls);
  }
  catch(err) {
      console.log(err);
  };

  let returnArtists = [];

  // for every artist query return in the lineup
  for(var i = 0; i < spotifyArtists.length; i += 1){
    var queriedArtistsJSON = spotifyArtists[i];
    //console.log('determining match for:', artistNames[i])
    //console.log('queriedArtistsJSON', queriedArtistsJSON)
    let finalArtist = null;
    if(queriedArtistsJSON.artists && queriedArtistsJSON.artists.items
        && queriedArtistsJSON.artists.items.length > 0){
      // one of these artist returns (items) is the artist we want.
      // looking for an exact name match if possible.
      let chosenArtist = null;
      for(var spotifyArtist of queriedArtistsJSON.artists.items){
        //console.log('look at artist: ', spotifyArtist.name);
        if(spotifyArtist.name == artistNames[i]){
          chosenArtist = spotifyArtist;
          //console.log('found exact name match: ', chosenArtist.name);
          break;
        }
      }
      if(chosenArtist == null){
        chosenArtist = queriedArtistsJSON.artists.items[0];
        //console.log('taking first: ', chosenArtist.name);
      }
      // after we chose a spotify artist object that we will use.
      // Compare to the user's artists and use that instead
      // (so as to get user data like: tracks from this artist and top_long_term, etc)
      for(var j = 0; j < userArtists.length; j+=1){
        if(userArtists[j].id == chosenArtist.id){
          finalArtist = userArtists[j]
          finalArtist.userArtist = true;
        }
      }
      if(finalArtist == null){
        finalArtist = mapArtist(chosenArtist);
      }

    }
    
    //console.log('finalArtist', finalArtist);

    returnArtists.push(finalArtist);
  }

  return returnArtists;
}


// https://developer.spotify.com/documentation/web-api/reference/search/search/
// paging starts at 1
export const queryArtistsAtPage = async (query, page, perPage, accessToken) => {

  if(query == null || query == ""){
      return [];
  }


  const limit = perPage;
  const offset = (page - 1) * perPage;

  const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=${limit}&offset=${offset}`

  const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  const artistJSON = await requestJSON(url, METHODS.GET, headers);

  if(artistJSON.artists && artistJSON.artists.items){
    const artists = mapArtists(artistJSON.artists.items);
    return artists;
  }else{
    return [];
  }
}

const mapArtists = (artists) => {
  const filteredArtists = artists.filter((artist) => {return artist.popularity > 10})

  const mappedArtists = filteredArtists.map((artist) => {
    return mapArtist(artist);
  })

  return mappedArtists;
}
const mapArtist = (artist) => {

  let image = null;
  if(artist.images && artist.images[0] && artist.images[0].url){
    image = artist.images[0].url;
  }

  return {
    ...artist,
    image: image,
    name_ascii: artist.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
}