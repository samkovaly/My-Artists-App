import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import { Linking } from 'expo';

import { Colors, Screens } from '../../styles'

import BaseText from '../BaseText'
import { getTrackImageSource } from '../../utilities/imageSources'


/* track object
{
    name: ""
    id: "id"
    top_tracks_long_term: T/F
    top_tracks_medium_term: T/F
    top_tracks_short_term: T/F
    saved_tracks: T/F
    playlist: T/F
}
  */

const TrackItem = ({ track }) => {
    let trackName = track.name;
    if(trackName.length > 35){
        trackName = trackName.slice(0, 35) + '...';
    }
      return (
        <TouchableWithoutFeedback onPress={() => openSpotifyTrack(track.uri)}>
            <View style={styles.container}>
                <Image
                    style={styles.trackImage}
                    source={getTrackImageSource(track)}
                />
                <BaseText style={styles.trackName}>{trackName}</BaseText>
                <Image
                    style={styles.spotifyLogo}
                    source={getSpotifyLogo()}
                />
            </View>
        </TouchableWithoutFeedback>
      )
}

export default TrackItem;



const openSpotifyTrack = (uri) => {
    Linking.openURL(uri);
}


const getSpotifyLogo = () => {
    return require('../../graphics/spotify-icon-green-transparent.png');
}



const elementHeight = 40;
const imageHeightRatio = 0.875;
const imageHorizontalMargin = (elementHeight - (elementHeight * imageHeightRatio)) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: Colors.TRACK_ITEM_BACKGROUND,
      marginVertical: 2,
      marginHorizontal: 6,
      height: elementHeight,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: elementHeight /2 ,
    },

    
    trackImage: {
      borderRadius: elementHeight / 2,
      width: elementHeight * imageHeightRatio,
      height: elementHeight * imageHeightRatio,
      marginLeft: imageHorizontalMargin,
    },

    trackName: {
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

