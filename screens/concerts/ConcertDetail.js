import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import { useDispatch } from 'react-redux'

import { StyleSheet, View, Image, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector} from 'react-redux';

import CircleAvatar from '../../components/CircleAvatar'

import TicketButton from '../../components/concerts/TicketButton'
import InterestedButton from '../../components/concerts/InterestedButton'

import BaseText from '../../components/BaseText';
import ConcertAvatar from '../../components/concerts/ConcertAvatar'

import ArtistItem from '../../components/artists/ArtistItem';
import { performersToArtists } from '../../utilities/artists';

import { updateAndGetAccessToken } from '../../utilities/updateAndGetState';
import { addInterestedConcert, removeInterestedConcert } from '../../store/concerts/concertsActions';
import OpenMapButton from '../../components/concerts/OpenMapButton'
import CreateCalendarEventButton from '../../components/concerts/CreateCalendarEventButton'



export default function ConcertDetail({ route }) {
  const { concert } = route.params;
  const dispatch = useDispatch();

  const interestedConcerts = useSelector(state => state.concerts.interestedConcerts);
  const initialInterested = useMemo(() => {
    if(interestedConcerts == null){
      return false;
    }else{
      for(interestedConcert of interestedConcerts){
        if(interestedConcert.id == concert.id){
          return true;
        }
      }
      return false;
    }
  }, [interestedConcerts]);
  const [disabledInterestedButton, setDisabledInterestedButton] = useState(false);

  
  const setInterested = async (newInterested) => {
    // POST/DELETE to API and update global redux state via the appropiate action
    setDisabledInterestedButton(true);
    if(newInterested){
      await dispatch(addInterestedConcert(concert.id));
    }else{
      await dispatch(removeInterestedConcert(concert.id));
    }
    setDisabledInterestedButton(false);
  }
   
   const userArtistsMap = useSelector(state => state.musicProfile.artistSlugMap);
   //const userArtists = Array.from(userArtistsMap.values());

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

            <ConcertAvatar concert = {concert} />
            <View style = {styles.headerSection}>
                {/*
                <CircleAvatar concert={concert} radius={75} />
                */}
                <BaseText style = {styles.concertName}>
                    {concert.name}
                </BaseText>
            </View>

            <View style = {styles.buttonsSection}>
                <TicketButton url = {concert.url} />
                <InterestedButton
                  disabled = {disabledInterestedButton}
                  initialInterested = {initialInterested}
                  updateInterested = {setInterested}
                />
            </View>

            <View style = {styles.locationDateSection}>

              <View style = {styles.locationContainer}>
                <View style = {styles.locationTextContainer}>
                  <BaseText style = {styles.locationName}>{venue.name}</BaseText>
                  <View style = {styles.locationSubTextContainer}>
                    <BaseText style = {styles.locationSubText}>{venue.address}</BaseText>
                    <BaseText style = {styles.locationSubText}>{venue.city}, {venue.state}</BaseText>
                  </View>
                </View>
                <OpenMapButton name = {venue.name} lat = {venue.location.lat} lon = {venue.location.lon}/>
              </View>

              <View style = {styles.dateContainer}>
                <View style = {styles.dateTextContainer}>
                  <BaseText style = {styles.dateText}>{concert.displayDate}</BaseText>
                  <BaseText style = {styles.timeText}>{concert.displayTime}</BaseText>
                </View>
                <CreateCalendarEventButton />
              </View>

            </View>


            {/* artist lineup */}
            { allNull(lineupArtists)?
              null :
              <View style = {styles.artistsSection}>
                <BaseText style = {styles.artistsHeader}>Artist Lineup</BaseText>
                { lineupArtists.map((artist) => {
                  if(artist == null){
                    return null;
                  }else{
                    return (
                      <ArtistItem key = {artist.id} artist = {artist} pressForDetail = {true} containerStyle = {styles.artistItemStyle}/>
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

const screenBackground = Colors.CONCERT_SCREEN_BACKGROUND;
const sectionBackground = Colors.CONCERT_SECTION_BACKGROUND;
const sectionContainer = {
  backgroundColor: sectionBackground,
  marginVertical: 10,
  padding: 8,
};


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    backgroundColor: screenBackground,
  },


  headerSection: {
    ...sectionContainer,
    marginTop: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  concertName: {
    fontSize: 30,
  },

  buttonsSection: {
    ...sectionContainer,
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 12,
    justifyContent: 'space-around',
    paddingVertical: 12,
  },

  locationDateSection: {
    ...sectionContainer,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 16,
  },

  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  locationTextContainer: {
    flexDirection: 'column',
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 4,
  },
  locationSubTextContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  locationSubText: {
    fontSize: 14,
    color: Colors.SUB_TEXT_GREY,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTextContainer: {
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 4,
  },
  timeText: {
    color: Colors.SUB_TEXT_GREY,
    fontSize: 14,
    marginLeft: 12,
  },

  artistsSection: {
    ...sectionContainer,
    //margin: 12,
    //padding: 4,
  },
  artistsHeader: {
    fontSize: 22,
    marginBottom: 6,
  },
  artistItemStyle: {
    backgroundColor: sectionBackground,
  },
});
