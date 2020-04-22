import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { ListItem, ThemeProvider, Card } from 'react-native-elements';


import { Colors, Screens, Buttons, Font } from '../styles'

import { useSelector, useDispatch } from 'react-redux';

//import { setUpcomingConcerts, fetchConcertAPICredentials } from '../redux/actions/getConcertsActions'
import { getUserLocation, getConcertsAtLocation } from "../store/concerts/concertsActions"
import concertsReducer from '../store/concerts/concertsReducer';


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

  //console.log(concertsAtLocation);
  return displayConcerts(concertsAtLocation);
}



  // concerts TODO
  // 1. get API data with location & API key
  // 2. filter by my artists
  // 3. sort by closest date
  // 4. disaptch to state
  // 5. display nicely

const displayConcerts = (concerts) => {
  //console.log('concerts', concerts)
  return (
    <View style={styles.container}>
      <Text>CONCERTS</Text>

      <View style={{flex: 1}}>
        <ScrollView>
          <Card containerStyle={{ padding: 5}}>
            {
              concerts? concerts.map((concert, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: {uri: concert.image.url || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" } }}
                  title={concert.artist ? concert.artist.name : "N/A"}
                  subtitle={concert.start.localDate || "N/A"}
                  titleStyle={styles.title}
                  bottomDivider
                  />
              ))
              : <Text>not fetched yet</Text>}
            </Card>
          </ScrollView>
      </View>
    </View>
  );
}


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