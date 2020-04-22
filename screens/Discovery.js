import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';


import { Screens, Font } from '../styles'



export default function Discovery(props) {


  return (
    <View style={styles.container}>
      <Text style = {styles.mainText}>Discovery</Text>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainerFlexStart,
  },
  mainText: {
    ...Font.largeWhiteText,
    margin: 50,
  },
});