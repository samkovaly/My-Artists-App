import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Linking } from 'expo';




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

const BasicTrack = ({ track }) => {


    let trackName = track.name;
    if(trackName.length > 35){
        trackName = trackName.slice(0, 35) + '...';
    }
      return (
        <TouchableWithoutFeedback onPress={() => openSpotifyTrack(track.uri)}>
            <View style={styles.container}>
                <Image
                    style={styles.trackImage}
                    source={getImageSource(track)}
                />
                <Text style={styles.trackName}>{trackName}</Text>
                <Image
                    style={styles.spotifyLogo}
                    source={getSpotifyLogo()}
                />
            </View>
        </TouchableWithoutFeedback>
      )
}

export default BasicTrack;



const openSpotifyTrack = (uri) => {
    Linking.openURL(uri);
}


const getImageSource = (track) => {
    return {uri: track.image_url}
}

const getSpotifyLogo = () => {
    return require('../../graphics/spotify-icon-green-transparent.png');
}



const elementHeight = 40;
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

    
    trackImage: {
      borderRadius: elementHeight / 2,
      width: elementHeight * imageHeightRatio,
      height: elementHeight * imageHeightRatio,
      marginLeft: imageHorizontalMargin,
    },

    trackName: {
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

