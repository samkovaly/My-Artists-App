import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';


import { Colors, Screens, Buttons, Font } from '../../styles'

import { useSelector, useDispatch } from 'react-redux';

import { getUserLocation, getAllConcerts } from "../../store/concerts/concertsActions"

import ConcertList from '../../components/concerts/ConcertList'




export default function Concerts(props) {

  const dispatch = useDispatch();

  const [searchingLocation, setSearchingLocation] = useState(false);

  const userLocation = useSelector(state => state.concerts.userLocation);
  const artists = useSelector(state => state.musicProfile.artists);
  const tracks = useSelector(state => state.musicProfile.tracks);
  const auth = useSelector(state => state.authentication);
  const apiKey = useSelector(state => state.authentication.APICredentials.googlePlacesAPI.key);





  const allConcerts = useSelector(state => state.concerts.allConcerts);
  //const concertsUsersArtists




  if (!userLocation){
    dispatch(getUserLocation());
    return loadingScreen()
  }else if(!allConcerts){
    dispatch(getAllConcerts());
    return loadingScreen();
  }

  return (
    <View style={styles.container}>
        <ConcertList concerts = {allConcerts} displayConcertName={false} style = {styles.concertListContainer} navigation={props.navigation} />
    </View> 
  );
}


const loadingScreen = () => {
  return (
      <View style = {styles.container}>
          <Text style = {styles.loadingText} >Loading...</Text>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 28,
  },
  concertListContainer: {

  },
});