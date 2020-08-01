import React, { useState, useEffect } from 'react';


import { View, Animated, Easing, Image, StyleSheet, Dimensions } from 'react-native';
import {PixelRatio } from 'react-native';

import { Colors, Screens} from '../styles'
 

import BaseText from './BaseText'

const barHeight = 20;
const fontScale = PixelRatio.getFontScale();

export default function AnalyzeSpotifyBackgroundAnimation({ runAnimation, animationstart, animationEnd }) {

    useEffect(() => {
        startAnimation();
    }, [])

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(positionY, {
                    toValue: animationEnd - barHeight,
                    duration: 2500,
                    easing: Easing.sin,
                    useNativeDriver: true,
                }),
                Animated.timing(positionY, {
                    toValue: animationstart,
                    duration: 2500,
                    easing: Easing.sin,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }
    const [positionY, setPositionY]= useState(new Animated.Value(animationstart))

    if(!runAnimation){
        positionY.stopAnimation();
    }



    return (
      <View style = {styles.container}>
        <BaseText style={[styles.header, {fontSize: 22 / fontScale}]} >Analyzing your Spotify data...</BaseText>
          { /*<Image source = {require("../assets/spotify-logo-name.png")} resizeMode="contain" style = {styles.logo} /> */ }
          <Animated.View style = {{
                ...styles.animatedView,
                transform: [{
                  translateY: positionY,
                }]
          }}>
              <View style = {styles.innerAnimatedView}/>
          </Animated.View>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    zIndex: 1,
    color: Colors.SPOTIFY_GREEN,
  },
  animatedView: {
    backgroundColor: Colors.SPOTIFY_GREEN,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,

    zIndex: 0,

    height: barHeight,
    opacity: 0.65,
    /*
    shadowColor: 'white',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    */
    justifyContent: 'center',
  },
  innerAnimatedView: {
    backgroundColor: 'white',
    height: barHeight,
    width: '100%',
    /*
    shadowColor: 'white',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    */
    opacity: 0.225,
  },


  logo: {
    height: 200,
    width: 200,
    zIndex: 1,
  },
})