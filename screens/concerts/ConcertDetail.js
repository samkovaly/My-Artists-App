import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector} from 'react-redux';

import BasicConcert from '../../components/BasicConcert';
import BasicButton from '../../components/BasicButton';

import { getTracks } from '../../store/musicProfile/musicProfileActions';
import { getFullConcert } from '../../utilities/spotifyFetches';


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
    const { concert } = route.params;
    
    return (
        <ScrollView style={styles.container}>
            {/*
            <View style = {styles.concertPortraitContainer}>
                <Image
                    style={styles.concertPortrait}
                    resizeMode='cover'
                    source = {fullConcert ? {uri: fullConcert.images[0].url} : require('../graphics/blank-concert.jpg')}
                />
            </View>
            <Text style = {styles.test}>{tracks.length}</Text>
            */}
            {displayAllConcertProperties(concert)}
        </ScrollView>
    );
}



const displayAllConcertProperties = (concert) => {
    return (
    <View>
        <Text style = {styles.test} >Concerts</Text>
        <Text style = {styles.test} >concert.name - {concert.name}</Text>
        <Text style = {styles.test} >concert.id - {concert.id}</Text>
        <Text style = {styles.test} >concert.type - {concert.type}</Text>
        <Text style = {styles.test} >concert.status - {concert.status}</Text>
        <Text style = {styles.test} >concert.description - {concert.description}</Text>
        <Text style = {styles.test} >concert.datetime_local - {concert.datetime_local}</Text>
        <Text style = {styles.test} >concert.datetime_utc - {concert.datetime_utc}</Text>
        <Text style = {styles.test} >concert.date_tbd - {concert.date_tbd}</Text>
        <Text style = {styles.test} >concert.url - {concert.url}</Text>

        <Text> </Text>

        <Text style = {styles.test} >concert.venue.name - {concert.venue.name}</Text>
        <Text style = {styles.test} >concert.venue.id - {concert.venue.id}</Text>
        <Text style = {styles.test} >concert.venue.city - {concert.venue.city}</Text>
        <Text style = {styles.test} >concert.venue.url - {concert.venue.url}</Text>
        
        <Text> </Text>
        <Text style = {styles.test} >Artists length: {concert.artists.length}</Text>
        <View>
            {concert.artists.map((artist, index) => {
                return (
                <View key = {index}>
                    <Text> </Text>
                    <Text style = {styles.test} >artist index: {index}</Text>
                    <Text style = {styles.test} >artist.id - {artist.id}</Text>
                    <Text style = {styles.test} >artist.slug - {artist.slug}</Text>
                    <Text style = {styles.test} >artist.name - {artist.name}</Text>
                    <Text style = {styles.test} >artist.url - {artist.url}</Text>
                    <Text style = {styles.test} >artist.image - {artist.image}</Text>
                    <Text style = {styles.test} >artist.primary - {artist.primary}</Text>
                    <Text style = {styles.test} >artist.type - {artist.type}</Text>
                    <Text style = {styles.test} >Genres length - {artist.genres.length}</Text>
                    <View>
                        {artist.genres.map((genre, index) => {
                            return(
                            <View key={index}>
                                <Text> </Text>
                                <Text style = {styles.test} >genre index: {index}</Text>
                                <Text style = {styles.test} >genre.id - {genre.id}</Text>
                                <Text style = {styles.test} >genre.name - {genre.name}</Text>
                                <Text style = {styles.test} >genre.primary - {genre.primary}</Text>
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


const getImageSource = (concert) => {
    if(concert && concert.artists && concert.artists[0] && concert.artists[0].image){
      return {uri: concert.artists[0].image}
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
    fontSize: 20,
  },
  concertPortraitContainer: {
    width: '100%',
    height: 300,
  },
  concertPortrait: {
    width: '100%',
    height: '100%',
  }
});
