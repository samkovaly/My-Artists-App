import React, { useState } from 'react';
import { Switch, StyleSheet, View } from "react-native";

import { Colors } from '../../styles'
import SettingsElement from './SettingsElement';




const SettingsSwitch= ({ text, onSwitch, style}) => {


    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        onSwitch(!isEnabled)
    }

    return (
        <SettingsElement
            text = {text}
            textStyle = {{color: Colors.BASE_TEXT_COLOR}}
            containerStyle = {style}
        >
            <View style = {styles.switch}>
                <Switch
                    trackColor={{ false: Colors.SWITCH_OFF_BACKGROUND, true: Colors.SWITCH_ON_BACKGROUND }}
                    thumbColor={isEnabled ? Colors.SWITCH_THUMB_COLOR : Colors.SWITCH_THUMB_COLOR}
                    ios_backgroundColor = {Colors.SWITCH_OFF_BACKGROUND}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </SettingsElement>
    )
}

export default SettingsSwitch;




const styles = StyleSheet.create({
    switch: {
        position: 'absolute',
        right: 10,
    },
})
