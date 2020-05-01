import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'


const elementHeight = 60;
const imageHeightRatio = 0.75;


const BasicConcert = ({ concert, pressForDetail, navigation }) => {

  const innerContainer = () => (
    <View style={styles.innerContainer}>
      <Image
          style={styles.avatar}
          source={getImageSource(concert)}
       />
      <Text style={styles.title}>{concert.artists ? concert.artists[0].name : "N/A"}</Text>
    </View>
    )

  return (
    <View style={styles.outerContainer}>
      {pressForDetail ? 
        <TouchableWithoutFeedback onPress={() => navigation.navigate("ConcertDetail", {concert})}>
            {innerContainer()}
        </TouchableWithoutFeedback>
      :
          innerContainer()
      }
      <View style = {styles.bottomLine}/>
    </View>
    );
}

export default BasicConcert;


const getImageSource = (concert) => {
    if(concert && concert.artists && concert.artists[0] && concert.artists[0].image){
      return {uri: concert.artists[0].image}
    }else{
      return require('../graphics/blank-artist.jpg');
    }
}

const styles = StyleSheet.create({
    innerContainer: {
      backgroundColor: Colors.SPOTIFY_BLACK,
      padding: 4,
      marginVertical: 2,
      marginHorizontal: 2,
      height: elementHeight,
      flexDirection: 'row',
      flex: 1,
    },
    avatar: {
      borderRadius: (elementHeight * imageHeightRatio)/2 ,
      width: elementHeight * imageHeightRatio,
      height: elementHeight * imageHeightRatio,
    },
    title: {
      marginTop: 0,
      marginLeft: 12,
      color: 'white',
      fontSize: 18,
    },

    outerContainer: {

    },
    bottomLine: {
      marginLeft: 6,
      borderBottomWidth: 0.5,
      borderBottomColor: 'white',
      width: '88%',
    }
  });