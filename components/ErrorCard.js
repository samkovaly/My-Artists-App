import React, { useState } from 'react';


import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ErrorCard = ({ showError, close, header, message }) => {

    return (
        <View style = {[styles.modalContainer, {opacity: showError}]}>
            <Text style = {styles.header }>{header}</Text>
            <Text style = {styles.message }>{message}</Text>
            <TouchableHighlight style = {styles.close} onPress={() => close()}>
                    <Icon name = "close" size = {25} color = 'white' />
            </TouchableHighlight>
        </View>
    )
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
        marginTop: 38,
        padding: 18,
        backgroundColor: '#c93524',

        borderRadius: 8,
        //...shadow,

        zIndex: 1,

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: -2,
    },
    message: {
        fontSize: 17,
        color: 'white',
    },
    close: {
        position: 'absolute',
        right: 8,
        top: 6,
    },
})