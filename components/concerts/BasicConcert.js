import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'



const BasicConcert = ({ concert, displayConcertName, pressForDetail, navigation }) => {

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
          source={getImageSource(concert)}
       />
       <View style = {styles.textContaier}>
        <Text style={styles.artist}>{name}</Text>
        <View style={styles.venueCityContainer}>
          <Text style={styles.venue}>{concert.venue ? concert.venue.name: "N/A"}</Text>
          <Text style={styles.city}>{concert.venue.city}</Text>
        </View>
        <Text style={styles.date}>{displayDate}</Text>
      </View>
    </View>
    )

    let displayDate = 'N/A'
    if(concert.datetime_utc){
      displayDate = getDisplayDate(concert.datetime_utc);
    }



    if(pressForDetail){
      return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("ConcertDetail", {concert})}>
            {innerContainer(displayDate)}
        </TouchableWithoutFeedback>
      )
    }else{
      return innerContainer(displayDate);
    }

}

export default BasicConcert;


const getImageSource = (concert) => {
    if(concert && concert.artists && concert.artists[0] && concert.artists[0].image){
      return {uri: concert.artists[0].image}
    }else{
      return require('../../graphics/blank-artist.jpg');
    }
}





const elementHeight = 105;
const imageHeightRatio = 0.85;


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#222222',
      padding: 6,
      marginVertical: 4,
      marginHorizontal: 4,
      height: elementHeight,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      flex: 1,
    },

    
    avatar: {
      borderRadius: 10,
      width: elementHeight * imageHeightRatio,
      height: elementHeight * imageHeightRatio,
    },


    textContaier: {
      flex: 1,
      flexDirection: 'column',
      alignContent: 'space-between',
      marginLeft: 14,
    },

    artist: {
      color: 'white',
      fontSize: 18,
      flex: 1.25,
    },
    
    venueCityContainer: {
      flex: 2.5,
      justifyContent: 'center',
    },

    venue: {
      color: '#b5b5b5',
      fontSize: 14,
    },
    city: {
      marginTop: -2,
      color: '#b5b5b5',
      fontSize: 14,
    },
    
    date: {
      color: '#b5b5b5',
      fontSize: 14,
      flex: 1,
    },

  });




  const getDisplayDate = (isoString) => {
    const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();

    const hour24 = date.getHours();
    let hour = null;

    // 0 = 12am
    // 12 = 12pm
    let period = ''; 
    if(hour24 < 12){
      period = 'am';
      hour = hour24
    }else{
      period = 'pm';
      hour = hour24 - 12;
    }

    let minute = date.getMinutes();
    if(minute < 10){
      minute = '0' + minute;
    }

    const fullDisplayDate = dayOfWeek + ' ' + month + ' '+ dayOfMonth + ', ' + hour + ':' + minute + period;
    return fullDisplayDate;
  }