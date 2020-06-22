import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { Colors, Screens } from '../../styles'

import BaseText from '../BaseText'


const TicketButton= ({ }) => {
    return (
        <TouchableHighlight
            style = {styles.button}
            onPress={() => linkToSeatGeek()}>
            <BaseText style = {styles.text}>Get Tickets</BaseText>
        </TouchableHighlight>
    )
}

export default TicketButton;



const linkToSeatGeek = () => {
    console.log('linking to seatgeek...')
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