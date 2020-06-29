import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'

import { StyleSheet, View, Image, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector} from 'react-redux';

import CircleAvatar from '../../components/CircleAvatar'

import TicketButton from '../../components/concerts/TicketButton'
import InterestedButton from '../../components/concerts/InterestedButton'

import BaseText from '../../components/BaseText';


import ArtistItem from '../../components/artists/ArtistItem';
import { performersToArtists } from '../../utilities/artists';

import { updateAndGetAccessToken } from '../../utilities/updateAndGetState';


export default function ConcertDetail({ route }) {
   const dispatch = useDispatch();

   
   const [interested, setInterested] = useState(interested);
   const userArtistsMap = useSelector(state => state.musicProfile.artistSlugMap);
   //const userArtists = Array.from(userArtistsMap.values());

    const { concert } = route.params;
    const performers = concert.performers;

    const [lineupArtists, setLineupArtists] = useState([]);
    
    const venue = concert.venue;


    useEffect(() => {
      const getLineupArtists = async () => {
        const accessToken = await updateAndGetAccessToken(dispatch);
        const artists = await performersToArtists(performers, accessToken, userArtistsMap)
        setLineupArtists(artists);
      }
      getLineupArtists();

    }, [performers])

    
    return (
        <ScrollView style={styles.container}>
            
            <View style = {styles.headerSection}>
                <CircleAvatar concert={concert} radius={75} />
                <BaseText style = {styles.concertName}>
                    {concert.name}
                </BaseText>
            </View>

            <View style = {styles.buttons}>
                <TicketButton url = {concert.url} />
                <InterestedButton interested = {interested} setInterested = {setInterested}/>
            </View>

            <View style = {styles.locationSection}>
                <BaseText style = {styles.locationSectionText}>{venue.name}</BaseText>
                <BaseText style = {styles.locationSectionText}>{venue.address}</BaseText>
                <BaseText style = {styles.locationSectionText}>{venue.city}, {venue.state}</BaseText>
                <BaseText style = {styles.dateText}>{concert.displayDate}</BaseText>
            </View>


            {/* artist lineup */}
            { allNull(lineupArtists)?
              null :
              <View style = {styles.artistLineup}>
                <BaseText style = {styles.artistLineupText}>Artist Lineup</BaseText>
                { lineupArtists.map((artist) => {
                  if(artist == null){
                    return null;
                  }else{
                    return (
                      <ArtistItem key = {artist.id} artist = {artist} pressForDetail = {true} />
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
      marginBottom: 20,
  },

  concertName: {
    fontSize: 36,
    marginTop: 4,
    marginHorizontal: 12,
  },

  buttons: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
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