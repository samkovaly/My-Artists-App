import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const BasicArtist = ({ artist, pressForDetail }) => {

  const navigation = useNavigation();
  
  const innerContainer = () => (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={getImageSource(artist)}
      />
      <Text style={styles.name}>{artist.name}</Text>
      <Icon style = {styles.arrow} name="keyboard-arrow-right" size={30} color="white" />
    </View>
    )


    if(pressForDetail){
      return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("ArtistDetail", {artist})}>
            {innerContainer()}
        </TouchableWithoutFeedback>
      )
    }else{
      return innerContainer();
    }
  }



export default BasicArtist;



const getImageSource = (artist) => {
  if(artist.image_url){
    return {uri: artist.image_url}
  }else{
    return require('../../graphics/blank-artist.jpg')
  }
}


const elementHeight = 50;
const imageHeightRatio = 0.85;


const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.SPOTIFY_BLACK,
      height: elementHeight,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
        borderRadius: (elementHeight * imageHeightRatio)/2 ,
        width: elementHeight * imageHeightRatio,
        height: elementHeight * imageHeightRatio,
        marginLeft: 0,
    },
    name: {
      marginLeft: 12,
      color: 'white',
      fontSize: 16,
    },
    arrow: {
      position: 'absolute',
      right: 0,
    },
  });

  

/*
Object {
  "followed_artist": false,
  "genres": Array [
    "art pop",
    "pop",
  ],
  "genres_length": 2,
  "id": "00FQb4jTyendYWaN8pK0wa",
  "image_size": 160,
  "image_url": "https://i.scdn.co/image/6e8dc460cfb6b89d7970302259febd0aa73b38c6",
  "name": "Lana Del Rey",
  "showConcert": true,
  "top_artists_long_term": true,
  "top_artists_medium_term": true,
  "top_artists_short_term": true,
  "tracks": Array [
    "1M0g1beKC4H9gbrOiSayHW",
    "2lFTzUnuGaWlWHJQokjRyb",
  ],
  "tracks_length": 2,
}
*/