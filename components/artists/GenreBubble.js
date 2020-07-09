import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

import { Colors } from '../../styles'
import BaseText from '../BaseText'

export default function GenreBuble({ genre }) {
  return (
  <View style = {styles.container}>
    <BaseText style = {styles.text}>{genre}</BaseText>
  </View>
  )
}

const HEIGHT = 24

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    marginHorizontal: 4,
    borderRadius: HEIGHT/2,
    backgroundColor: Colors.THEME_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.75,
    opacity: 0.9,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 8,
  },
});