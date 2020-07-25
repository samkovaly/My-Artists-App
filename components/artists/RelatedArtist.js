import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens } from '../../styles'

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Linking from 'expo-linking'

import BaseText from '../BaseText'
import { getArtistImageSourceSmall } from '../../utilities/imageSources'

const RelatedArtist = ({ artist }) => {

    return (
        <TouchableWithoutFeedback onPress={() => openSpotifyArtist(artist.uri)}>
            <View style={styles.container}>
                <Image
                    style={styles.avatar}
                    source={getArtistImageSourceSmall(artist)}
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


const openSpotifyArtist = async (uri) => {
    const canOpen = await Linking.canOpenURL(uri);
    if(canOpen){
        Linking.openURL(uri);
    }else{
        console.log("can't open URI", uri)
    }
} 

const getSpotifyLogo = () => {
    return require('../../assets/spotify-icon-green-transparent.png');
}



const elementHeight = 60;
const imageHeightRatio = 0.875;
const imageHorizontalMargin = (elementHeight - (elementHeight * imageHeightRatio)) / 2;

const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.CONCERT_SECTION_BACKGROUND,
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

