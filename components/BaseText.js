import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Colors } from '../styles'


const color = Colors.BASE_TEXT_COLOR;


const BaseText = (props) => {
    return (
    <Text {...props} style = {[styles.text, props.style]}>
        {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
    text: {
        color: color,
    }
})

export default BaseText;


