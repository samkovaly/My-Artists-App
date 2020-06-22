import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector, useDispatch} from 'react-redux';


import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getArtist, getRelatedArtists } from '../../utilities/spotifyFetches';
import { fetchAllConcertsForArtist } from '../../store/concerts/effects/seatgeekEffects'

import { getUserLocation } from '../../store/concerts/concertsActions'




import BasicConcert from '../../components/concerts/BasicConcert'
import BasicTrack from '../../components/tracks/BasicTrack'
import RelatedArtist from '../../components/artists/RelatedArtist'

import ExpandableList from '../../components/ExpandableList'


import ArtistAvatar from '../../components/artists/ArtistAvatar'
import ArtistSection from '../../components/artists/ArtistSection'




import BaseText from '../../components/BaseText'

export default function ArtistDetail({ route }) {
  
    const dispatch = useDispatch();

    const allTracks = useSelector(state => state.musicProfile.tracks);
    const accessToken = useSelector(state => state.authentication.accessToken.token);
    const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);
    const userLocation = useSelector(state => state.concerts.userLocation);
    const radius = useSelector(state => state.concerts.searchRadius);

    const { artist, userArtist } = route.params;

    // spotify dependent
    const [fetchedArtist, setFetchedArtist] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState(null);

    const [concerts, setConcerts] = useState(null);

    let tracks = null
    if(userArtist){
      tracks = getTracks(artist.tracks, allTracks);
    }

    useEffect(() => {
        const getAsyncArtistData = async() => {
            setFetchedArtist(await getArtist(accessToken, artist.id));
            setRelatedArtists(await getRelatedArtists(accessToken, artist.id));

            const months = 6;
            setConcerts(await fetchAllConcertsForArtist(artist, months, seatgeekClientId, userLocation.coords.latitude, userLocation.coords.longitude, radius))
        }

        if (userLocation){
          getAsyncArtistData();
        }else{
          dispatch(getUserLocation());
        }

    }, [userLocation])


/*artists: {
      "followed_artist": false,
      "id": "0r371dCcixw9isainQEkD6",
      "image": "https://i.scdn.co/image/ab67616d0000b2738d3ae370b3ee10754ee0a87e",
      "name": "Verbal",
      "tracks" : [id, id, ...],
      "genres" : ['edm', 'trap', ...]
      "top_artists_long_term": false,
      "top_artists_medium_term": false,
      "top_artists_short_term": false,
      }

fetched artist:  Object {
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




    if(!concerts || !fetchedArtist || !relatedArtists){
      return(
        <View style = {styles.loadingScreen}>
          <ActivityIndicator color={Colors.TAB_NAV_BLUE} size = "large" />
        </View>
      )
    }


    return (
        <ScrollView style={styles.container}>
            <ArtistAvatar artist={fetchedArtist} genres={fetchedArtist.genres} />

            <View style = {{marginTop: 20}}/>

            {displayConcerts(concerts.localConcerts, "Upcoming Concerts Near You", "No upcoming concerts near you")}
            {displayConcerts(concerts.nonLocalConcerts, "Other Concerts", "No other conerts")}
            
            {tracks? displayTracks(tracks): null}
            {displayRelatedArtists(relatedArtists)}

            {userArtist? displayFoundIn(artist): null}
        </ScrollView>
    );
}


const displayConcerts = (concerts, concertsUpcomingText, noConcertsUpcomingText) => {
  return (
    <ArtistSection
        contentPresent={ concerts.length > 0 }
        contentText = {concertsUpcomingText}

        renderItem = {() => (
          <ExpandableList
              elements = {concerts}
              renderElementComponent={(concert) =>
                <BasicConcert key={concert.id} concert = {concert} displayConcertName = {true} pressForDetail = {true} />
              }
              initialPageSize = {4}
              style = {{}}
          />
          )
        }
        noContentText = {noConcertsUpcomingText}
      />
  )
}




const displayTracks = (tracks) => {
  return (
    <ArtistSection
      contentPresent={ tracks.length > 0 }
      contentText = "Tracks you like from them"
      renderItem = {() => (
        <ExpandableList
            elements = {tracks}
            renderElementComponent={(track) =>
              <BasicTrack key={track.id} track = {track} />
            }
            initialPageSize = {4}
            style = {{}}
        />
      )}
      noContentText = "No similar artists"
    />)
}

const displayRelatedArtists = (relatedArtists) => {
  return (
  <ArtistSection
    contentPresent={ relatedArtists.length > 0 }
    contentText = "Similar Artists"
    renderItem = {() => (
      <ExpandableList
          elements = {relatedArtists}
          renderElementComponent={(artist) =>
              <RelatedArtist key={artist.id} artist = {artist} />
          }
          initialPageSize = {4}
          style = {{}}
      />
    )}
    noContentText = "No similar artists"
  />
  )
}


const displayFoundIn = (artist) => {
  return (
    <ArtistSection
        contentPresent={ true }
        contentText = "Found in"
        renderItem = {() => (
          <View>
            {artist.top_artists_long_term ? <BaseText  style = {styles.foundInSubText}>Your favorite long term artists (several years)</BaseText> : null }
            {artist.top_artists_medium_term ? <BaseText  style = {styles.foundInSubText}>Your favorite medium term artists (6 months)</BaseText> : null }
            {artist.top_artists_short_term ? <BaseText  style = {styles.foundInSubText}>Your favorite short term artists (4 weeks)</BaseText> : null }
            {artist.followed_artist ? <BaseText  style = {styles.foundInSubText}>Your followed artists</BaseText> : null }
            {artist.playlist ? <BaseText  style = {styles.foundInSubText}>Your playlists</BaseText> : null }
          </View>
        )}
    />
  )
}





const styles = StyleSheet.create({
  loadingScreen: {
    ...Screens.screenContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    ...Screens.screenContainer,
  },

  foundInSubText: {
    marginLeft: 10,
    fontSize: 16,
  },
});