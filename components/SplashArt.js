import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
  
import { Screens } from '../styles'
  

  
const SplashArt = () => {
  return (
    <Image source={require('../assets/splash.png')} resizeMode = 'cover' style = {styles.image} />
  )
}

export default SplashArt;


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
