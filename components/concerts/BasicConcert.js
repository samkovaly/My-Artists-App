import React from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens } from '../../styles'
import { useNavigation } from '@react-navigation/native'

import BaseText from '../BaseText'
import { getConcertImageSource } from '../../utilities/imageSources'

const BasicConcert = ({ concert, displayConcertName, pressForDetail }) => {

  const navigation = useNavigation();

  let name = ''
  if(displayConcertName){
    name = concert.name;
  }else{
    if(concert.artists){
      name = concert.artists[0].name;
    }else{
      name = concert.name;
    }
  }

  if(name.length > 25){
    name = name.slice(0,25) + "...";
  }

  const innerContainer = (displayDate) => (
    <View style={styles.container}>
      <Image
          style={styles.avatar}
          source={getConcertImageSource(concert)}
       />
       <View style = {styles.textContaier}>
        <BaseText style={styles.artist}>{name}</BaseText>
        <View style={styles.venueCityContainer}>
          <BaseText style={styles.venue}>{concert.venue ? concert.venue.name: "N/A"}</BaseText>
          <BaseText style={styles.city}>{concert.venue.city}</BaseText>
        </View>
        <BaseText style={styles.date}>{displayDate}</BaseText>
      </View>
    </View>
    )

    

    if(pressForDetail){
      return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("ConcertDetail", {concert})}>
            {innerContainer(concert.displayDate)}
        </TouchableWithoutFeedback>
      )
    }else{
      return innerContainer(concert.displayDate);
    }

}

export default BasicConcert;






const elementHeight = 90;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: Colors.FOREGROUND_BLUE,
      backgroundColor: Colors.BACKGROUND_DARK_BLUE,
      marginVertical: 12,
      height: elementHeight,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
    },

    
    avatar: {
      borderRadius: 4,
      width: elementHeight,
      height: elementHeight,
      marginVertical: 6,
    },


    textContaier: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 14,
    },

    artist: {
      fontSize: 18,
      flex: 1.25,
    },
    
    venueCityContainer: {
      flex: 2.5,
      justifyContent: 'center',
    },

    venue: {
      color: Colors.SUB_TEXT_GREY,
      fontSize: 14,
    },
    city: {
      marginTop: -2,
      color: Colors.SUB_TEXT_GREY,
      fontSize: 14,
    },
    
    date: {
      color: Colors.SUB_TEXT_GREY,
      fontSize: 14,
      flex: 1,
    },

  });