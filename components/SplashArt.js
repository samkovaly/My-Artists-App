import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
  
import { Colors } from '../styles'
  
  
  
const SplashArt = () => {
    return (
      <View style = {styles.container}>
        <Image source={require('../graphics/X-Icon.jpg')} style = {styles.image} />
      </View>
    )
}

export default SplashArt;


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SPOTIFY_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

  },
  image: {
      borderRadius: 25,
      width: 50,
      height: 50,
  },
});
