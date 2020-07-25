import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import GenreBubbleCards from './GenreBubbleCards'
import { getArtistImageSourceBig } from '../../utilities/imageSources'
import { TouchableWithoutFeedback } from 'react-native';
import * as Linking from 'expo-linking'

const ArtistAvatar = ({ artist, genres }) => {
    return (
        <View style = {styles.artistPortraitContainer}>
            <View style = {styles.spotifyLinkButtonContainer}>
                <TouchableWithoutFeedback style = {styles.spotifyLinkButton}
                    onPress = {() => openSpotifyArtist(artist.uri)}
                >
                    <Image
                        style={styles.spotifyLink}
                        source={getSpotifyLogo()}
                    />
                </TouchableWithoutFeedback>
            </View>
            <Image
                style={styles.artistPortrait}
                resizeMode='cover'
                source = {getArtistImageSourceBig(artist)}
            />
            <GenreBubbleCards genres={genres} style={styles.genreBubleCards}/>
        </View>
  );
}



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
  

export default ArtistAvatar;

const spotifyLinkSize = 40;

const styles = StyleSheet.create({
    artistPortraitContainer: {
        width: '100%',
        height: 240,
    },
        artistPortrait: {
        width: '100%',
        height: '100%',
    },
        genreBubleCards: {
        marginTop: -32,
        marginLeft: 2,
    },
    spotifyLink: {
        width: spotifyLinkSize,
        height: spotifyLinkSize,
    },
    spotifyLinkButtonContainer: {
        position: 'absolute',
        top: 8,
        right: 12,
        zIndex: 1,
    },
})
