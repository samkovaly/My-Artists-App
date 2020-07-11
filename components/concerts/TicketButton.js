import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import { Colors, Screens } from '../../styles'

import { Linking } from 'expo';
import BasicButton from '../BasicButton'


const TicketButton= ({ url }) => {
    return (
        <BasicButton text = "Get tickets" onPress = {() => linkToSeatGeek(url)}
            containerStyle = {styles.button}
        />
    )
}

export default TicketButton;



const linkToSeatGeek = (url) => {
    Linking.openURL(url);
}



const styles = StyleSheet.create({
    button: {
        width: "80%",
    },  
  });