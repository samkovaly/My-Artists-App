import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Colors } from '../styles'
import { TextInput } from 'react-native-gesture-handler';


const SearchBar = ({ artist }) => {
    return (
      <View style={styles.container}>
        <TextInput>type here...</TextInput>
      </View>
    );
  }




const styles = StyleSheet.create({
    containter: {
        backgroundColor: Colors.SPOTIFY_BLACK
    },
    inactiveText: {
        color: 'grey',
    },
    typingText: {
        color: 'white'
    },
});

  
export default SearchBar;
