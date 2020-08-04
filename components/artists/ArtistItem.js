import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens } from '../../styles'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import BaseText from '../BaseText'
import { getArtistImageSourceSmall } from '../../utilities/imageSources'


const ArtistItem = ({ artist, pressForDetail, containerStyle }) => {

  const navigation = useNavigation();

  let artistName = artist.name;
  if(artistName.length > 30){
    artistName = artistName.slice(0, 30) + "..."
  }

  const innerContainer = () => (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={styles.avatar}
        source={getArtistImageSourceSmall(artist)}
      />
      <View style = {styles.nameContainer}>
        <BaseText style={styles.name}>{artistName}</BaseText>
      </View>
      <Icon style = {styles.arrow} name="keyboard-arrow-right" size={30} color="white" />
    </View>
    )


    if(pressForDetail){
      return (
        <TouchableWithoutFeedback onPress={() => navigation.push("ArtistDetail", { artist })}>
            {innerContainer()}
        </TouchableWithoutFeedback>
      )
    }else{
      return innerContainer();
    }
  }



export default ArtistItem;


const elementHeight = 50;
const imageHeightRatio = 0.85;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.ARTIST_ITEM_BACKGROUND,
      height: elementHeight,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
        borderRadius: (elementHeight * imageHeightRatio)/2,
        width: elementHeight * imageHeightRatio,
        height: elementHeight * imageHeightRatio,
        marginLeft: 0,
    },
    nameContainer: {
      marginLeft: 12,
      width: '76%',
    },
    name: {
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
  "image": "https://i.scdn.co/image/6e8dc460cfb6b89d7970302259febd0aa73b38c6",
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