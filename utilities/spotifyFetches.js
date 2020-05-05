
import { requestJSON, METHODS } from './HTTPRequests';

// https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
export const getFullArtist = async (accessToken, artistID) => {
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