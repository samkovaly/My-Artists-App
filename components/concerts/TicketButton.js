import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import { Colors, Screens } from '../../styles'

import * as Linking from 'expo-linking'
import BasicButton from '../BasicButton'


const TicketButton= ({ url }) => {
    return (
        <BasicButton text = "Get tickets" onPress = {() => linkToSeatGeek(url)}
            containerStyle = {styles.button}
        />
    )
}

export default TicketButton;



const linkToSeatGeek = async (url) => {
    const canOpen = await Linking.canOpenURL(url);
    if(canOpen){
        Linking.openURL(url);
    }else{
        console.log("can't open seatgeek URL", url)
    }
}



const styles = StyleSheet.create({
    button: {
        width: "80%",
        padding: 10,
    },  
  });