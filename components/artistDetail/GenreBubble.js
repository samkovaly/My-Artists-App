import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';



export default function GenreBuble({ genre }) {



  return (
  <View style = {styles.container}>
    <Text style = {styles.text}>{genre}</Text>
  </View>
  )
}

const HEIGHT = 24

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    marginHorizontal: 4,
    borderRadius: HEIGHT/2,
    backgroundColor: '#de1c07',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.75,
    opacity: 0.9,
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
  },
});