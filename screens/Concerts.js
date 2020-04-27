import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';



import { Colors, Screens, Buttons, Font } from '../styles'

import { useSelector, useDispatch } from 'react-redux';

//import { setUpcomingConcerts, fetchConcertAPICredentials } from '../redux/actions/getConcertsActions'
import { getUserLocation, getConcertsAtLocation } from "../store/concerts/concertsActions"
import BasicConcert from '../components/BasicConcert';

export default function Concerts(props) {

  const dispatch = useDispatch();


  const userLocation = useSelector(state => state.concerts.userLocation);
  const artists = useSelector(state => state.musicProfile.artists);
  const tracks = useSelector(state => state.musicProfile.tracks);
  const concertsAtLocation = useSelector(state => state.concerts.concertsAtLocation);

  if (!userLocation){
    dispatch(getUserLocation());
    return loadingScreen()
  }else if(!concertsAtLocation){
    dispatch(getConcertsAtLocation());
    return loadingScreen();
  }

  return (
    <View style={styles.container}>
      <Text>CONCERTS</Text>

      <View style={{flex: 1}}>
        <FlatList
              data={concertsAtLocation}
              renderItem={({ item }) => <BasicConcert concert = {item} pressForDetail = {true} navigation={props.navigation} />}
              //keyExtractor={item => item.id}
              keyExtractor = {(item, index) => `list-item-${index}`}
        />
      </View>
    </View>
  );
}



  // concerts TODO
  // 1. get API data with location & API key
  // 2. filter by my artists
  // 3. sort by closest date
  // 4. disaptch to state
  // 5. display nicely



const loadingScreen = () => {
  return (
      <View style = {styles.loadingScreenContainer}>
          <Text>Loading...</Text>
          <Text>Loading...</Text>
          <Text>Loading...</Text>
          <Text>Loading...</Text>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
  },
  title: {
    fontSize: 22,
  },
});