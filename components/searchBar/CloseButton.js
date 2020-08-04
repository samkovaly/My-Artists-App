import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Colors } from '../../styles'



const CloseButton = ({ onClose }) => {

  return (
      <TouchableWithoutFeedback
        onPress = {() => onClose()}>
        <Icon
          name = 'close-circle'
          size = {23}
          color = {Colors.LIGHT_GREY}
          style = {styles.close}
        />
      </TouchableWithoutFeedback>
  )
}
export default CloseButton;

const styles = StyleSheet.create({
    close: {
      position: 'absolute',
      right: 10,
      paddingTop: 2,
    },
});
