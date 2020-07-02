import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { getConcertImageSource } from '../../utilities/imageSources'


const ConcertAvatar = ({ concert }) => {
    return (
        <View style = {styles.concertPortraitContainer}>
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
        height: 240,
    },
    concertPortrait: {
        width: '100%',
        height: '100%',
    },
})
