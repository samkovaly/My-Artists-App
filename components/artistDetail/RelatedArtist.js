import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Linking } from 'expo';


const RelatedArtist = ({ artist }) => {

    return (
        <TouchableWithoutFeedback onPress={() => openSpotifyArtist(artist.uri)}>
            <View style={styles.container}>
                <Image
                    style={styles.avatar}
                    source={getImageSource(artist.images)}
                />
                <Text style={styles.name}>{artist.name}</Text>
                <Image
                    style={styles.spotifyLogo}
                    source={getSpotifyLogo()}
                />
            </View>
        </TouchableWithoutFeedback>
      )
  }



export default RelatedArtist;



const getImageSource = (artistImages) => {
  if(artistImages.length > 0){
    return {uri: artistImages[0].url}
  }else{
    return require('../../graphics/blank-artist.jpg')
  }
}



const openSpotifyArtist = (artistURI) => {
    Linking.openURL(artistURI);


} 

const getSpotifyLogo = () => {
    return require('../../graphics/spotify-icon-green-transparent.png');
}



const elementHeight = 60;
const imageHeightRatio = 0.875;
const imageHorizontalMargin = (elementHeight - (elementHeight * imageHeightRatio)) / 2;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#222222',
      marginVertical: 2,
      marginHorizontal: 6,
      height: elementHeight,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: elementHeight /2 ,
      flex: 1,
    },

    
    avatar: {
      borderRadius: elementHeight / 2,
      width: elementHeight * imageHeightRatio,
      height: elementHeight * imageHeightRatio,
      marginLeft: imageHorizontalMargin,
    },

    name: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    },

    spotifyLogo: {
        width: elementHeight * imageHeightRatio,
        height: elementHeight * imageHeightRatio,
        position: 'absolute',
        right: imageHorizontalMargin,
    },
  });

