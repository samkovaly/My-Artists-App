import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import { Colors, Screens } from '../../styles'

import { Linking } from 'expo';

import BaseText from '../BaseText'


const TicketButton= ({ url }) => {
    return (
        <TouchableOpacity
            style = {styles.button}
            onPress={() => linkToSeatGeek(url)}>
            <BaseText style = {styles.text}>Get Tickets</BaseText>
        </TouchableOpacity>
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
        borderRadius: 4,
        width: 150,
        alignItems: 'center',
    },
    text: {
      fontSize: 22,
    }
  });