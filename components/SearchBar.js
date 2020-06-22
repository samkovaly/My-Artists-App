import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { Colors } from '../styles'
import { TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign';



const SearchBar = ({ initialText, searchCallback, placeholderText, containerStyle, autoCapitalize, autoCorrect, autoFocus }) => {
  const [text, setText] = useState(initialText)

  const onChangeText = (text) => {
    setText(text);
    searchCallback(text);
  }

    return (
      <View style={[styles.container, containerStyle]}>
          <IconAntDesign
            name='search1'
            size = {20}
            color = "white"
            style = {styles.searchIcon}
          />
        
        <TextInput
            style = {styles.typingText}
            placeholder = {placeholderText}
            placeholderTextColor="#a3a3a3"
            onChangeText = {text => onChangeText(text)}
            autoCapitalize = {autoCapitalize}
            autoCorrect = {autoCorrect}
            autoFocus = {autoFocus}
            value = {text}
            keyboardAppearance = {'dark'}
            returnKeyType = {'search'}
        />
        <TouchableWithoutFeedback style = {styles.closeContainer} onPress = {() => onChangeText('')}>
            <Icon style = {styles.close} name = 'close-circle' size = {22} color = "#b3b3b3"/>
          </TouchableWithoutFeedback>
        
      </View>
    );
  }




const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2a2e33',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginHorizontal: 6,
      marginVertical: 6,
    },
    typingText: {
        color: '#d6d6d6',
        fontSize: 16,
        flex: 10,
    },
    searchIcon: {
      flex: 1,
      marginRight: 2,
    },
    closeContainer: {
      flex: 1,
    },
    close: {
      marginTop: 2,
    },
});

  
export default SearchBar;