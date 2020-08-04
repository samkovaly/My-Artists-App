import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import GenreBubbleCards from './GenreBubbleCards'
import { getArtistImageSourceBig } from '../../utilities/imageSources'
import { TouchableWithoutFeedback } from 'react-native';

import { Constants } from '../../styles';
import * as Linking from 'expo-linking'

const ArtistAvatar = ({ artist, genres }) => {
    let screenHeight = Dimensions.get('window').height;
    return (
        <View style = {[styles.artistPortraitContainer, {
            height: screenHeight / Constants.ARTIST_AVATAR_SCREEN_HEIGHT_RATIO,
        }]}>
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
