import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector, useDispatch} from 'react-redux';


import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getArtist, getRelatedArtists } from '../../utilities/spotifyFetches';
import { fetchAllConcertsForArtist, fetchNonLocalConcertsForArtist } from '../../store/concerts/effects/seatgeekEffects'





import ConcertItemBig from '../../components/concerts/ConcertItemBig'
import TrackItem from '../../components/tracks/TrackItem'
//import RelatedArtist from '../../components/artists/RelatedArtist'

import ExpandableList from '../../components/ExpandableList'


import ArtistAvatar from '../../components/artists/ArtistAvatar'
import ArtistSection from '../../components/artists/ArtistSection'


import { spotifyArtistsGetArtists } from '../../utilities/artists'

import BaseText from '../../components/BaseText'
import ArtistItem from '../../components/artists/ArtistItem';

import { updateAndGetAccessToken } from '../../utilities/updateAndGetState';




export default function ArtistDetail({ route }) {
  
    const dispatch = useDispatch();

    const extractedArtistsSlugMap = useSelector(state => state.musicProfile.artistSlugMap)
    const trackIDMap = useSelector(state => state.musicProfile.trackIDMap);

    const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);

    const userLocation = useSelector(state => state.concerts.userLocation);
    const radius = 30;

    const { artist } = route.params;

    // spotify dependent
    const [relatedArtists, setRelatedArtists] = useState(null);

    const [concerts, setConcerts] = useState(null);

    let tracks = null 
    if(artist.userExtracted){
      tracks = getTracks(artist.tracks, trackIDMap);
    }

    useEffect(() => {
        const getAsyncArtistData = async(localConcerts) => {

            const accessToken = await updateAndGetAccessToken(dispatch);

            let relatedArtists = await getRelatedArtists(accessToken, artist.id);
            relatedArtists = spotifyArtistsGetArtists(relatedArtists, extractedArtistsSlugMap);
            setRelatedArtists(relatedArtists);

            const months = 10;
            if(localConcerts){
              setConcerts(await fetchAllConcertsForArtist(artist, months, seatgeekClientId, userLocation.latitude, userLocation.longitude, radius));
            }else{
              setConcerts(await fetchNonLocalConcertsForArtist(artist, months, seatgeekClientId));
            }

        }

        if(userLocation && userLocation != 'denied'){
          getAsyncArtistData(true);
        }else{
          getAsyncArtistData(false);
        }
    }, [])


    if(!concerts || !relatedArtists){
      return(
        <View style = {styles.loadingScreen}>
          <ActivityIndicator color={Colors.THEME_BLUE} size = "large" />
        </View>
      )
    }


    return (
        <ScrollView style={styles.container}>
            <ArtistAvatar artist={artist} genres={artist.genres} />

            <View style = {{marginTop: 20}}/>

            {concerts.localConcerts.length == 0 && concerts.nonLocalConcerts.length == 0 ?
              <View style = {styles.centerText}>
                <BaseText style = {styles.noContentText}>No upcoming concerts</BaseText>
              </View> :
              <View>
                {displayConcerts(concerts.localConcerts, userLocation, "Upcoming concerts near you", "No upcoming concerts near you", "Enable location to see upcoming concerts near you")}
                {displayConcerts(concerts.nonLocalConcerts, userLocation, "Other concerts", "No other concerts")}
              </View>
            }

            {tracks && tracks.length > 0 ? displayTracks(tracks): null}
            {displayRelatedArtists(relatedArtists)}

            { /* artist.userExtracted? displayFoundIn(artist): null */ }
        </ScrollView>
    );
}


const displayConcerts = (concerts, userLocation, concertsUpcomingText, noConcertsUpcomingText, locationDeniedText = null) => {

  return (
    <ArtistSection
        contentPresent={ concerts.length > 0 }
        contentText = { concertsUpcomingText }
        renderItem = {() => (
          <ExpandableList
              elements = {concerts}
              renderElementComponent={(concert) =>
                <ConcertItemBig key={concert.id} concert = {concert} displayConcertName = {true} pressForDetail = {true} />
              }
              initialPageSize = {4}
              style = {{marginLeft: 4}}
          />
          )
        }
        noContentText = {
          // if user has denied location access
          userLocation && userLocation != 'denied'  && locationDeniedText != null ?
          noConcertsUpcomingText : locationDeniedText
        }
        locationDeniedText = {locationDeniedText}
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
              <TrackItem key={track.id} track = {track} />
            }
            initialPageSize = {4}
            style = {{}}
        />
      )}
      noContentText = "No tracks"
    />)
}

const displayRelatedArtists = (relatedArtists) => {
  return (
    <View style = {styles.relatedArtists}>
      <ArtistSection
        contentPresent={ relatedArtists.length > 0 }
        contentText = "Similar artists"
        renderItem = {() => (
          <ExpandableList
              elements = {relatedArtists}
              //renderElementComponent={(artist) =>
              //    <RelatedArtist key={artist.id} artist = {artist} />
              //}
              renderElementComponent={(artist) =>
                <ArtistItem key={artist.id} artist = {artist} pressForDetail = {true} />
              }
              initialPageSize = {4}
              style = {{}}
          />
        )}
        noContentText = "No similar artists"
      />
  </View>
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

  relatedArtists: {
    marginHorizontal: 8,
  },
  contentText: {
    fontSize: 24,
    marginBottom: 6,
  },
  noContentText: {
    marginBottom: 4,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.LIGHT_GREY,
  },
});