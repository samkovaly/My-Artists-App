import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector, useDispatch} from 'react-redux';

import BasicArtist from '../../components/DisplayArtists/BasicArtist';
import BasicButton from '../../components/BasicButton';

import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getFullArtist, getRelatedArtists } from '../../utilities/spotifyFetches';
import { fetchAllConcertsForArtist } from '../../store/concerts/effects/seatgeekEffects'

import { getUserLocation } from '../../store/concerts/concertsActions'

import GenreBubbleCards from '../../components/artistDetail/GenreBubbleCards'



import BasicConcert from '../../components/concerts/BasicConcert'
import BasicTrack from '../../components/tracks/BasicTrack'
import RelatedArtist from '../../components/artistDetail/RelatedArtist'

import ExpandableList from '../../components/ExpandableList'



export default function ArtistDetail({ route }) {
  
    const dispatch = useDispatch();

    const allTracks = useSelector(state => state.musicProfile.tracks);
    const accessToken = useSelector(state => state.authentication.accessToken.token);
    const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);
    const userLocation = useSelector(state => state.concerts.userLocation);
    const radius = useSelector(state => state.concerts.searchRadius);

    const { artist } = route.params;
    const [fullArtist, setFullArtist] = useState(null);
    const [concerts, setConcerts] = useState(null);

    const [relatedArtists, setRelatedArtists] = useState(null);

    const tracks = getTracks(artist.tracks, allTracks);


    useEffect(() => {
        const getAsyncArtistData = async() => {
            setFullArtist(await getFullArtist(accessToken, artist.id));
            setRelatedArtists(await getRelatedArtists(accessToken, artist.id));

            setConcerts(await fetchAllConcertsForArtist(
                artist, seatgeekClientId, userLocation.coords.latitude, userLocation.coords.longitude, radius))
        }

        if (userLocation){
          getAsyncArtistData();
        }else{
          dispatch(getUserLocation());
        }

    }, [userLocation])





    if(!concerts || !fullArtist || !relatedArtists){
      return <Text>LOADING...</Text>
    }
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
                <GenreBubbleCards genres={artist.genres} style={styles.genreBubleCards}/>
            </View>
            <View style = {styles.concertsOuterContainer}>
              {displayConcerts(concerts.localConcerts, "Upcoming Concerts Near You", "No upcoming concerts near you")}
              {displayConcerts(concerts.nonLocalConcerts, "Other Concerts", "No other conerts")}
            </View>
            {displayTracksYouLike(tracks)}
            {displayRelatedArtists(relatedArtists)}
            {displayFoundIn(artist)}
        </ScrollView>
    );
}

const displayConcerts = (concerts, conertsUpcomingText, noConcertsUpcomingText) => {
  return (
    <View style = {styles.concertsInnerContainer}>
      {concerts.length > 0 ?
        <View>
          <View style = {styles.centerText}>
            <Text style = {styles.conertsUpcomingText}>{conertsUpcomingText}</Text>
          </View>

          <ExpandableList
              elements = {concerts}
              renderElementComponenet={(concert) =>
                <BasicConcert key={concert.id} concert = {concert} displayConcertName = {true} pressForDetail = {true} />
              }
              initialPageSize = {4}
              style = {{}}
          />

        </View> :
        <View style = {styles.centerText}>
          <Text style = {styles.noConcertsUpcomingText}>{noConcertsUpcomingText}</Text>
        </View>
      }
    </View>
 )
}

const displayTracksYouLike = (tracks) => {
  return (
    <View style = {styles.TracksContainer}>
      {tracks.length > 0 ?
        <View>
          <View style = {styles.centerText}>
            <Text style = {styles.tracksUpcomingText}>Tracks you like from them</Text>
          </View>

          <ExpandableList
              elements = {tracks}
              renderElementComponenet={(track) =>
                <BasicTrack key={track.id} track = {track} />
              }
              initialPageSize = {4}
              style = {{}}
          />

        </View> :
        <View style = {styles.centerText}>
          <Text style = {styles.noTracksText}>No tracks</Text>
        </View>
      }
    </View>

  )}



const displayRelatedArtists = (relatedArtists) => {
  return (
    <View style = {styles.relatedArtistContainer}>
      <View style = {styles.centerText}>
        <Text style = {styles.relatedArtistsText}>Similar Artists</Text>
      </View>
      <ExpandableList
          elements = {relatedArtists}
          renderElementComponenet={(artist) =>
              <RelatedArtist key={artist.id} artist = {artist} />
          }
          initialPageSize = {4}
          style = {{}}
      />
    </View>
  )
}
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
const displayFoundIn = (artist) => {
  return (
    <View style = {styles.foundInContainer}>
      <View style = {styles.centerText}>
        <Text style = {styles.foundInText}>Found In</Text>
      </View>
      <View>
        {artist.top_artists_long_term ? <Text  style = {styles.foundInSubText}>Your favorite long term artists (several years)</Text> : null }
        {artist.top_artists_medium_term ? <Text  style = {styles.foundInSubText}>Your favorite medium term artists (6 months)</Text> : null }
        {artist.top_artists_short_term ? <Text  style = {styles.foundInSubText}>Your favorite short term artists (4 weeks)</Text> : null }
        {artist.followed_artist ? <Text  style = {styles.foundInSubText}>Your followed artists</Text> : null }
        {artist.playlist ? <Text  style = {styles.foundInSubText}>Your playlists</Text> : null }
      </View>
    </View>
  )
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
    height: 240,
  },
  artistPortrait: {
    width: '100%',
    height: '100%',
  },
  genreBubleCards: {
    marginTop: -32,
    marginLeft: 2,
  },

  concertListContainer: {

  },
  concertsOuterContainer: {
    marginTop: 4,
  },
  concertsInnerContainer: {
    marginTop: 14,
  },

  conertsUpcomingText: {
    color: 'white',
    fontSize: 22,
  },
  noConcertsUpcomingText: {
    color: 'white',
    fontSize: 18,
  },
  centerText: {
    alignItems: 'center',
    marginBottom: 4,
  },


  TracksContainer: {
      marginTop: 14,
  },

  tracksUpcomingText: {

    color: 'white',
    fontSize: 22,
  },
  noTracksText: {
    color: 'white',
    fontSize: 18,
  },


  relatedArtistContainer: {
    marginTop: 14,

  },
  relatedArtistsText: {

    color: 'white',
    fontSize: 22,
  },

  foundInContainer: {
    marginTop: 14,

  },

  foundInText: {

    color: 'white',
    fontSize: 22,
  },

  foundInSubText: {
    marginLeft: 6,
    color: 'white',
    fontSize: 16,
  },
});