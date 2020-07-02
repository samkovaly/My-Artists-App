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
        backgroundColor: Colors.CONCERT_CARD_BACKGROUND,
            padding: 10,
            borderRadius: 2,
            //width: 165,
            width: "80%",
            alignItems: 'center',
        },
        text: {
          fontSize: 18,
        }
  });