import React from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens } from '../../styles'
import { useNavigation } from '@react-navigation/native'

import BaseText from '../BaseText'
import { getConcertImageSource } from '../../utilities/imageSources'

const ConcertItem = ({ concert, elementHeight, titleFontSize, subtextFontSize, marginVertical, displayConcertName, pressForDetail }) => {

  const navigation = useNavigation();

  let name = ''
  if(displayConcertName){
    name = concert.name;
  }else{
    if(concert.performers){
      name = concert.performers[0].name;
    }else{
      name = concert.name;
    }
  }

  if(name.length > 25){
    name = name.slice(0,25) + "...";
  }

  const innerContainer = (displayDate) => (
    <View style={[styles.container, {height: elementHeight, marginVertical: marginVertical}]}>
      <Image
          style={[styles.avatar, 
            {
            width: elementHeight,
            height: elementHeight,
          }]}
          source={getConcertImageSource(concert)}
       />
       <View style = {styles.textContaier}>
        <BaseText style={[styles.artist, {fontSize: titleFontSize}]}>{name}</BaseText>
        <View style={styles.venueCityContainer}>
          <BaseText style={[styles.venue, {fontSize: subtextFontSize}]}>{concert.venue ? concert.venue.name: "N/A"}</BaseText>
          <BaseText style={[styles.city, {fontSize: subtextFontSize}]}>{concert.venue.city}, {concert.venue.state}</BaseText>
        </View>
        <BaseText style={[styles.date, {fontSize: subtextFontSize}]}>{displayDate}</BaseText>
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

export default ConcertItem;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.BACKGROUND_DARK_BLUE,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
    },
    
    avatar: {
      borderRadius: 4,
      marginVertical: 6,
    },


    textContaier: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 14,
    },

    artist: {
      flex: 1.25,
    },
    
    venueCityContainer: {
      flex: 2.5,
      justifyContent: 'center',
    },

    venue: {
      color: Colors.SUB_TEXT_GREY,
    },
    city: {
      marginTop: -2,
      color: Colors.SUB_TEXT_GREY,
    },
    date: {
      color: Colors.SUB_TEXT_GREY,
    },
  });