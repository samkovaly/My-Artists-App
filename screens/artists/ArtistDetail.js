import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector, useDispatch} from 'react-redux';


import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getArtist, getRelatedArtists } from '../../utilities/spotifyFetches';
import { fetchAllConcertsForArtist } from '../../store/concerts/effects/seatgeekEffects'

import { getUserLocation } from '../../store/concerts/concertsActions'




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
    //const radius = useSelector(state => state.concerts.searchRadius);
    const radius = 15;

    const { artist } = route.params;

    // spotify dependent
    //const [fetchedArtist, setFetchedArtist] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState(null);

    const [concerts, setConcerts] = useState(null);

    let tracks = null
    if(artist.userExtracted){
      tracks = getTracks(artist.tracks, trackIDMap);
    }

    useEffect(() => {
        const getAsyncArtistData = async() => {

            const accessToken = await updateAndGetAccessToken(dispatch);
            //setFetchedArtist(await getArtist(accessToken, artist.id));

            let relatedArtists = await getRelatedArtists(accessToken, artist.id);
            relatedArtists = spotifyArtistsGetArtists(relatedArtists, extractedArtistsSlugMap);
            setRelatedArtists(relatedArtists);

            const months = 24;
            setConcerts(await fetchAllConcertsForArtist(artist, months, seatgeekClientId, userLocation.latitude, userLocation.longitude, radius))
        }

        if (userLocation){
          getAsyncArtistData();
        }else{
          dispatch(getUserLocation());
        }

    }, [userLocation])


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

            {displayConcerts(concerts.localConcerts, "Upcoming concerts near you", "No upcoming concerts near you")}
            {displayConcerts(concerts.nonLocalConcerts, "Other concerts", "No other concerts")}
            
            {tracks? displayTracks(tracks): null}
            {displayRelatedArtists(relatedArtists)}

            { /* artist.userExtracted? displayFoundIn(artist): null */ }
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
                <ConcertItemBig key={concert.id} concert = {concert} displayConcertName = {true} pressForDetail = {true} />
              }
              initialPageSize = {4}
              style = {{marginLeft: 4}}
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
              <TrackItem key={track.id} track = {track} />
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
  }
});