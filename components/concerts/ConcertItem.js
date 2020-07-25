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
  const venue = concert.venue
  let venueName = 'N/A';
  let venueState = 'N/A';
  let venueCity = 'N/A';

  if(venue){
    venueState = venue.state;
    venueCity = venue.city;
    if(venue.name.length > 30){
      venueName = venue.name.slice(0, 30) + "...";
    }else{
      venueName = venue.name;
    }
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
          <BaseText style={[styles.venue, {fontSize: subtextFontSize}]}>{venueName}</BaseText>
          <BaseText style={[styles.city, {fontSize: subtextFontSize}]}>{venueCity}, {venueState}</BaseText>
        </View>
          { concert.date_tbd ? 
            <BaseText style={[styles.date, {fontSize: subtextFontSize}]}>Date TBD</BaseText>
          :
            <BaseText style={[styles.date, {fontSize: subtextFontSize}]}>{displayDate}</BaseText>
          }
        </View>
    </View>
    )

    if(pressForDetail){
      return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("ConcertDetail", {concert})}>
            {innerContainer(concert.displayDateShort)}
        </TouchableWithoutFeedback>
      )
    }else{
      return innerContainer(concert.displayDateShort);
    }

}

export default ConcertItem;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.CONCERT_ITEM_BACKGROUND,
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
      marginVertical: 3,
    },

    artist: {
      flex: 1.5,
      includeFontPadding: true,
    },
    
    venueCityContainer: {
      flex: 2.5,
      justifyContent: 'center',
    },

    venue: {
      color: Colors.SUB_TEXT_GREY,
      includeFontPadding: false,
    },
    city: {
      marginTop: -2,
      color: Colors.SUB_TEXT_GREY,
      includeFontPadding: false,
    },
    date: {
      flex: 1.25,
      color: Colors.SUB_TEXT_GREY,
      includeFontPadding: false,
    },
  });