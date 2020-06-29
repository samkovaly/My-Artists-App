import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import { Colors } from '../../styles'


import BaseText from '../BaseText'


const InterestedButton= ({ interested, setInterested}) => {
    return (
        <TouchableHighlight
            style = {[styles.button, interested ?
                {backgroundColor: 'red'} :
                {backgroundColor: 'grey'}
            ]}
            underlayColor = 'red'
            onPress={() => setInterested(!interested)}>
            <BaseText style = {styles.text}>Interested</BaseText>
        </TouchableHighlight>
    )
}
export default InterestedButton;



const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 4,
        width: 150,
        alignItems: 'center',
    },
    text: {
      fontSize: 22,
    }
  });