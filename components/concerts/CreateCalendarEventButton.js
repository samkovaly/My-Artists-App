import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../styles'

import Icon from 'react-native-vector-icons/FontAwesome'



const CreateCalendarEventButton = ({ concert }) => {
    return (
        <TouchableOpacity
            //onPress={}
        >
            <Icon name = "calendar" color = {Colors.THEME_BLUE} size = {28} />
        </TouchableOpacity>
    )
}
export default CreateCalendarEventButton;



  
const styles = StyleSheet.create({
});