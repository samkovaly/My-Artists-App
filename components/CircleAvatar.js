import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'
import { getConcertImageSource } from '../utilities/imageSources'


const CircleAvatar = ({ concert, radius }) => {

    return (
        <View style = {styles.container}>
            <Image
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    borderRadius: radius,
                }}
                //resizeMode='cover'
                source = {getConcertImageSource(concert)}
            />
        </View>
  );
}


  

export default CircleAvatar;


const styles = StyleSheet.create({
    container: {
        //width: '100%',
        //height: 240,
    },
    avatar: {
       // width: 
    },
})
