import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'



const BasicButton= ({ text, onPress }) => {
    return (
        <TouchableHighlight
            style = {styles.button}
            onPress={() => {onPress()}}>
            <Text style = {styles.text}>{text}</Text>
        </TouchableHighlight>
    )
}

export default BasicButton;




const styles = StyleSheet.create({
    button: {
        ...Buttons.mediumButtonCoolGrey,
    },
    text: {
      ...Buttons.largeButtonWhiteText,
    }
  });