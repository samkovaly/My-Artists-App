import React, { useState, useEffect } from 'react';


import { View, Animated, Easing, Image, StyleSheet, Dimensions } from 'react-native';

import { Colors, Screens} from '../styles'

 

import BaseText from './BaseText'

export default function AnalyzeSpotifyBackgroundAnimation({ runAnimation, screenHeight }) {


    useEffect(() => {
        startAnimation();
    }, [])

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(positionY, {
                    toValue: screenHeight,
                    duration: 3000,
                    easing: Easing.sin,
                }),
                Animated.timing(positionY, {
                    toValue: 0,
                    duration: 3000,
                    easing: Easing.sin,
                })
            ])
        ).start();
    }
    const [positionY, setPositionY]= useState(new Animated.Value(0))

    if(!runAnimation){
        positionY.stopAnimation();
    }



    return (
      <View style = {styles.container}>
        <BaseText style={styles.header} >Analyzing Your Spotify Data...</BaseText>
        <Image source = {require("../graphics/spotify-logo-name.png")} resizeMode="contain" style = {styles.logo} />
          <Animated.View style = {{
                ...styles.animatedView,
                top: positionY,
          }}>
              <View style = {styles.innerAnimatedView}>

              </View>
          </Animated.View>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    zIndex: 1,
  },
  animatedView: {
    position: 'absolute',
    left: 0,
    right: 0,

    zIndex: 0,

    height: 20,
    backgroundColor: Colors.SPOTIFY_GREEN,
    opacity: 0.65,
    shadowColor: 'white',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    justifyContent: 'center',
  },
  innerAnimatedView: {
    backgroundColor: 'white',
    height: 20,
    width: '100%',
    shadowColor: 'white',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    opacity: 0.225,
  },


  logo: {
    height: 200,
    width: 200,
    zIndex: 1,
  },
})