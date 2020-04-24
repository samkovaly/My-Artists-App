import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { Colors } from '../styles'


const SearchBar = ({ searchCallback, style, placeholderText }) => {
    return (
      <View style={[styles.container, style]}>
        <TextInput
            style = {styles.typingText }
            placeholder = {placeholderText}
            placeholderTextColor="#a3a3a3"
            onChangeText = {text => searchCallback(text)}
        ></TextInput>
      </View>
    );
  }




const styles = StyleSheet.create({
    containter: {
    },
    typingText: {
        color: '#d6d6d6',
        fontSize: 16,
        backgroundColor: '#404040',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        
    },
});

  
export default SearchBar;