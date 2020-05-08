import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { Colors } from '../styles'
import { TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const SearchBar = ({ searchCallback, placeholderText, autoCapitalize, autoCorrect, autoFocus }) => {
  const [text, setText] = useState('')

  const onChangeText = (text) => {
    setText(text);
    searchCallback(text);
  }

    return (
      <View style={styles.container}>
        <TextInput
            style = {styles.typingText}
            placeholder = {placeholderText}
            placeholderTextColor="#a3a3a3"
            onChangeText = {text => onChangeText(text)}
            autoCapitalize = {autoCapitalize}
            autoCorrect = {autoCorrect}
            autoFocus = {autoFocus}
            value = {text}
        />
        <View style = {styles.closeContainer}>
          <TouchableWithoutFeedback onPress = {() => onChangeText('')}>
            <Icon style = {styles.close} name = 'close-circle' size = {22} color = "#b3b3b3"/>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }




const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    typingText: {
        color: '#d6d6d6',
        fontSize: 16,
        backgroundColor: '#404040',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        width: '100%'
    },
    closeContainer: {
      position: 'absolute',
      right: 10,
    },
    close: {
      marginTop: 2,
    },
});

  
export default SearchBar;