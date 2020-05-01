import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


const elementHeight = 100; // 60
const imageHeightRatio = 0.75;


const BasicArtist = ({ artist, pressForDetail, navigation }) => {

  const innerContainer = () => (
    <View style={styles.innerContainer}>
      <Image
        style={styles.avatar}
        source={getImageSource(artist)}
      />
      <Text style={styles.title}>{artist.name}{' '}{artist.top_artists_long_term}</Text>
    </View>
    )

  return (
    <View style={styles.outerContainer}>
      {pressForDetail ? 
        <TouchableWithoutFeedback onPress={() => navigation.navigate("ArtistDetail", {artist})}>
            {innerContainer()}
        </TouchableWithoutFeedback>
      :
          innerContainer()
      }
      <View style = {styles.bottomLine}/>
    </View>
    );
}

export default BasicArtist;



const getImageSource = (artist) => {
  if(artist.image_url){
    return {uri: artist.image_url}
  }else{
    return require('../../graphics/blank-artist.jpg')
  }
}


const styles = StyleSheet.create({
    innerContainer: {
      backgroundColor: Colors.SPOTIFY_BLACK,
      padding: 4,
      marginVertical: 2,
      marginHorizontal: 2,
      height: elementHeight,
      flexDirection: 'row',
      flex: 1,
    },
    avatar: {
        borderRadius: (elementHeight * imageHeightRatio)/2 ,
        width: elementHeight * imageHeightRatio,
        height: elementHeight * imageHeightRatio,
    },
    title: {
      marginTop: 0,
      marginLeft: 12,
      color: 'white',
      fontSize: 18,
    },
    outerContainer: {
    },
    bottomLine: {
      marginLeft: 6,
      borderBottomWidth: 0.5,
      borderBottomColor: 'white',
      width: '88%',
    }
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