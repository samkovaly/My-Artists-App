import React, { useState } from 'react';


import { View,  StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from './BaseText'

import { Colors } from '../styles'

const ErrorCard = ({ showError, close, header, message }) => {

    if(showError){
        return (
            <View style = { styles.modalContainer }>
                <BaseText style = {styles.header }>{header}</BaseText>
                <BaseText style = {styles.message }>{message}</BaseText>
                <TouchableHighlight style = {styles.close} onPress={() => close()}>
                        <Icon name = "close" size = {25} color = 'white' />
                </TouchableHighlight>
            </View>
        )
    }else{
        return null;
    }
}


export default ErrorCard;


const shadow = {
    shadowColor: "black",
    shadowOffset: {
        width: -2,
        height: -4
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5
}
const absoluteTop = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}


const styles = StyleSheet.create({
    modalContainer: {
        ...absoluteTop,
        marginHorizontal: 14,
        marginTop: 14,
        padding: 18,
        backgroundColor: Colors.ERROR_MODAL_RED,

        borderRadius: 8,
        //...shadow,
        zIndex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: -2,
    },
    message: {
        fontSize: 17,
    },
    close: {
        position: 'absolute',
        right: 8,
        top: 6,
    },
})