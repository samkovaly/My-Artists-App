import React from 'react';
import {StyleSheet } from 'react-native'
import SettingsElement from './SettingsElement';

import { Colors } from '../../styles'

const SettingsActionButton = ({ text, textColor, onPress, style, textStyle }) => {
    return (
        <SettingsElement
            text = {text}
            textStyle = {{color: textColor}}
            containerStyle = {style}
            onPress = {onPress}
        />
    )
}

export default SettingsActionButton;