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

export default function ConcertDetail({ route }) {
    /*
    const allTracks = useSelector(state => state.musicProfile.tracks);
    const accessToken = useSelector(state => state.authentication.accessToken.token);

    const [fullConcert, setFullConcert] = useState(null);
    const tracks = getTracks(concert.tracks, allTracks);

    useEffect(() => {
        const getFullConcertAsync = async() => {
            setFullConcert(await getFullConcert(accessToken, concert.id));
        }
        getFullConcertAsync();
    }, [])
    */


   const accessToken = useSelector(state => state.authentication.accessToken.token);

    const { concert } = route.params;
    const concertArtists = concert.artists;
    let concertMainArtist = null;
    if(concertArtists){
      concertMainArtist = concertArtists[0];
    }else{
      concertMainArtist = null;
    }
    
    const venue = concert.venue;

    /*
    const artistsMap = useSelector(state => state.musicProfile.artists);


    let myArtist = null;
    for(concertArtist of concert.artists){
        myArtist = artistsMap.get(concertArtist.slug);
        if(myArtist != undefined){
            break;
        }
    }
    */


    /*
    const [fetchedArtist, setFetchedArtist] = useState(null);
    useEffect(() => {
        const getAsyncArtistData = async() => {
            setFetchedArtist(await getArtist(accessToken, artist.id));
            //setRelatedArtists(await getRelatedArtists(accessToken, artist.id));
        }

        getAsyncArtistData();
    }, [])

    if(!fetchedArtist){
        return <BaseText>LOADING...</BaseText>
    }
    */
    
    return (
        <ScrollView style={styles.container}>
            
            {/* <ArtistAvatar artist = {fetchedArtist}/> */}
            {/*  <ArtistAvatar artist = {concertMainArtist} genres = {concertMainArtist.genres.map((g) => g.name)}/> */}

            <View style = {styles.headerSection}>
                <CircleAvatar artist={concertMainArtist} radius={200} />

                <BaseText style = {styles.concertName}>
                    {concert.name}
                </BaseText>
            </View>

            <View style = {styles.ticketSection}>
                <TicketButton />
            </View>

            <View style = {styles.locationSection}>
                <BaseText style = {styles.locationSectionText}>{venue.name}</BaseText>
                <BaseText style = {styles.locationSectionText}>{venue.address}</BaseText>
                <BaseText style = {styles.locationSectionText}>{venue.city}, {venue.state}</BaseText>
                <BaseText style = {styles.dateText}>{concert.displayDate}</BaseText>
            </View>

            {/*<View style = {styles.description}>
                <BaseText>{concert.description}</BaseText>
            </View>
            */}

            {/* artist lineup */}
            <View style = {styles.artistLineup}>
              <BaseText style = {styles.artistLineupText}>Artist Lineup</BaseText>
              { concertArtists.map((artist) => {
                return (
                  <BasicArtist key = {artist.id} artist = {artist} userArtist = {false} pressForDetail = {false} />
                )
              })}
            </View>


            {/*
            <ExpandableList
              elements = {concertArtists}
              renderElementComponent={(artist) =>
                <View></View>
                <BasicConcert key={concert.id} concert = {concert} displayConcertName = {true} pressForDetail = {true} />
              }
              initialPageSize = {4}
              style = {{}}
            />
            */}

            {/*displayAllConcertProperties(concert)*/}
        </ScrollView>
    );
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
    fontSize: 38,
    marginTop: 6,
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
    borderColor: 'white',
    borderBottomWidth: 0.5,
  },
  
  test: {
    fontSize: 20,
  },



});




const displayAllConcertProperties = (concert) => {
    return (
    <View>
        <BaseText style = {styles.test} >Concerts</BaseText>
        <BaseText style = {styles.test} >concert.name - {concert.name}</BaseText>
        <BaseText style = {styles.test} >concert.id - {concert.id}</BaseText>
        <BaseText style = {styles.test} >concert.type - {concert.type}</BaseText>
        <BaseText style = {styles.test} >concert.status - {concert.status}</BaseText>
        <BaseText style = {styles.test} >concert.description - {concert.description}</BaseText>
        <BaseText style = {styles.test} >concert.datetime_local - {concert.datetime_local}</BaseText>
        <BaseText style = {styles.test} >concert.datetime_utc - {concert.datetime_utc}</BaseText>
        <BaseText style = {styles.test} >concert.date_tbd - {concert.date_tbd}</BaseText>
        <BaseText style = {styles.test} >concert.url - {concert.url}</BaseText>

        <BaseText> </BaseText>

        <BaseText style = {styles.test} >concert.venue.name - {concert.venue.name}</BaseText>
        <BaseText style = {styles.test} >concert.venue.id - {concert.venue.id}</BaseText>
        <BaseText style = {styles.test} >concert.venue.city - {concert.venue.city}</BaseText>
        <BaseText style = {styles.test} >concert.venue.url - {concert.venue.url}</BaseText>
        
        <BaseText> </BaseText>
        <BaseText style = {styles.test} >Artists length: {concert.artists.length}</BaseText>
        <View>
            {concert.artists.map((artist, index) => {
                return (
                <View key = {index}>
                    <BaseText> </BaseText>
                    <BaseText style = {styles.test} >artist index: {index}</BaseText>
                    <BaseText style = {styles.test} >artist.id - {artist.id}</BaseText>
                    <BaseText style = {styles.test} >artist.slug - {artist.slug}</BaseText>
                    <BaseText style = {styles.test} >artist.name - {artist.name}</BaseText>
                    <BaseText style = {styles.test} >artist.url - {artist.url}</BaseText>
                    <BaseText style = {styles.test} >artist.image - {artist.image}</BaseText>
                    <BaseText style = {styles.test} >artist.primary - {artist.primary}</BaseText>
                    <BaseText style = {styles.test} >artist.type - {artist.type}</BaseText>
                    <BaseText style = {styles.test} >Genres length - {artist.genres.length}</BaseText>
                    <View>
                        {artist.genres.map((genre, index) => {
                            return(
                            <View key={index}>
                                <BaseText> </BaseText>
                                <BaseText style = {styles.test} >genre index: {index}</BaseText>
                                <BaseText style = {styles.test} >genre.id - {genre.id}</BaseText>
                                <BaseText style = {styles.test} >genre.name - {genre.name}</BaseText>
                                <BaseText style = {styles.test} >genre.primary - {genre.primary}</BaseText>
                            </View>
                            )
                        })}
                    </View>
                </View>
                )
            })}
        </View>
    </View>
    )
}


