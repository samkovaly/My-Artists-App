import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens } from '../../styles'

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Linking } from 'expo';

import BaseText from '../BaseText'
import { getArtistImageSource } from '../../utilities/imageSources'

const RelatedArtist = ({ artist }) => {

    return (
        <TouchableWithoutFeedback onPress={() => openSpotifyArtist(artist.uri)}>
            <View style={styles.container}>
                <Image
                    style={styles.avatar}
                    source={getArtistImageSource(artist)}
                />
                <BaseText style={styles.name}>{artist.name}</BaseText>
                <Image
                    style={styles.spotifyLogo}
                    source={getSpotifyLogo()}
                />
            </View>
        </TouchableWithoutFeedback>
      )
  }



export default RelatedArtist;



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
      backgroundColor: Colors.ARTIST_CARD_BACKGROUND,
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
        fontSize: 16,
    },

    spotifyLogo: {
        width: elementHeight * imageHeightRatio,
        height: elementHeight * imageHeightRatio,
        position: 'absolute',
        right: imageHorizontalMargin,
    },
  });

