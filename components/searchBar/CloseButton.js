import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Colors } from '../../styles'



const CloseButton = ({ onClose }) => {
    return (
        <TouchableWithoutFeedback style = {styles.closeContainer} onPress = {() => onClose()}>
          <Icon style = {styles.close} name = 'close-circle' size = {22} color = {Colors.LIGHT_GREY}/>
        </TouchableWithoutFeedback>
    )
}
export default CloseButton;

const styles = StyleSheet.create({
    closeContainer: {
      flex: 1,
    },
    close: {
      marginTop: Platform.OS === 'ios' ? 2 : 0,
    },
});
