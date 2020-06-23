import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector} from 'react-redux';

import BasicButton from '../../components/BasicButton';

import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getFullConcert } from '../../utilities/spotifyFetches';


import { getArtist, getRelatedArtists } from '../../utilities/spotifyFetches';

import CircleAvatar from '../../components/CircleAvatar'

import TicketButton from '../../components/concerts/TicketButton'

import ExpandableList from '../../components/ExpandableList'
import BaseText from '../../components/BaseText';


import BasicArtist from '../../components/artists/BasicArtist';
import { getArtists } from '../../utilities/spotifyFetches'

export default function ConcertDetail({ route }) {


   const accessToken = useSelector(state => state.authentication.accessToken.token);
   const userArtistsMap = useSelector(state => state.musicProfile.artists);
   const userArtists = Array.from(userArtistsMap.values());

    const { concert } = route.params;
    const concertArtists = concert.artists;
    let concertMainArtist = null;
    if(concertArtists){
      concertMainArtist = concertArtists[0];
    }else{
      concertMainArtist = null;
    }
    const [spotifyLineupArtists, setSpotifyLineupArtists] = useState([]);
    
    const venue = concert.venue;


    useEffect(() => {
      const getSpotifyLineupArtists = async () => {
        const artists = await getArtists(concertArtists, userArtists, accessToken);
        setSpotifyLineupArtists(artists);
      }
      getSpotifyLineupArtists();

    }, [concertArtists])

    
    return (
        <ScrollView style={styles.container}>
            
            <View style = {styles.headerSection}>
                <CircleAvatar artist={concertMainArtist} radius={200} />

                <BaseText style = {styles.concertName}>
                    {concert.name}
                </BaseText>
            </View>

            <View style = {styles.ticketSection}>
                <TicketButton url = {concert.url} />
            </View>

            <View style = {styles.locationSection}>
                <BaseText style = {styles.locationSectionText}>{venue.name}</BaseText>
                <BaseText style = {styles.locationSectionText}>{venue.address}</BaseText>
                <BaseText style = {styles.locationSectionText}>{venue.city}, {venue.state}</BaseText>
                <BaseText style = {styles.dateText}>{concert.displayDate}</BaseText>
            </View>


            {/* artist lineup */}
            { allNull(spotifyLineupArtists)?
              null :
              <View style = {styles.artistLineup}>
                <BaseText style = {styles.artistLineupText}>Artist Lineup</BaseText>
                { spotifyLineupArtists.map((artist) => {
                  if(artist == null){
                    return null;
                  }else{
                    return (
                      <BasicArtist key = {artist.id} artist = {artist} userArtist = {artist.userArtist} pressForDetail = {true} />
                    )
                  }
                })}
              </View>
            }
        </ScrollView>
    );
}

const allNull = (array) => {
  for(a of array){
    if(a != null){
      return false;
    }
  }
  return true;
}


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
  },

  headerSection: {
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 6,
      marginBottom: 26,
  },

  concertName: {
    fontSize: 36,
    marginTop: 6,
    marginHorizontal: 12,
  },

  ticketSection: {
    marginBottom: 12,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#383838'
  },

  locationSection: {
    padding: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'white',
    margin: 12,
  },

  locationSectionText: {
    fontSize: 18,
    margin: 2,
    },
  dateText: {
    fontSize: 20,
  },

  description: {
    padding: 6,
    borderColor: 'white',
    borderWidth: 0.5,
  },
  descriptionText: {
    fontSize: 16,
  },
  artistLineupText: {
    fontSize: 22,
    marginBottom: 6,
  },
  artistLineup: {
    margin: 12,
    padding: 4,
  },

});