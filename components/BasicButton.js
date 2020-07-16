import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { Colors, Screens } from '../styles'

import BaseText from './BaseText'


const BasicButton= ({ text, onPress, containerStyle, textStyle, underlayColor }) => {
    return (
        <TouchableHighlight
            style = {[styles.button, containerStyle]}
            onPress={() => {onPress()}}
            underlayColor = { underlayColor ? underlayColor : Colors.BUTTON_UNDERLAY }>
            <BaseText style = {[styles.text, textStyle]}>{text}</BaseText>
        </TouchableHighlight>
    )
}

export default BasicButton;




const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.THEME_BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        borderRadius: 5,
        padding: 12,
    },
    text: {
        fontSize: 18,
    }
  });