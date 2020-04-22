
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
  
import { Colors } from '../styles'
  
  
  
  const AnalyzingSpotifyArt = () => {
    return (
      <View style = {styles.container}>
        <Image source={require('../graphics/spotify-icon-green-transparent.png')} style = {styles.image} />
        <Text style={styles.text} >Analyzing Your Spotify Data...</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.SPOTIFY_BLAC,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 32,
        color: 'white',
    },
  });

  export default AnalyzingSpotifyArt;