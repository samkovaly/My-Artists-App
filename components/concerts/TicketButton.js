import React from 'react';
import { StyleSheet } from 'react-native';

import AppLink from 'react-native-app-link';
//import * as Linking from 'expo-linking'

import BasicButton from '../BasicButton'


const TicketButton= ({ eventID }) => {
    return (
        <BasicButton text = "Get tickets" onPress = {() => linkSeatGeekAppEvent(eventID)}
            containerStyle = {styles.button}
        />
    )
}

export default TicketButton;



const linkSeatGeekAppEvent = async (eventID) => {
    const seatgeekEventLink = "seatgeek://events/" + eventID
    const seatgeekInfo = {
        appName: 'seatgeek',
        appStoreId: '582790430',
        appStoreLocale: 'us',
        playStoreId: 'com.seatgeek.android'
    }

    try {
        await AppLink.maybeOpenURL(seatgeekEventLink, seatgeekInfo);
        return;
    }catch(error){
        console.log(error)
    }
    
    // if not
    try{
        await AppLink.openInStore(seatgeekInfo);
        return;
    }catch(error){
        console.log(error)
    }
}


const styles = StyleSheet.create({
    button: {
        width: "80%",
        padding: 10,
    },  
  });