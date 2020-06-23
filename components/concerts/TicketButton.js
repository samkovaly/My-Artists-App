import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { Colors, Screens } from '../../styles'

import { Linking } from 'expo';

import BaseText from '../BaseText'


const TicketButton= ({ url }) => {
    return (
        <TouchableHighlight
            style = {styles.button}
            onPress={() => linkToSeatGeek(url)}>
            <BaseText style = {styles.text}>Get Tickets</BaseText>
        </TouchableHighlight>
    )
}

export default TicketButton;



const linkToSeatGeek = (url) => {
    Linking.openURL(url);
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.BUTTON_TICKET_DARK_BLUE,
        padding: 8,
        borderRadius: 3,
        width: 300,
        alignItems: 'center',
    },
    text: {
      fontSize: 22,
    }
  });