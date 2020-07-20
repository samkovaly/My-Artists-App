
import { requestSpotify, METHODS } from './HTTPRequests';

// https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
export const fetchArtist = async (accessToken, artistID) => {
    // used to get artist's biggest image
    const url = "https://api.spotify.com/v1/artists/" + artistID;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    
    const artistJSON = await requestSpotify(url, METHODS.GET, headers);
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
  
  const artistJSON = await requestSpotify(url, METHODS.GET, headers);
  return artistJSON.artists;
} 

// https://developer.spotify.com/documentation/web-api/reference/search/search/
export const getArtistID = async (accessToken, name) => {
  const url = `https://api.spotify.com/v1/search?q=${name}&type=artist`
  const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  const artistJSON = await requestSpotify(url, METHODS.GET, headers);
  // take first
  return artistJSON.artists.items[0].id;
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
  const artistJSON = await requestSpotify(url, METHODS.GET, headers);

  if(artistJSON.artists && artistJSON.artists.items && artistJSON.artists.items.length > 0){
    const artists = artistJSON.artists.items;

    let filteredArtists = [];
    let seen = {};
    for(let i = 0; i < artists.length; i+=1){
      let artist = artists[i]
      if(artist.name in seen && artist.popularity < 20){
        continue;
      }
      seen[artist.name] = true;
      filteredArtists.push(artist);
    }
    //const filteredArtists = artists.filter((artist) => {return artist.popularity > 10});
    return filteredArtists;
  }else{
    return [];
  }
}