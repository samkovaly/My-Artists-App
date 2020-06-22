import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../styles'

import SettingsElement from './SettingsElement';

import { useNavigation } from '@react-navigation/native';


const SettingsOpenScreenButton= ({ text, screen, screenArgs, style }) => {

    const navigation = useNavigation();

    return (
        <SettingsElement
            text = {text}
            textStyle = {{color: Colors.BASE_TEXT_COLOR}}
            containerStyle = {style}
            onPress = {() => {navigation.navigate(screen, screenArgs)}}
        >
            <Icon style = {styles.arrow} name="keyboard-arrow-right" size={30} color={Colors.BLUE_GREY}/>
        </SettingsElement>
    );
    
}

export default SettingsOpenScreenButton;

const styles = StyleSheet.create({
    arrow: {
        position: 'absolute',
        right: 10,
    },
})
