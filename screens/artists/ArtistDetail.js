import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector, useDispatch} from 'react-redux';

import BasicArtist from '../../components/DisplayArtists/BasicArtist';
import BasicButton from '../../components/BasicButton';

import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getFullArtist } from '../../utilities/spotifyFetches';
import { fetchAllConcertsForArtist } from '../../store/concerts/effects/seatgeekEffects'

import { getUserLocation } from '../../store/concerts/concertsActions'

export default function ArtistDetail({ route }) {
  
    const dispatch = useDispatch();

    const allTracks = useSelector(state => state.musicProfile.tracks);
    const accessToken = useSelector(state => state.authentication.accessToken.token);
    const seatgeekClientId = useSelector(state => state.authentication.concertsCredentials.seatgeek.client_id);
    const userLocation = useSelector(state => state.concerts.userLocation);
    const radius = useSelector(state => state.concerts.searchRadius);

    const { artist } = route.params;
    const [fullArtist, setFullArtist] = useState(null);
    const [concerts, setConcerts] = useState(null);

    const tracks = getTracks(artist.tracks, allTracks);




    useEffect(() => {
        const getAsyncArtistData = async() => {
            setFullArtist(await getFullArtist(accessToken, artist.id));
            setConcerts(await fetchAllConcertsForArtist(
                artist, seatgeekClientId, userLocation.coords.latitude, userLocation.coords.longitude, radius))
        }

        if (userLocation){
          getAsyncArtistData();
        }else{
          dispatch(getUserLocation());
        }

    }, [userLocation])


    console.log(concerts);

    
    /* needs to show:
        upcoming concerts for this artist
        similar artists
        playlist: true
        ...
    */

    return (
        <ScrollView style={styles.container}>
            <View style = {styles.artistPortraitContainer}>
                <Image
                    style={styles.artistPortrait}
                    resizeMode='cover'
                    source = {getImageSource(fullArtist)}
                />
            </View>
            <Text style = {styles.test}>{tracks.length}</Text>
        </ScrollView>
    );
}


/*
POSSIBLE fullArtist:
full artist:  Object {
  "external_urls": Object {
    "spotify": "https://open.spotify.com/artist/1MLHhM4z0lGE7P3ziq177C",
  },
  "followers": Object {
    "href": null,
    "total": 11,
  },
  "genres": Array [],
  "href": "https://api.spotify.com/v1/artists/1MLHhM4z0lGE7P3ziq177C",
  "id": "1MLHhM4z0lGE7P3ziq177C",
  "images": Array [],
  "name": "9 Theory",
  "popularity": 30,
  "type": "artist",
  "uri": "spotify:artist:1MLHhM4z0lGE7P3ziq177C",
}
*/

const getImageSource = (fullArtist) => {
  if(fullArtist && fullArtist.images && fullArtist.images[0] && fullArtist.images[0].url){
    return {uri: fullArtist.images[0].url}
  }else{
    return require('../../graphics/blank-artist.jpg');
  }
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SPOTIFY_BLACK,
  },
  test: {
    color: 'white',
    fontSize: 30,
  },
  artistPortraitContainer: {
    width: '100%',
    height: 300,
  },
  artistPortrait: {
    width: '100%',
    height: '100%',
  }
});

// fullArtist: genres, images 


/*artists: [
      {
      "followed_artist": false,
      "id": "0r371dCcixw9isainQEkD6",
      "image_url": "https://i.scdn.co/image/ab67616d0000b2738d3ae370b3ee10754ee0a87e",
      "name": "Verbal",
      "tracks" : [id, id, ...],
      "genres" : ['edm', 'trap', ...]
      "showConcert": true,
      "top_artists_long_term": false,
      "top_artists_medium_term": false,
      "top_artists_short_term": false,
      }
    ]*/
/*tracks: [
    {
      name: ""
      id: "id"
      top_tracks_long_term: T/F
      top_tracks_medium_term: T/F
      top_tracks_short_term: T/F
      saved_tracks: T/F
      playlist: T/F
    }
  ] */