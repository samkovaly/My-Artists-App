import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { Colors, Screens } from '../styles'

import BaseText from './BaseText'


const BasicButton= ({ text, onPress, containerStyle, textStyle }) => {
    return (
        <TouchableHighlight
            style = {[styles.button, containerStyle]}
            onPress={() => {onPress()}}>
            <BaseText style = {[styles.text, textStyle]}>{text}</BaseText>
        </TouchableHighlight>
    )
}

export default BasicButton;




const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.FOREGROUND_BLUE,
        padding: 15,
        borderRadius: 12,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    }
  });