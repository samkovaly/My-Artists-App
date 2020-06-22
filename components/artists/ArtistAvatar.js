import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import GenreBubbleCards from './GenreBubbleCards'
import { getArtistImageSource } from '../../utilities/imageSources'

const ArtistAvatar = ({ artist, genres }) => {


    return (
        <View style = {styles.artistPortraitContainer}>
            <Image
                style={styles.artistPortrait}
                resizeMode='cover'
                source = {getArtistImageSource(artist)}
            />
            <GenreBubbleCards genres={genres} style={styles.genreBubleCards}/>
        </View>
  );
}
  

export default ArtistAvatar;


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
})
