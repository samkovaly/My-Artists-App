import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';

import { Colors } from '../../styles'

import BaseText from '../BaseText'

import Icon from 'react-native-vector-icons/MaterialIcons';

// styled view for all settings buttons, redirects and switches

const SettingsElement = ({ children, text, textStyle, containerStyle, onPress }) => {

    const getInnerContainer = () => {
        return (
            <View style = {styles.innerContainer}>
                <BaseText style = {[styles.text, textStyle]}>{text}</BaseText>
                {children}
            </View>
        )
    }

    if(onPress){
        return (
            <TouchableHighlight
                onPress = {onPress}
                underlayColor={Colors.SETTINGS_BUTTON_HIGHLIGHT}
                activeOpacity={1}
                style = {[styles.outerContainer, containerStyle]}
            >
                {getInnerContainer()}
            </TouchableHighlight>
        )
    }else{
        return (
            <View style = {[styles.outerContainer, containerStyle]}>
                {getInnerContainer()}
            </View>
        )
    }

}




export default SettingsElement;



//const borderVerticalWidth = 0.25;
const height = 50;

  
const styles = StyleSheet.create({
    outerContainer: {
        //backgroundColor: Colors.FOREGROUND_BLUE,
        //borderTopWidth: borderVerticalWidth,
        //borderBottomWidth: borderVerticalWidth,
        //borderColor: 'grey',
    },
    innerContainer: {
        flex: 1,
        height: height,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.FOREGROUND_BLUE
    },
    text: {
      fontSize: 17,
      fontWeight: '400',
      marginLeft: 16,
    },
  });