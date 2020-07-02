import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { getArtistImageSourceBig } from '../../utilities/imageSources'
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../styles'
import BaseText from '../BaseText'

export default function ArtistCard({ artist }) {

    const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("ArtistDetail", { artist })}>
        <View style = {[styles.container, styles.shadow]}>
            <BaseText style = {[styles.name, styles.textShadow]}>{artist.name}</BaseText>
            <View style = {styles.artistPortraitContainer}>
                <Image
                    style={styles.artistPortrait}
                    resizeMode='cover'
                    source = {getArtistImageSourceBig(artist)}
                />
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

const RATIO = 16/12;
const WIDTH = 120;

const HEIGHT = WIDTH * RATIO;
const BORDER_RADIUS = 12;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,
    },
  container: {
    //height: HEIGHT,
    marginRight: 24,
    flexDirection: 'column',
    //backgroundColor: Colors.GENRE_BACKGROUND_COLOR,
    //alignItems: 'center',
    //justifyContent: 'center',
    //borderColor: 'white',
    //borderWidth: 0.75,
    //opacity: 0.9,
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS,
  },
    name: {
        position: 'absolute',
        left: 6,
        top: 4,
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 1,
        padding: 6,
    },
    textShadow: {
        textShadowColor: '#000000',
        textShadowRadius: 3,
        textShadowOffset: { width: 2, height: 2 },
      },
    artistPortraitContainer: { 
        width: WIDTH,
        height: HEIGHT,
        zIndex: 0,
        borderRadius: BORDER_RADIUS,
    },
    artistPortrait: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS,
    },
});