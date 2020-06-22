import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
  
import { Screens } from '../styles'
  

  
const SplashArt = () => {
    return (
      <View style = {styles.container}>
        { /*<Image source={require('../graphics/X-Icon.jpg')} style = {styles.image} /> */ }
      </View>
    )
}

export default SplashArt;


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  image: {
      borderRadius: 25,
      width: 50,
      height: 50,
  },
});
