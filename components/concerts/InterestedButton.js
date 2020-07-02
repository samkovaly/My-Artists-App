import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../styles'


import BaseText from '../BaseText'
import Icon from 'react-native-vector-icons/MaterialIcons'

const InterestedButton = ({ disabled, initialInterested, updateInterested}) => {
    const [interested, setInterested] = useState(initialInterested);
    const heartSize = 30;
    return (
        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                if(!disabled){
                    setInterested(!interested);
                    updateInterested(!interested);
                }
            }}>
            { interested ?
                <Icon name = "favorite" color = {Colors.FAVORITE_HEART_RED} size = {heartSize}/>
            :
                <Icon name = "favorite-border" color = "grey" size = {heartSize}/>
            }
        </TouchableOpacity>
    )
    /*
    return (
        <TouchableHighlight
            style = {[styles.button, interested ?
                {backgroundColor: '#d14c3b'} :
                {backgroundColor: '#4a433f'}
            ]}
            underlayColor = 'red'
            onPress={() => {
                if(!disabled){
                    setInterested(!interested);
                    updateInterested(!interested);
                }
            }}>
            <BaseText style = {styles.text}>Interested</BaseText>
        </TouchableHighlight>
    ) */
}
export default InterestedButton;



const styles = StyleSheet.create({
    button: {
        //padding: 10,
        //borderRadius: 2,
        //width: 165,
        //alignItems: 'center',
    },
    text: {
      //fontSize: 18,
    }
  });