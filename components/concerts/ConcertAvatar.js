import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import { getConcertImageSource } from '../../utilities/imageSources'

import { Constants } from '../../styles';

const ConcertAvatar = ({ concert }) => {
    let screenHeight = Dimensions.get('window').height;
    return (
        <View style = {[styles.concertPortraitContainer,
        {
            height: screenHeight / Constants.ARTIST_AVATAR_SCREEN_HEIGHT_RATIO,
        }]}>
            <Image
                style={styles.concertPortrait}
                resizeMode='cover'
                source = {getConcertImageSource(concert)}
            />
        </View>
  );
}

export default ConcertAvatar;

const styles = StyleSheet.create({
    concertPortraitContainer: {
        width: '100%',
    },
    concertPortrait: {
        width: '100%',
        height: '100%',
    },
})
