import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SPOTIFY_GREEN, SPOTIFY_BLACK, LOGOUT_BUTTON_RED } from '../styles/colors';

import { useSelector } from 'react-redux';





export default function Discovery(props) {


  return (
    <View style={styles.container}>
      <Text style = {styles.mainText}>Discovery</Text>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPOTIFY_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 32,
    color: 'white',
  },
});