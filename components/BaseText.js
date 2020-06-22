import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Colors } from '../styles'


const color = Colors.BASE_TEXT_COLOR;


const BaseText = ({ children, style }) => {
    return (
    <Text style = {[styles.text, style]}>
        {children}
    </Text>
  );
}

const styles = StyleSheet.create({
    text: {
        color: color,
    }
})

export default BaseText;


