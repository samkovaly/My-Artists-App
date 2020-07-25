import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { Colors } from '../../styles'
import SearchIcon from './SearchIcon';
import CloseButton from './CloseButton';


const SearchBar = ({ initialText, searchCallback, placeholderText, containerStyle, autoCapitalize, autoCorrect, autoFocus }) => {
  const [text, setText] = useState(initialText)

  const onChangeText = (text) => {
    setText(text);
    searchCallback(text);
  }

    return (
      <View style={[styles.container, containerStyle]}>
        <SearchIcon />
        <TextInput
            style = {styles.typingText}
            placeholder = {placeholderText}
            placeholderTextColor={Colors.LIGHT_GREY}
            onChangeText = {text => onChangeText(text)}
            autoCapitalize = {autoCapitalize}
            autoCorrect = {autoCorrect}
            autoFocus = {autoFocus}
            value = {text}
            keyboardAppearance = {'dark'}
            returnKeyType = {'search'}
        />
        <CloseButton onClose={() => onChangeText('')}/>
        
      </View>
    );
  }
export default SearchBar;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.SEARCH_BAR_BACKGROUND,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginHorizontal: 6,
      marginVertical: 6,
    },
    typingText: {
        color: Colors.SEARCH_BAR_INPUT,
        fontSize: 16,
        flex: 10,
    },
});