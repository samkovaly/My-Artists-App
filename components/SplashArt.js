import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
  
import { Screens } from '../styles'
  

  
const SplashArt = () => {
    return (
      <View style = {styles.container}>
        <Image source={require('../graphics/my-artists-icon-M-light.png')} resizeMode = 'contain' style = {styles.image} />
      </View>
    )
}

export default SplashArt;


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 90,
    height: 90,
  },
});
